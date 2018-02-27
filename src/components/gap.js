import { toInt } from '../utils/unit'
import { define } from '../utils/object'
import { throttle } from '../utils/wait'

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
    apply () {
      let wrapper = Components.Html.wrapper
      let items = wrapper.children

      wrapper.style.marginLeft = `-${this.value / 2}px`
      wrapper.style.marginRight = `-${this.value / 2}px`

      for (let i = 0, len = items.length; i < len; i++) {
        let style = items[i].style

        style.marginLeft = `${this.value / 2}px`
        style.marginRight = `${this.value / 2}px`
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
   * Remount component:
   * - on updating via API, to update gap value
   */
  Events.listen('update', () => {
    GAP.mount()
  })

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */
  Events.listen(['build.after', 'update'], throttle(() => {
    GAP.apply()
  }, 30))

  return GAP
}
