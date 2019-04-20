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
          if (this.isOffset()) {
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
     * @return {void}
     */
    calculate () {
      let { move, length } = this
      let { steps, direction } = move

      // jump to specified index
      if (direction === '=') {
        Glide.index = steps

        return
      }

      // << fast forward
      if (direction === '>' && steps === '>') {
        Glide.index = length

        return
      }

      // >> rewind
      if (direction === '<' && steps === '<') {
        // pageSize = length - Glide.index
        Glide.index = 0

        return
      }

      // < or > movement
      let pageSize = 1

      const countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0
      // >$steps (drag) movement
      if (direction === '>' && countableSteps) {
        pageSize = toInt(steps) * -1
      }

      // $steps< (drag) movement
      if (direction === '<' && countableSteps) {
        pageSize = toInt(steps)
      }

      // pagination movement
      if (direction === '|') {
        pageSize = Glide.settings.perView || 1
      }

      // we are moving forward
      if (direction === '>' || (direction === '|' && steps === '>')) {
        const index = this.calculateForwardIndex(pageSize)

        if (index > length) {
          this._o = true
          Events.emit('run.end', move)
        }

        Glide.index = this.normalizeForwardIndex(index, length, pageSize)

        return
      }

      const index = this.calculateBackwardIndex(pageSize)

      if (index < 0) {
        this._o = true
        Events.emit('run.end', move)
      }

      Glide.index = this.normalizeBackwardIndex(index, length, pageSize)
    },

    /**
     * Returns index value to move forward/to the right
     *
     * @param pageSize
     * @returns {Number}
     */
    calculateForwardIndex (pageSize) {
      return Glide.index + pageSize
    },

    /**
     * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param pageSize
     * @returns {Number}
     */
    normalizeForwardIndex (index, length, pageSize) {
      if (index <= length) {
        return index
      }

      if (Glide.isType('carousel')) {
        return index - (length + 1)
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on the last possible index value given by bound
        if (this.isBound() && !this.isEnd()) {
          return length
        }

        return 0
      }

      if (this.isBound()) {
        return length
      }

      return Math.floor(length / pageSize) * pageSize
    },

    /**
     * Calculates index value to move backward/to the left
     *
     * @param pageSize
     * @returns {Number}
     */
    calculateBackwardIndex (pageSize) {
      if (Glide.isType('carousel')) {
        return Glide.index - pageSize
      }

      // ensure our back navigation results in the same index as a forward navigation
      // to experience a homogeneous paging
      const page = Math.ceil(Glide.index / pageSize)
      return (page - 1) * pageSize
    },

    /**
     * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param pageSize
     * @returns {*}
     */
    normalizeBackwardIndex (index, length, pageSize) {
      if (index >= 0) {
        return index
      }

      if (Glide.isType('carousel')) {
        return index + (length + 1)
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on first possible index value before we to rewind to the length given by bound
        if (this.isBound() && this.isStart()) {
          return length
        }

        return Math.floor(length / pageSize) * pageSize
      }

      return 0
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
    isOffset (direction = undefined) {
      if (!direction) {
        return this._o
      }

      if (!this._o) {
        return false
      }

      // did we page to the right?
      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>'
      }

      // did we page to the left?
      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<'
      }

      return this.move.direction === direction
    },

    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound () {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound
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
