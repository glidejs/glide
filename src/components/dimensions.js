import { define } from '../utils/object'

export default function (Glide, Components) {
  const DIMENSIONS = {
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

  define(DIMENSIONS, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get () {
      return (DIMENSIONS.slideWidth * DIMENSIONS.length) + Components.Clones.grow
    }
  })

  define(DIMENSIONS, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides.length
    }
  })

  define(DIMENSIONS, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.root.offsetWidth
    }
  })

  define(DIMENSIONS, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get () {
      let peek = Components.Peek.value
      let perView = Glide.settings.perView
      let rootWidth = Components.Html.root.offsetWidth

      if (typeof peek === 'object') {
        return Math.ceil((rootWidth / perView) - (peek.before / perView) - (peek.after / perView))
      }

      return Math.ceil((rootWidth / perView) - (peek * 2 / perView))
    }
  })

  return DIMENSIONS
}
