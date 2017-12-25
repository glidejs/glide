import { define } from '../utils/object'
import { listen, emit } from '../core/event/events-bus'

export default function (Glide, Components) {
  const RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    mount () {
      this._j = false
    },

    /**
     * Handles glide status. Calculates current index
     * based on passed move and slider type.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make (move, callback) {
      this.move = move

      emit('run.before', this.move)

      this.calculate()

      emit('run', this.move)

      Components.Transition.after(() => {
        if (this.isOffset('<') || this.isOffset('>')) {
          this._j = false

          emit('run.offset', this.move)
        }

        emit('run.after', this.move)
      })
    },

    calculate () {
      let { move, length } = this
      let { steps, direction } = move

      switch (direction) {
        case '>':
          if (typeof steps === 'number' && parseInt(steps) !== 0) {
            Glide.index += Math.min(length - Glide.index, -parseInt(steps))
          } else if (steps === '>') {
            Glide.index = length
          } else if (this.isEnd()) {
            this._j = true

            Glide.index = 0

            emit('run.end', move)
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof steps === 'number' && parseInt(steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(steps))
          } else if (steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            this._j = true

            Glide.index = length

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
      return this._j && this.move.direction === direction
    }
  }

  define(RUN, 'move', {
    get () {
      return this._m
    },

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
