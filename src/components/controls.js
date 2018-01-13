import { siblings } from '../utils/dom'

import EventsBinder from '../core/event/events-binder'

const NAV_SELECTOR = '[data-glide-el="controls[nav]"]'
const CONTROLS_SELECTOR = '[data-glide-el^="controls"]'

export default function (Glide, Components, Events) {
  const Binder = new EventsBinder()

  const CONTROLS = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount () {
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR)
      this._e = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR)

      this.activeClass()
      this.bindEvents()
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass () {
      for (let i = 0; i < this._n.length; i++) {
        this.class(this._n[i])
      }
    },

    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} wrapper
     * @return {Void}
     */
    class (wrapper) {
      let settings = Glide.settings
      let item = wrapper.children[Glide.index]

      item.classList.add(settings.classes.activeNav)

      siblings(item).forEach(sibling => {
        sibling.classList.remove(settings.classes.activeNav)
      })
    },

    /**
     * Binds handles to the each group of controls.
     *
     * @return {Void}
     */
    bindEvents () {
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

  /**
   * Swap active class of current navigation item:
   * - after each move to the new index
   */
  Events.listen('move.after', () => {
    CONTROLS.activeClass()
  })

  return CONTROLS
}
