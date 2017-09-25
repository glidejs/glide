import DOM from './dom'
import Core from './core'
import Peek from './peek'

import { ucfirst } from '../utils/string'

const MODE_TO_DIMENSIONS = {
  horizontal: ['width', 'x'],
  vertical: ['height', 'y']
}

class Dimensions {
  /**
   * Applys dimentions to the glide HTML elements.
   * 
   * @return {Void}
   */
  apply() {
    let dimention = this.dimention.size

    this.setupSlides(dimention)
    this.setupWrapper(dimention)
  }

  /**
   * Setups dimentions of slides.
   * 
   * @return {Void}
   */
  setupSlides(dimention) {
    for (var i = 0; i < DOM.slides.length; i++) {
      DOM.slides[i].style[dimention] = `${this.slideSize}px`
    }
  }

  /**
   * Setups dimentions of slides wrapper.
   * 
   * @return {Void}
   */
  setupWrapper(dimention) {
    DOM.wrapper.style[dimention] = `${this.wrapperSize}px`
  }

  /**
   * Gets dimentions map for current glide's mode.
   * 
   * @return {Object}
   */
  get dimention() {
    let settings = Core.settings

    return {
      size: MODE_TO_DIMENSIONS[settings.mode][0],
      axis: MODE_TO_DIMENSIONS[settings.mode][1]
    }
  }

  /**
   * Gets size of the single slide.
   * 
   * @return {Number}
   */
  get slideSize() {
    let dimention = this.dimention

    if (Core.isMode('vertical')) {
      return this.slideHeight
    }

    return this.slideWidth
  }

  /**
   * Gets size of the slides wrapper.
   * 
   * @return {Number}
   */
  get wrapperSize() {
    return this.slideSize * this.length
  }

  /**
   * Gets count number of the slides.
   * 
   * @return {Number}
   */
  get length() {
    return DOM.slides.length
  }

  /**
   * Gets width value of the glide.
   * 
   * @return {Number}
   */
  get width() {
    return DOM.element.offsetWidth
  }

  /**
   * Gets height value of the glide.
   * 
   * @return {Number}
   */
  get height() {
    return DOM.element.offsetHeight
  }

  /**
   * Gets width value of the single slide.
   * 
   * @return {Number}
   */
  get slideWidth() {
    let perView = Core.settings.perView

    return (DOM.element.offsetWidth / perView) - (Peek.value / perView)
  }

  /**
   * Gets height value of the single slide.
   * 
   * @return {Number}
   */
  get slideHeight() {
    let perView = Core.settings.perView

    return (DOM.element.offsetHeight / perView) - (Peek.value / perView)
  }
}

export default new Dimensions()