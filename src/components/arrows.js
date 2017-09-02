import DOM from './dom'
import Run from './run'
import Events from './events'
import Animation from './animation'

class Arrows {
  /**
   * Construct arrows.
   */
  constructor() {
      this.listeners = {}
  }

  /**
   * Init arrows. Binds DOM elements with listeners.
   *
   * @return {Void}
   */
  init() {
      this.bind()
  }

  /**
   * Arrow click event handler.
   *
   * @param {Object} event
   * @return {Void}
   */
  click(event) {
    event.preventDefault()

    if (! Events.disabled) {
        Run.stop().make(event.target.dataset.glideDir)

        Animation.after(() => {
          Run.init()
        })
    }
  }

  /**
   * Arrow hover event handler.
   *
   * @param {Object} event
   * @return {Void}
   */
  hover(event) {
    if (! Events.disabled) {
      switch (event.type) {
        case 'mouseleave':
          Run.init()
          break;

        case 'mouseenter':
          Run.stop()
          break;
      }
    }
  }

  /**
   * Bind arrows events.
   *
   * @return {Void}
   */
  bind() {
      let items = this.items

      for (var i = 0; i < items.length; i++) {
          this.on('click', items[i], this.click)
          this.on('touchstart', items[i], this.click)
          this.on('mouseenter', items[i], this.hover)
          this.on('mouseleave', items[i], this.hover)
      }
  }

  /**
   * Unbind arrows events.
   *
   * @return {Void}
   */
  unbind() {
      let items = this.items

      for (var i = 0; i < items.length; i++) {
          this.off('click', items[i])
          this.off('touchstart', items[i])
          this.off('mouseenter', items[i])
          this.off('mouseleave', items[i])
      }
  }

  on(event, el, closure) {
    this.listeners[event] = closure

    el.addEventListener(event, this.listeners[event])
  }

  off(event, el) {
    el.removeEventListener(event, this.listeners[event])
  }

  /**
   * Gets collection of the arrows elements.
   *
   * @return {HTMLElement[]}
   */
  get items() {
    return DOM.arrows.children
  }
}

export default new Arrows()