import { define } from '../utils/object'

export default function (Glide, Components) {
  const MODE_TO_DIMENSIONS = {
    horizontal: ['width', 'x'],
    vertical: ['height', 'y']
  }

  const DIMENSIONS = {
    /**
     * Applys dimentions to the glide HTML elements.
     *
     * @return {Void}
     */
    apply () {
      let dimention = this.dimention.size

      this.setupSlides(dimention)
      this.setupWrapper(dimention)
    },

    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides (dimention) {
      for (var i = 0; i < Components.Html.slides.length; i++) {
        Components.Html.slides[i].style[dimention] = `${this.slideSize}px`
      }
    },

    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper (dimention) {
      Components.Html.wrapper.style[dimention] = `${this.wrapperSize}px`
    }
  }

  define(DIMENSIONS, 'dimention', {
    /**
     * Gets dimentions map for current glide's mode.
     *
     * @return {Object}
     */
    get () {
      return {
        size: MODE_TO_DIMENSIONS[Glide.settings.mode][0],
        axis: MODE_TO_DIMENSIONS[Glide.settings.mode][1]
      }
    }
  })

  define(DIMENSIONS, 'slideSize', {
    /**
     * Gets dimentions map for current glide's mode.
     *
     * @return {Object}
     */
    get () {
      if (Glide.isMode('vertical')) {
        return DIMENSIONS.slideHeight
      }

      return DIMENSIONS.slideWidth
    }
  })

  define(DIMENSIONS, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get () {
      return DIMENSIONS.slideSize * DIMENSIONS.length
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

  define(DIMENSIONS, 'height', {
    /**
     * Gets height value of the glide.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.root.offsetHeight
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
        return (rootWidth / perView) - (peek.before / perView) - (peek.after / perView)
      }

      return (rootWidth / perView) - (peek * 2 / perView)
    }
  })

  define(DIMENSIONS, 'slideHeight', {
    /**
     * Gets height value of the single slide.
     *
     * @return {Number}
     */
    get () {
      let peek = Components.Peek.value
      let perView = Glide.settings.perView
      let rootWidth = Components.Html.root.offsetHeight

      if (typeof peek === 'object') {
        return (rootWidth / perView) - (peek.before / perView) - (peek.after / perView)
      }

      return (rootWidth / perView) - (peek * 2 / perView)
    }
  })

  return DIMENSIONS
}
