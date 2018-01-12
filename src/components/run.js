import { define } from '../utils/object'
import { emit } from '../core/event/events-bus'
import { toInt, isNumber } from '../utils/unit'

export default function (Glide, Components) {
  const RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    mount () {
      this._f = false
    },

    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make (move, callback) {
      if (!Glide.isDisabled()) {
        Glide.disable()

        this.move = move

        emit('run.before', this.move)

        this.calculate()

        emit('run', this.move)

        Components.Transition.after(() => {
          Glide.enable()

          if (this.isOffset('<') || this.isOffset('>')) {
            this._f = false

            emit('run.offset', this.move)
          }

          emit('run.after', this.move)
        })
      }
    },

    /**
     * Calculates current index based on passed move.
     *
     * @return {Void}
     */
    calculate () {
      let { move, length } = this
      let { steps, direction } = move

      let countableSteps = (isNumber(steps)) && (toInt(steps) !== 0)

      switch (direction) {
        case '>':
          if (countableSteps) {
            Glide.index += Math.min(length - Glide.index, -toInt(steps))
          } else if (steps === '>') {
            Glide.index = length
          } else if (this.isEnd()) {
            this._f = true

            if (Glide.isType('carousel')) {
              Glide.index = 0
            }

            emit('run.end', move)
          } else {
            Glide.index++
          }
          break

        case '<':
          if (countableSteps) {
            Glide.index -= Math.min(Glide.index, toInt(steps))
          } else if (steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            this._f = true

            if (Glide.isType('carousel')) {
              Glide.index = length
            }

            emit('run.start', move)
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
      return Glide.index === this.length
    },

    /**
     * Checks if we are making offset run.
     *
     * @return {Boolean}
     */
    isOffset (direction) {
      return this._f && this.move.direction === direction
    }
  }

  define(RUN, 'move', {
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

  define(RUN, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides.length - 1
    }
  })

  return RUN
}
