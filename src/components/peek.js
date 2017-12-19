import { warn } from '../utils/log'
import { define } from '../utils/object'
import { dimension } from '../utils/unit'

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
      return PEEK._v
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @todo  refactor
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      if (typeof value === 'object') {
        if (typeof value.before === 'string') {
          value.before = dimension(value.before, Components.Dimensions.width)
        }
        if (typeof value.after === 'string') {
          value.after = dimension(value.after, Components.Dimensions.width)
        }
      } else {
        if (typeof value === 'string') {
          value = dimension(value, Components.Dimensions.width)
        }

        if (typeof value !== 'number') {
          warn('Invalid peek value')
        }
      }

      PEEK._v = value
    }
  })

  return PEEK
}
