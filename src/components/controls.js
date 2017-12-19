import { EventsBinder } from '../core/event/index'

export default function (Glide, Components) {
  let Binder = new EventsBinder()

  const CONTROLS_SELECTOR = '[data-glide-el="controls"]'

  return {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    init () {
      this._e = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR)

      for (let i = 0; i < this._e.length; i++) {
        this.bind(this._e[i])
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @return {Void}
     */
    bind (wrapper) {
      let children = wrapper.children

      for (var i = 0; i < children.length; i++) {
        Binder.on(['click', 'touchstart'], children[i], this.click)
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @return {Void}
     */
    unbind (wrapper) {
      let children = wrapper.children

      for (var i = 0; i < children.length; i++) {
        Binder.off(['click', 'touchstart'], children[i])
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

      Components.Run.make(event.target.dataset.glideDir)
    }
  }
}
