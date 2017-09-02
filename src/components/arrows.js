import DOM from './dom'
import Run from './run'
import Events from './events'
import Animation from './animation'

class Arrows {
  /**
   * Constructs arrows component.
   */
  constructor() {
    this.listeners = {}
  }

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
   * Handles `click` event on the arrows HTML elements.
   * Moves slider in driection precised in
   * `data-glide-dir` attribute.
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
   * Handles `hover` event on the arrows HTML elements.
   * Plays and pauses autoplay running.
   *
   * @param {Object} event
   * @return {Void}
   */
  hover(event) {
    if (! Events.disabled) {
      if (event.type === 'mouseleave') {
        Run.init()
      }

      if (event.type === 'mouseenter') {
        Run.stop()
      }
    }
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
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @param  {Closure} closure
   * @return {Void}
   */
  on(events, el, closure) {
    for (var i = 0; i < events.length; i++) {
      this.listeners[events[i]] = closure

      el.addEventListener(events[i], this.listeners[events[i]])
    }
  }

  /**
   * Removes event listeners from arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @return {Void}
   */
  off(events, el) {
    for (var i = 0; i < events.length; i++) {
      el.removeEventListener(events[i], this.listeners[event])
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