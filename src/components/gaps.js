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
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply (slides) {
      for (let i = 0, len = slides.length; i < len; i++) {
        const style = slides[i].style
        const direction = Components.Direction.value

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = `${this.value / 2}px`
        } else {
          style[MARGIN_TYPE[direction][0]] = ''
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = `${this.value / 2}px`
        } else {
          style[MARGIN_TYPE[direction][1]] = ''
        }
      }
    },

    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove (slides) {
      for (let i = 0, len = slides.length; i < len; i++) {
        const style = slides[i].style

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
      return toInt(Glide.settings.gap)
    }
  })

  define(Gaps, 'grow', {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get () {
      return Gaps.value * (Components.Sizes.length)
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
      const perView = Glide.settings.perView

      return (Gaps.value * (perView - 1)) / perView
    }
  })

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */
  Events.on(['build.after', 'update'], throttle(() => {
    Gaps.apply(Components.Html.wrapper.children)
  }, 30))

  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', () => {
    Gaps.remove(Components.Html.wrapper.children)
  })

  return Gaps
}
