import { warn } from '../utils/log'
import { define } from '../utils/object'
import { toInt, isNumber } from '../utils/unit'

export default function (Glide, Components, Events) {
  const Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount () {
      this._o = false
    },

    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make (move) {
      if (!Glide.disabled) {
        Glide.disable()

        this.move = move

        Events.emit('run.before', this.move)

        this.calculate()

        Events.emit('run', this.move)

        Components.Transition.after(() => {
          if (this.isStart()) {
            Events.emit('run.start', this.move)
          }

          if (this.isEnd()) {
            Events.emit('run.end', this.move)
          }

          if (this.isOffset('<') || this.isOffset('>')) {
            this._o = false

            Events.emit('run.offset', this.move)
          }

          Events.emit('run.after', this.move)

          Glide.enable()
        })
      }
    },

    /**
     * Calculates current index based on defined move.
     *
     * @return {Void}
     */
    calculate () {
      let { move, length } = this
      let { steps, direction } = move

      let countableSteps = (isNumber(toInt(steps))) && (toInt(steps) !== 0)

      switch (direction) {
        case '>':
          if (steps === '>') {
            Glide.index = length
          } else if (this.isEnd()) {
            if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
              this._o = true

              Glide.index = 0
            }
          } else if (countableSteps) {
            Glide.index += Math.min(length - Glide.index, -toInt(steps))
          } else {
            Glide.index++
          }
          break

        case '<':
          if (steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
              this._o = true

              Glide.index = length
            }
          } else if (countableSteps) {
            Glide.index -= Math.min(Glide.index, toInt(steps))
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = steps
          break

        default:
          warn(`Invalid direction pattern [${direction}${steps}] has been used`)
          break
      }
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart () {
      return Glide.index === 0
    },

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd () {
      return Glide.index === this.length
    },

    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset (direction) {
      return this._o && this.move.direction === direction
    }
  }

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get () {
      return this._m
    },

    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set (value) {
      let step = value.substr(1)

      this._m = {
        direction: value.substr(0, 1),
        steps: step ? (toInt(step) ? toInt(step) : step) : 0
      }
    }
  })

  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get () {
      let { settings } = Glide
      let { length } = Components.Html.slides

      // If the `bound` option is acitve, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.
      if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
        return (length - 1) - (toInt(settings.perView) - 1) + toInt(settings.focusAt)
      }

      return length - 1
    }
  })

  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get () {
      return this._o
    }
  })

  return Run
}
