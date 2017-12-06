import { define } from '../utils/object'
import { ucfirst } from '../utils/string'

import Slider from '../types/slider'

export default function (Glide, Components) {
  const TYPES = {
    Slider
  }

  const ANIMATION = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    init () {
      this._d = 0
    },

    /**
     * Makes configured animation type on slider.
     *
     * @param  {Number} offset
     * @return {self}
     */
    make (offset) {
      this.offset = offset

      this.apply()

      return this
    },

    /**
     * Applies an animation.
     *
     * @return {Void}
     */
    apply () {
      Components.Transition.set()
      Components.Translate.set(this.translate - this.offset)
    },

    /**
     * Runs callback after animation.
     *
     * @param  {Closure} callback
     * @return {Integer}
     */
    after (callback) {
      return setTimeout(() => {
        callback()
      }, Glide.settings.animationDuration + 10)
    }
  }

  define(ANIMATION, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return ANIMATION._d
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (value) {
      ANIMATION._d = typeof value !== 'undefined' ? parseInt(value) : 0
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

  return ANIMATION
}
