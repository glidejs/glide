import warn from '../utils/warn'
import { exist } from '../utils/dom'

class DOM {
  /**
   * Setup slider HTML nodes.
   *
   * @param {Glide} glide
   */
  init (glide) {
    this.element = glide.selector

    this.track = this.element.querySelector('[data-glide="track"]')
    this.arrows = this.element.querySelector('[data-glide="arrows"]')
    this.bullets = this.element.querySelector('[data-glide="bullets"]')
  }

  /**
   * Gets node of the slider main element.
   *
   * @return {Object}
   */
  get element () {
    return this.el
  }

  /**
   * Sets node of the slider main element.
   *
   * @return {Object}
   */
  set element (el) {
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }

    if (exist(el)) {
      this.el = el
    } else {
      warn('Main element must be a existing HTML node')
    }
  }

  /**
   * Gets node of the slides track.
   *
   * @return {Object}
   */
  get track () {
    return this.tr
  }

  /**
   * Sets node of the slides track.
   *
   * @return {Void}
   */
  set track (tr) {
    if (exist(tr)) {
      this.tr = tr
    } else {
      warn(`Could not find track element. Please use [data-glide="track"] attribute.`)
    }
  }

  /**
   * Gets node of the slides wrapper.
   *
   * @return {Object}
   */
  get wrapper () {
    return this.track.children[0]
  }

  /**
   * Gets collection of the slide nodes.
   *
   * @return {Array}
   */
  get slides () {
    return this.wrapper.children
  }
}

export default new DOM()
