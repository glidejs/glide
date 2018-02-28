import { warn } from '../utils/log'
import { define } from '../utils/object'

const DIRECTONS = ['ltr', 'rtl']
const FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
}

export default function (Glide, Components, Events) {
  const DIRECTION = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount () {
      this.value = Glide.settings.direction
    },

    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve (pattern) {
      let token = pattern.slice(0, 1)

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token])
      }

      return pattern
    },

    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is (direction) {
      return this.value === direction
    },

    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass () {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value])
    },

    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass () {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value])
    }
  }

  define(DIRECTION, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get () {
      return DIRECTION._v
    },

    /**
     * Sets value of the direction.
     *
     * @param {Number|String} value
     * @return {Void}
     */
    set (value) {
      if (DIRECTONS.includes(value)) {
        DIRECTION._v = value
      } else {
        warn('Direction value must be `ltr` or `rtl`')
      }
    }
  })

  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */
  Events.listen(['destroy', 'update'], () => {
    DIRECTION.removeClass()
  })

  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */
  Events.listen('update', () => {
    DIRECTION.mount()
  })

  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */
  Events.listen(['build.before', 'update'], () => {
    DIRECTION.addClass()
  })

  return DIRECTION
}
