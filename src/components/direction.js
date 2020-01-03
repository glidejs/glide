import { warn } from '../utils/log'
import { define } from '../utils/object'

const VALID_DIRECTIONS = ['ltr', 'rtl']
const FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
}

export default function (Glide, Components, Events) {
  const classAttr = (action, value) => {
    Components.Html.root.classList[action](value)
  }

  const Direction = {
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
    }
  }

  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get () {
      return Direction._v
    },

    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set (value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value
      } else {
        warn('Direction value must be `ltr` or `rtl`')
      }
    }
  })

  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */
  Events.on('update', () => {
    Direction.mount()
  })

  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */
  Events.on(['classes.before', 'update'], () => {
    classAttr('add', Glide.settings.classes.direction[Direction.value])
  })

  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */
  Events.on(['destroy', 'update'], () => {
    classAttr('remove', Glide.settings.classes.direction[Direction.value])
  })

  return Direction
}
