import { define } from '../utils/object'
import { isObject } from '../utils/primitives'
import { listen } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  const SIZES = {
    /**
     * Applys dimentions to the glide HTML elements.
     *
     * @return {Void}
     */
    apply () {
      this.setupSlides()
      this.setupWrapper()
    },

    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides (dimention) {
      for (var i = 0; i < Components.Html.slides.length; i++) {
        Components.Html.slides[i].style.width = `${this.slideWidth}px`
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
      return (SIZES.slideWidth * SIZES.length) + Components.Clones.grow
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
      let rootWidth = Components.Html.root.offsetWidth

      if (isObject(peek)) {
        return (rootWidth / perView) - (peek.before / perView) - (peek.after / perView)
      }

      return (rootWidth / perView) - (peek * 2 / perView)
    }
  })

  /**
   * Apply calculated glide's dimensions on:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   */
  listen('build.before', () => {
    SIZES.apply()
  })

  return SIZES
}
