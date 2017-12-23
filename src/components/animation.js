import { define } from '../utils/object'
import { ucfirst } from '../utils/string'
import { listen, emit } from '../core/event/events-bus'

import Slider from '../types/slider'
import Carousel from '../types/carousel'

const TYPES = {
  Slider,
  Carousel
}

export default function (Glide, Components, Events) {
  const ANIMATION = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    init () {
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

      emit('animation.make', {
        movement: this.movement
      })

      Components.Transition.after(() => {
        emit('animation.make.after')
      })
    }
  }

  define(ANIMATION, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return ANIMATION._o
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (value) {
      ANIMATION._o = typeof value !== 'undefined' ? parseInt(value) : 0
    }
  })

  define(ANIMATION, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return TYPES[ucfirst(Glide.type)](Glide, Components)
    }
  })

  define(ANIMATION, 'movement', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get () {
      return this.translate - this.offset
    }
  })

  listen(['build.init.before', 'run.make.after'], () => {
    ANIMATION.make()
  })

  return ANIMATION
}
