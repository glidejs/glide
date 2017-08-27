import DOM from './dom'
import Core from './core'

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
    let dimentionGetter = `slide${ucfirst(dimention)}`

    for (var i = 0; i < DOM.slides.length; i++) {
      DOM.slides[i].style[dimention] = `${this[dimentionGetter]}px`
    }
  }

  setupWrapper(dimention) {
    let dimentionGetter = `slide${ucfirst(dimention)}`

    DOM.wrapper.style[dimention] = `${this[dimentionGetter] * this.length}px`
  }

  get dimention() {
    let settings = Core.settings

    return {
      size: MODE_TO_DIMENSIONS[settings.mode][0],
      axis: MODE_TO_DIMENSIONS[settings.mode][1]
    }
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
    return DOM.element.offsetWidth / Core.settings.perView
  }

  get slideHeight() {
    return DOM.element.offsetHeight / Core.settings.perView
  }
}

export default new Dimensions()