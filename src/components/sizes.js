import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const Sizes = {
    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides () {
      let width = `${this.slideWidth}px`
      let slides = Components.Html.slides

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = width
      }
    },

    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper (dimention) {
      Components.Html.wrapper.style.width = `${this.wrapperSize}px`
    },

    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove () {
      let slides = Components.Html.slides

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = ''
      }

      Components.Html.wrapper.style.width = ''
    }
  }

  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides.length
    }
  })

  define(Sizes, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.root.offsetWidth
    }
  })

  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get () {
      return (Sizes.slideWidth * Sizes.length) + Components.Gaps.grow + Components.Clones.grow
    }
  })

  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get () {
      return (Sizes.width / Glide.settings.perView) - Components.Peek.reductor - Components.Gaps.reductor
    }
  })

  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */
  Events.on(['build.before', 'resize', 'update'], () => {
    Sizes.setupSlides()
    Sizes.setupWrapper()
  })

  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */
  Events.on('destroy', () => {
    Sizes.remove()
  })

  return Sizes
}
