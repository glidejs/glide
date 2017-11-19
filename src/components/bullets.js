import Html from './html'
import Run from './run'
import Core from './core'
import Animation from './animation'

import Binder from '../binder'

const BULLETS_SELECTOR = '[data-glide-el="bullets"]'

class Bullets extends Binder {
  /**
   * Inits bullets. Binds events listeners
   * to the bullets HTML elements.
   *
   * @return {Void}
   */
  init () {
    this.element = Html.root.querySelector(BULLETS_SELECTOR)

    this.bind()
  }

  /**
   * Binds events to bullets HTML elements.
   *
   * @return {Void}
   */
  bind () {
    let items = this.items

    for (var i = 0; i < items.length; i++) {
      this.on(['click', 'touchstart'], items[i], this.click)
      this.on(['mouseenter', 'mouseleave'], items[i], this.hover)
    }
  }

  /**
   * Unbinds events binded to the bullets HTML elements.
   *
   * @return {Void}
   */
  unbind () {
    let items = this.items

    for (var i = 0; i < items.length; i++) {
      this.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], items[i])
    }
  }

  /**
   * Handles `click` event on the bullets HTML elements.
   * Moves slider in driection precised in
   * `data-glide-dir` attribute.
   *
   * @param {Object} event
   * @return {Void}
   */
  click (event) {
    event.preventDefault()

    if (!Core.disabled) {
      Run.stop().make(event.target.dataset.glideDir)

      Animation.after(() => {
        Run.init()
      })
    }
  }

  /**
   * Handles `hover` event on the bullets HTML elements.
   * Plays and pauses autoplay running.
   *
   * @param {Object} event
   * @return {Void}
   */
  hover (event) {
    if (!Core.disabled) {
      if (event.type === 'mouseleave') {
        Run.init()
      }

      if (event.type === 'mouseenter') {
        Run.stop()
      }
    }
  }

  /**
   * Gets collection of the bullets HTML elements.
   *
   * @return {HTMLElement[]}
   */
  get items () {
    return this.element.children
  }
}

export default new Bullets()
