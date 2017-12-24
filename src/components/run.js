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
      this.value = move

      emit('run.before', this.value)

      switch (this.value.direction) {
        case '>':
          if (typeof this.value.steps === 'number' && parseInt(this.value.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this.value.steps))
          } else if (this.value.steps === '>') {
            Glide.index = this.length
          } else if (this.isEnd()) {
            Glide.index = 0

            emit('run.end', this.value)
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof this.value.steps === 'number' && parseInt(this.value.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this.value.steps))
          } else if (this.value.steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            Glide.index = this.length

            emit('run.start', this.value)
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = this.value.steps
          break
      }

      emit('run.after', this.value)

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
      return this._j && this.value.direction === direction
    }
  }

  define(RUN, 'value', {
    get () {
      return {
        direction: this._v.substr(0, 1),
        steps: this._v.substr(1) ? this._v.substr(1) : 0
      }
    },

    set (value) {
      this._v = value
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

  listen(['run.start', 'run.end'], () => {
    RUN._j = true
  })

  listen('move.after', () => {
    if (RUN.isOffset('<') || RUN.isOffset('>')) {
      RUN._j = false
    }
  })

  return RUN
}
