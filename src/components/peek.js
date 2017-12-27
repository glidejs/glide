import { warn } from '../utils/log'
import { define } from '../utils/object'
import { dimension } from '../utils/unit'
import { isString, isObject, isNumber } from '../utils/primitives'

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
     * @todo  refactor
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      if (isObject(value)) {
        if (isString(value.before)) {
          value.before = dimension(value.before, Components.Dimensions.width)
        }
        if (isString(value.after)) {
          value.after = dimension(value.after, Components.Dimensions.width)
        }
      } else {
        if (isString(value)) {
          value = dimension(value, Components.Dimensions.width)
        }

        if (!isNumber(value)) {
          warn('Invalid peek value')
        }
      }

      PEEK._v = value
    }
  })

  return PEEK
}
