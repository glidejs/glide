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
        !Glide.settings.waitForTransition || Glide.disable()

        this.move = move

        Events.emit('run.before', this.move)

        this.calculate()

        Events.emit('run', this.move)

        Components.Transition.after(() => {
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
        case '|':
          const pageSize = Glide.settings.perView || 1
          // bound does funny things with the length, therefor fallback to the default length
          // when bound is deactivated calculate the last index that is meaningful to provide a pleasant pagination
          const lastMeaningfulIndex = this.isBound() ? length : Math.floor(length / pageSize) * pageSize

          if (steps === '>') {
            const nextIndex = Glide.index + pageSize

            // do not go further than the last index that is meaningful
            let allowedMin = lastMeaningfulIndex

            // when rewind is enabled and the next index is above the amount of slides, rewind to the first slide
            if (Glide.settings.rewind && nextIndex > length) {
              // bound does funny things with the length, therefor we have to be certain
              // that we reached the last possible length value before we rewind
              allowedMin = !this.isBoundEnd() ? length : 0
            }

            Glide.index = Math.min(allowedMin, nextIndex)
          } else {
            const page = Math.ceil(Glide.index / pageSize)
            const prevIndex = (page - 1) * pageSize

            // when rewind is enabled and the previous index is below zero, rewind to the last index that is meaningful
            // when rewind is disabled and previous index is below zero, stop at the fist slide
            const allowedMax = (Glide.settings.rewind && prevIndex < 0) ? lastMeaningfulIndex : 0

            Glide.index = Math.max(allowedMax, prevIndex)
          }
          break
        case '>':
          if (steps === '>') {
            Glide.index = length
          } else if (this.isEnd()) {
            if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
              this._o = true

              Glide.index = 0
            }

            Events.emit('run.end', move)
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

            Events.emit('run.start', move)
          } else if (countableSteps) {
            Glide.index -= Math.min(Glide.index, toInt(steps))
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = steps
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
      return Glide.index >= this.length
    },

    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset (direction) {
      return this._o && this.move.direction === direction
    },

    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound () {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound
    },

    /**
     * Checks if slides should be rewinded
     *
     * @return {Boolean}
     */
    isBoundEnd () {
      if (this.isBound() && this.isEnd()) {
        return true
      }

      return !this.isBound()
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
      this._m = {
        direction: value.substr(0, 1),
        steps: value.substr(1) ? value.substr(1) : 0
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

      // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.
      if (this.isBound()) {
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
