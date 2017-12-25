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

      switch (this.move.direction) {
        case '>':
          if (typeof this.move.steps === 'number' && parseInt(this.move.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this.move.steps))
          } else if (this.move.steps === '>') {
            Glide.index = this.length
          } else if (this.isEnd()) {
            this._j = true

            Glide.index = 0

            emit('run.end', this.move)
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof this.move.steps === 'number' && parseInt(this.move.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this.move.steps))
          } else if (this.move.steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            this._j = true

            Glide.index = this.length

            emit('run.start', this.move)
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = this.move.steps
          break
      }

      emit('run', this.move)

      Components.Transition.after(() => {
        if (this.isOffset('<') || this.isOffset('>')) {
          this._j = false
        }

        emit('run.after', this.move)
      })
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

  listen('resize', () => {
    RUN.make(`=${Glide.index}`).init()
  })

  return RUN
}
