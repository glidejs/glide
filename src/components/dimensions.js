import DOM from './dom'
import Core from './core'
import Peek from './peek'

import { ucfirst } from '../utils/string'

const MODE_TO_DIMENSIONS = {
  horizontal: ['width', 'x'],
  vertical: ['height', 'y']
}

class Dimensions {
  apply() {
    let dimention = this.dimention.size

    this.setupSlides(dimention)
    this.setupWrapper(dimention)
  }

  setupSlides(dimention) {
    for (var i = 0; i < DOM.slides.length; i++) {
      DOM.slides[i].style[dimention] = `${this.slideSize}px`
    }
  }

  setupWrapper(dimention) {
    DOM.wrapper.style[dimention] = `${this.wrapperSize}px`
  }

  get dimention() {
    let settings = Core.settings

    return {
      size: MODE_TO_DIMENSIONS[settings.mode][0],
      axis: MODE_TO_DIMENSIONS[settings.mode][1]
    }
  }

  get slideSize() {
    let dimention = this.dimention

    if (Core.isMode('vertical')) {
      return this.slideHeight
    }

    return this.slideWidth
  }

  get wrapperSize() {
    return this.slideSize * this.length
  }

  get length() {
    return DOM.slides.length
  }

  get width() {
    return DOM.element.offsetWidth
  }

  get height() {
    return DOM.element.offsetHeight
  }

  get slideWidth() {
    let perView = Core.settings.perView

    return (DOM.element.offsetWidth / perView) - (Peek.value / perView)
  }

  get slideHeight() {
    let perView = Core.settings.perView

    return (DOM.element.offsetHeight / perView) - (Peek.value / perView)
  }
}

export default new Dimensions()