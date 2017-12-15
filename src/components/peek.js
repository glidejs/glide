import { warn } from '../utils/log'
import { define } from '../utils/object'

function normalize (value, dimension) {
  let normalized = parseInt(value, 10)
  let isPercentage = value.indexOf('%') >= 0

  if (isPercentage) {
    return parseInt(dimension * (normalized / 100))
  }

  return normalized
}

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
     * @todo  refactor
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      if (typeof value === 'object') {
        if (typeof value.before === 'string') {
          value.before = normalize(value.before, Components.Dimensions.width)
        }
        if (typeof value.after === 'string') {
          value.after = normalize(value.after, Components.Dimensions.width)
        }
      } else {
        if (typeof value === 'string') {
          value = normalize(value, Components.Dimensions.width)
        }

        if (typeof value !== 'number') {
          warn('Invalid peek value')
        }
      }

      PEEK._s = value
    }
  })

  return PEEK
}
