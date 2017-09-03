import DOM from './dom'
import Run from './run'
import Core from './core'
import Animation from './animation'
import Binder from '../events/binder'

class Arrows extends Binder {
  /**
   * Inits arrows. Binds events listeners
   * to the arrows HTML elements.
   *
   * @return {Void}
   */
  init() {
    this.bind()
  }

  /**
   * Binds events to arrows HTML elements.
   *
   * @return {Void}
   */
  bind() {
    let items = this.items

    for (var i = 0; i < items.length; i++) {
      this.on(['click', 'touchstart'], items[i], this.click)
      this.on(['mouseenter', 'mouseleave'], items[i], this.hover)
    }
  }

  /**
   * Unbinds events binded to the arrows HTML elements.
   *
   * @return {Void}
   */
  unbind() {
    let items = this.items

    for (var i = 0; i < items.length; i++) {
      this.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], items[i])
    }
  }

  /**
   * Handles `click` event on the arrows HTML elements.
   * Moves slider in driection precised in
   * `data-glide-dir` attribute.
   *
   * @param {Object} event
   * @return {Void}
   */
  click(event) {
    event.preventDefault()

    if (! Core.disabled) {
      Run.stop().make(event.target.dataset.glideDir)

      Animation.after(() => {
        Run.init()
      })
    }
  }

  /**
   * Handles `hover` event on the arrows HTML elements.
   * Plays and pauses autoplay running.
   *
   * @param {Object} event
   * @return {Void}
   */
  hover(event) {
    if (! Core.disabled) {
      if (event.type === 'mouseleave') {
        Run.init()
      }

      if (event.type === 'mouseenter') {
        Run.stop()
      }
    }
  }

  /**
   * Gets collection of the arrows HTML elements.
   *
   * @return {HTMLElement[]}
   */
  get items() {
    return DOM.arrows.children
  }
}

export default new Arrows()