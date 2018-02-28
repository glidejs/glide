import { define } from '../utils/object'

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
      DIRECTION._v = value
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
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */
  Events.listen(['build.before', 'update'], () => {
    DIRECTION.addClass()
  })

  return DIRECTION
}
