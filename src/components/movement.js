import { define } from '../utils/object'
import { ucfirst } from '../utils/string'
import { isUndefined } from '../utils/primitives'
import { listen, emit } from '../core/event/events-bus'

import Slider from '../types/slider'
import Carousel from '../types/carousel'

const TYPES = {
  Slider,
  Carousel
}

export default function (Glide, Components, Events) {
  const MOVEMENT = {
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

      emit('move', {
        movement: this.value
      })

      Components.Transition.after(() => {
        emit('move.after')
      })
    }
  }

  define(MOVEMENT, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return MOVEMENT._o
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (value) {
      MOVEMENT._o = !isUndefined(value) ? parseInt(value) : 0
    }
  })

  define(MOVEMENT, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return TYPES[ucfirst(Glide.type)](Glide, Components)
    }
  })

  define(MOVEMENT, 'value', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return this.translate - this.offset
    }
  })

  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */
  listen(['build.before', 'run'], () => {
    MOVEMENT.make()
  })

  return MOVEMENT
}
