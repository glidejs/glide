import { define } from '../utils/object'
import { isObject } from '../utils/unit'

export default function (Glide, Components, Events) {
  const SIZES = {
    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides () {
      let slides = Components.Html.slides

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = `${this.slideWidth}px`
      }
    },

    /**
     * Setups gaps between slides.
     *
     * @return {Void}
     */
    setupGaps () {
      let items = Components.Html.wrapper.children

      for (let i = 0; i < items.length; i++) {
        if (i !== 0) {
          items[i].style.marginLeft = `${Glide.settings.gap}px`
        }
      }
    },

    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper (dimention) {
      Components.Html.wrapper.style.width = `${this.wrapperSize}px`
    }
  }

  define(SIZES, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get () {
      return (SIZES.slideWidth * SIZES.length) + (Glide.settings.gap * (SIZES.length - 1)) + Components.Clones.grow
    }
  })

  define(SIZES, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides.length
    }
  })

  define(SIZES, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.root.offsetWidth
    }
  })

  define(SIZES, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get () {
      let peek = Components.Peek.value
      let perView = Glide.settings.perView

      let baseWidth = Components.Html.root.offsetWidth / perView
      let gapReductor = (Glide.settings.gap * (perView - 1)) / perView

      if (isObject(peek)) {
        return baseWidth - (peek.before / perView) - (peek.after / perView) - gapReductor
      }

      return baseWidth - (peek * 2 / perView) - gapReductor
    }
  })

  /**
   * Apply calculated glide's dimensions on:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   */
  Events.listen(['build.before', 'resize'], () => {
    SIZES.setupSlides()
    SIZES.setupWrapper()
  })

  /**
   * Apply calculated gaps on:
   */
  Events.listen(['build.after'], () => {
    SIZES.setupGaps()
  })

  return SIZES
}
