import { define } from '../utils/object'
import { toInt, isUndefined } from '../utils/unit'

export default function (Glide, Components, Events) {
  const Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount () {
      this._o = 0
    },

    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
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
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get () {
      return Move._o
    },

    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set (value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0
    }
  })

  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get () {
      return Components.Sizes.slideWidth * Glide.index
    }
  })

  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
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
  Events.on(['build.before', 'run'], () => {
    Move.make()
  })

  return Move
}
