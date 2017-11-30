import { warn } from '../utils/log'
import { define } from '../utils/object'

export default function (Glide, Components) {
  const PEEK = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    init () {
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
      return PEEK._s
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      if (typeof value === 'string') {
        let normalized = parseInt(value, 10)
        let isPercentage = value.indexOf('%') >= 0

        if (isPercentage) {
          value = parseInt(Components.Dimensions.width * (normalized / 100))
        } else {
          value = normalized
        }
      }

      if (typeof value === 'number') {
        this._s = value
      } else {
        warn('Invalid peek value')
      }
    }
  })

  return PEEK
}
