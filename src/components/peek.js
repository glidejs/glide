import { define } from '../utils/object'
import { toInt, isObject } from '../utils/unit'

export default function (Glide, Components, Events) {
  const Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount () {
      this.value = Glide.settings.peek
    }
  }

  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number}
     */
    get () {
      return Peek._v
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      let width = Components.Sizes.width

      if (isObject(value)) {
        value.before = toInt(value.before)
        value.after = toInt(value.after)
      } else {
        value = toInt(value, width)
      }

      Peek._v = value
    }
  })

  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get () {
      let value = Peek.value
      let perView = Glide.settings.perView

      if (isObject(value)) {
        return (value.before / perView) + (value.after / perView)
      }

      return value * 2 / perView
    }
  })

  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */
  Events.on(['resize', 'update'], () => {
    Peek.mount()
  })

  return Peek
}
