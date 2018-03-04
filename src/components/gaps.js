import { toInt } from '../utils/unit'
import { define } from '../utils/object'
import { throttle } from '../utils/wait'

const MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
}

export default function (Glide, Components, Events) {
  const Gaps = {
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
      let items = Components.Html.wrapper.children

      for (let i = 0, len = items.length; i < len; i++) {
        let style = items[i].style
        let direction = Components.Direction.value

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = `${this.value / 2}px`
        } else {
          style[MARGIN_TYPE[direction][0]] = ''
        }

        if (i !== items.length - 1) {
          style[MARGIN_TYPE[direction][1]] = `${this.value / 2}px`
        } else {
          style[MARGIN_TYPE[direction][1]] = ''
        }
      }
    },

    /**
     * Removes gaps from the slides.
     *
     * @returns {Void}
    */
    remove () {
      let items = Components.Html.wrapper.children

      for (let i = 0, len = items.length; i < len; i++) {
        let style = items[i].style

        style.marginLeft = ''
        style.marginRight = ''
      }
    }
  }

  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get () {
      return Gaps._v
    },

    /**
     * Sets value of the gap.
     *
     * @param {String} value
     * @return {Void}
     */
    set (value) {
      Gaps._v = toInt(value)
    }
  })

  define(Gaps, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get () {
      return Gaps.value * (Components.Sizes.length - 1)
    }
  })

  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get () {
      let perView = Glide.settings.perView

      return (Gaps.value * (perView - 1)) / perView
    }
  })

  /**
   * Remount component:
   * - on updating via API, to update gap value
   */
  Events.on('update', () => {
    Gaps.mount()
  })

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */
  Events.on(['build.after', 'update'], throttle(() => {
    Gaps.apply()
  }, 30))

  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', () => {
    Gaps.remove()
  })

  return Gaps
}
