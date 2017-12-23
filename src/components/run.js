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
      this._m = {
        direction: move.substr(0, 1),
        steps: move.substr(1) ? move.substr(1) : 0
      }

      emit('run.make', this._m)

      switch (this._m.direction) {
        case '>':
          if (typeof this._m.steps === 'number' && parseInt(this._m.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this._m.steps))
          } else if (this._m.steps === '>') {
            Glide.index = this.length
          } else if (this.isEnd()) {
            Glide.index = 0

            emit('run.make.atEnd', this._m)
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof this._m.steps === 'number' && parseInt(this._m.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this._m.steps))
          } else if (this._m.steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            Glide.index = this.length

            emit('run.make.atStart', this._m)
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = this._m.steps
          break
      }

      emit('run.make.after', this._m)

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
      return this._j && this._m.direction === direction
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

  listen(['run.make.atStart', 'run.make.atEnd'], () => {
    RUN._j = true
  })

  listen('animation.make.after', () => {
    if (RUN.isOffset('<') || RUN.isOffset('>')) {
      RUN._j = false
    }
  })

  return RUN
}
