import { define } from '../utils/object'
import { toInt, isUndefined } from '../utils/unit'

export default function (Glide, Components, Events) {
  const Move = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    mount () {
      this._o = 0
    },

    /**
     * Makes configured animation type on slider.
     *
     * @param  {Number} offset
     * @return {self}
     */
    make (offset = 0) {
      this.offset = offset

      Events.emit('move', {
        movement: this.value
      })

      Components.Transition.after(() => {
        Events.emit('move.after', {
          movement: this.value
        })
      })
    }
  }

  define(Move, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return Move._o
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0
    }
  })

  define(Move, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return Components.Sizes.slideWidth * Glide.index
    }
  })

  define(Move, 'value', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      let offset = this.offset
      let translate = this.translate

      if (Components.Direction.is('rtl')) {
        return translate + offset
      }

      return translate - offset
    }
  })

  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */
  Events.listen(['build.before', 'run'], () => {
    Move.make()
  })

  return Move
}
