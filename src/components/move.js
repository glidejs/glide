import { define } from '../utils/object'
import { ucfirst } from '../utils/string'
import { toInt, isUndefined } from '../utils/unit'

import Slider from '../types/slider'
import Carousel from '../types/carousel'

const TYPES = {
  Slider,
  Carousel
}

export default function (Glide, Components, Events) {
  const MOVE = {
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

  define(MOVE, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return MOVE._o
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (value) {
      MOVE._o = !isUndefined(value) ? toInt(value) : 0
    }
  })

  define(MOVE, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return TYPES[ucfirst(Glide.type)](Glide, Components, Events)
    }
  })

  define(MOVE, 'value', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      let offset = this.offset
      let translate = this.translate

      if (Glide.settings.rtl) {
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
    MOVE.make()
  })

  return MOVE
}
