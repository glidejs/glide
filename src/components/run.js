import { warn } from '../utils/log'
import { toInt } from '../utils/unit'
import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  /**
   * Returns index value to move forward/to the right
   *
   * @param distance
   * @returns {Number}
   */
  const calculateForwardIndex = (distance) => {
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
  const calculateBackwardIndex = (distance) => {
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
  const normalizeForwardIndex = (index, distance) => {
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

    if (Run.isBound()) {
      return length
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
  const normalizeBackwardIndex = (index, distance) => {
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

  /**
   * Calculates current index based on defined move.
   *
   * @return {Number|Undefined}
   */
  const calculate = (move, length) => {
    const { steps, direction } = move
    const { loop, perMove } = Glide.settings

    const distance = (steps === '|') ? perMove : ((steps) || 1)

    // While direction is `=` we want jump to
    // a specified index described in steps.
    if (direction === '=') {
      // Check if bound is true, as we want to avoid whitespaces
      if (Glide.settings.bound && steps > length) {
        return length
      } else {
        return steps
      }
    }

    // When pattern is equal to `>>` we want
    // fast forward to the last slide.
    if (direction === '>' && steps === '>') {
      return length
    }

    // When pattern is equal to `<<` we want
    // fast forward to the first slide.
    if (direction === '<' && steps === '<') {
      return 0
    }

    if (direction === '>') {
      const index = calculateForwardIndex(distance)

      if (index > length && loop) {
        Run._o = true
      }

      return normalizeForwardIndex(index, distance)
    }

    if (direction === '<') {
      const index = calculateBackwardIndex(distance)

      if (index < 0 && loop) {
        Run._o = true
      }

      return normalizeBackwardIndex(index, distance)
    }

    warn(`Invalid direction pattern [${direction}${steps}] has been used`)
  }

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

        Glide.index = calculate(this.move, this.length)

        Events.emit('run', this.move)

        Components.Animate.after(() => {
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
      const { loop, focusAt, bound } = Glide.settings

      return !loop && focusAt !== 'center' && bound
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
      const step = value.substr(1)

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
      const { settings } = Glide
      const { length } = Components.Html.slides

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
