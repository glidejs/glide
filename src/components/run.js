import { define } from '../utils/object'
import { listen, emit } from '../core/event/events-bus'

export default function (Glide, Components) {
  const RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    init () {
      this._f = false
    },

    /**
     * Handles glide status. Calculates current index
     * based on passed move and slider type.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make (move, callback) {
      this.direction = move.substr(0, 1)
      this.steps = move.substr(1) ? move.substr(1) : 0

      switch (this.direction) {
        case '>':
          if (typeof this.steps === 'number' && parseInt(this.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this.steps))
          } else if (this.steps === '>') {
            Glide.index = this.length
          } else if (this.isEnd()) {
            Glide.index = 0

            this._f = true
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof this.steps === 'number' && parseInt(this.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this.steps))
          } else if (this.steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            Glide.index = this.length

            this._f = true
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = this.steps
          break
      }

      emit('run.make.after', {
        direction: this.direction,
        steps: this.steps
      })

      return this
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
      return this._f && this.direction === direction
    }
  }

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

  listen('window.resize', () => {
    RUN.make(`=${Glide.index}`).init()
  })

  return RUN
}
