import { warn } from '../utils/log'
import { toInt } from '../utils/unit'
import { define } from '../utils/object'

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
        !Glide.settings.enqueue || Glide.disable()

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
     * @return {Number|Undefined}
     */
    calculate () {
      const { move, length } = this
      const { steps, direction } = move
      const { loop, perMove } = Glide.settings

      let distance = (steps === '|') ? perMove : ((steps) || 1)

      // While direction is `=` we want jump to
      // a specified index described in steps.
      if (direction === '=') {
        Glide.index = steps

        return
      }

      // When pattern is equal to `>>` we want
      // fast forward to the last slide.
      if (direction === '>' && steps === '>') {
        Glide.index = length

        return
      }

      // When pattern is equal to `<<` we want
      // fast forward to the first slide.
      if (direction === '<' && steps === '<') {
        Glide.index = 0

        return
      }

      if (direction === '>') {
        const index = calculateForwardIndex(distance)

        if (index > length && loop) {
          this._o = true
        }

        Glide.index = normalizeForwardIndex(index, distance)

        return
      }

      if (direction === '<') {
        const index = calculateBackwardIndex(distance)

        if (index < 0 && loop) {
          this._o = true
        }

        Glide.index = normalizeBackwardIndex(index, distance)

        return
      }

      warn(`Invalid direction pattern [${direction}${steps}] has been used`)
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart () {
      return Glide.index <= 0
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
      return !Glide.settings.loop && Glide.settings.focusAt !== 'center' && Glide.settings.bound
    }
  }

  /**
   * Returns index value to move forward/to the right
   *
   * @param distance
   * @returns {Number}
   */
  function calculateForwardIndex (distance) {
    const { index } = Glide

    if (Glide.settings.loop) {
      return index + distance
    }

    return index + (distance - (index % distance))
  }

  /**
   * Calculates index value to move backward/to the left
   *
   * @param distance
   * @returns {Number}
   */
  function calculateBackwardIndex (distance) {
    const { index } = Glide

    if (Glide.settings.loop) {
      return index - distance
    }

    return (Math.ceil(index / distance) - 1) * distance
  }

  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param distance
   * @returns {Number}
   */
  function normalizeForwardIndex (index, distance) {
    const { length } = Run

    if (index <= length) {
      return index
    }

    if (Glide.settings.loop) {
      return index - (length + 1)
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length
      }

      return 0
    }

    return Math.floor(length / distance) * distance
  }

  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param distance
   * @returns {*}
   */
  function normalizeBackwardIndex (index, distance) {
    const { length } = Run

    if (index >= 0) {
      return index
    }

    if (Glide.settings.loop) {
      return index + (length + 1)
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length
      }

      return Math.floor(length / distance) * distance
    }

    return 0
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
