import { define } from '../utils/object'
import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

  const BULLETS_SELECTOR = '[data-glide-el="bullets"]'

  const BULLETS = {
    /**
     * Inits bullets. Binds events listeners
     * to the bullets HTML elements.
     *
     * @return {Void}
     */
    init () {
      this._el = Components.Html.root.querySelector(BULLETS_SELECTOR)

      this.bind()
    },

    /**
     * Binds events to bullets HTML elements.
     *
     * @return {Void}
     */
    bind () {
      let items = this.items

      for (let i = 0; i < items.length; i++) {
        Events.on(['click', 'touchstart'], items[i], this.click)
        Events.on(['mouseenter', 'mouseleave'], items[i], this.hover)
      }
    },

    /**
     * Unbinds events binded to the bullets HTML elements.
     *
     * @return {Void}
     */
    unbind () {
      for (let i = 0; i < this.items.length; i++) {
        Events.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], this.items[i])
      }
    },

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

      if (!Glide.disabled) {
        Components.Run.stop().make(event.target.dataset.glideDir)

        Components.Animation.after(() => {
          Components.Run.init()
        })
      }
    },

    /**
     * Handles `hover` event on the bullets HTML elements.
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

  define(BULLETS, 'items', {
    /**
   * Gets collection of the arrows HTML elements.
   *
   * @return {HTMLElement[]}
   */
    get () {
      return this._el.children
    }
  })

  return BULLETS
}
