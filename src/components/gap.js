import { define } from '../utils/object'
import { toInt, isObject } from '../utils/unit'

export default function (Glide, Components, Events) {
  const GAP = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount () {
      this.value = Glide.settings.gap
    },

    /**
     * Setups gaps between slides.
     *
     * @return {Void}
     */
    setup () {
      let items = Components.Html.wrapper.children

      for (let i = 0; i < items.length; i++) {
        if (i !== 0) {
          items[i].style.marginLeft = `${this.value/2}px`
        }

        if (i !== items.length) {
          items[i].style.marginRight = `${this.value/2}px`
        }
      }
    }
  }

  define(GAP, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get () {
      return GAP._v
    },

    /**
     * Sets value of the gap.
     *
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      GAP._v = toInt(value)
    }
  })

  define(GAP, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     *
     * @returns {Number}
     */
    get () {
      return GAP.value * (Components.Sizes.length - 1)
    }
  })

  define(GAP, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     *
     * @returns {Number}
     */
    get () {
      let value = GAP.value
      let perView = Glide.settings.perView

      return (value * (perView - 1)) / perView
    }
  })

  /**
   * Apply calculated gaps on:
   * - after building, so all slides (including clones) will receive proper gap
   */
  Events.listen(['build.after'], () => {
    GAP.setup()
  })

  return GAP
}
