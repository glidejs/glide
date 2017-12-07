import { define } from '../utils/object'
import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

  const ARROWS_SELECTOR = '[data-glide-el="arrows"]'

  const ARROWS = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    init () {
      this._el = Components.Html.root.querySelector(ARROWS_SELECTOR)

      this.bind()
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @return {Void}
     */
    bind () {
      for (var i = 0; i < this.items.length; i++) {
        Events.on(['click', 'touchstart'], this.items[i], this.click)
        Events.on(['mouseenter', 'mouseleave'], this.items[i], this.hover)
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @return {Void}
     */
    unbind () {
      for (var i = 0; i < this.items.length; i++) {
        Events.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], this.items[i])
      }
    },

    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click (event) {
      event.preventDefault()

      if (!Glide.disabled) {
        Components.Run.stop().make(event.target.dataset.glideDir)

        Components.Animation.after(() => {
          Components.Run.init()
        })
      }
    },

    /**
     * Handles `hover` event on the arrows HTML elements.
     * Plays and pauses autoplay running.
     *
     * @param {Object} event
     * @return {Void}
     */
    hover (event) {
      if (!Glide.disabled) {
        if (event.type === 'mouseleave') {
          Components.Run.init()
        }

        if (event.type === 'mouseenter') {
          Components.Run.stop()
        }
      }
    }
  }

  define(ARROWS, 'items', {
    /**
   * Gets collection of the arrows HTML elements.
   *
   * @return {HTMLElement[]}
   */
    get () {
      return ARROWS._el.children
    }
  })

  return ARROWS
}
