import { toInt } from '../utils/unit'
import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const GAP = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount () {
      this.value = Glide.settings.gap
    },

    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
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
     * @param {Number|String} value
     * @return {Void}
     */
    set (value) {
      GAP._v = toInt(value)
    }
  })

  define(GAP, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     * Used to increase width of the slides wrapper.
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
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get () {
      let perView = Glide.settings.perView

      return (GAP.value * (perView - 1)) / perView
    }
  })

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   */
  Events.listen(['build.after'], () => {
    GAP.setup()
  })

  return GAP
}
