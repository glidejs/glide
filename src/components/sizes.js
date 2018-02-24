import { define } from '../utils/object'
import { toInt, isObject } from '../utils/unit'

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
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper (dimention) {
      Components.Html.wrapper.style.width = `${this.wrapperSize}px`
    }
  }

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

  define(SIZES, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get () {
      return (SIZES.slideWidth * SIZES.length) + Components.Gap.grow + Components.Clones.grow
    }
  })

  define(SIZES, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get () {
      return (SIZES.width / Glide.settings.perView) - Components.Peek.reductor - Components.Gap.reductor
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

  return SIZES
}
