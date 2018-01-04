import { define } from '../utils/object'
import { toInt, isObject } from '../utils/unit'
import { listen } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  const PEEK = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount () {
      this.value = Glide.settings.peek
    }
  }

  define(PEEK, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number}
     */
    get () {
      return PEEK._v
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

      PEEK._v = value
    }
  })

  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */
  listen('resize', () => {
    PEEK.mount()
  })

  return PEEK
}
