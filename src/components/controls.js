import { siblings } from '../utils/dom'
import { define } from '../utils/object'

import EventsBinder from '../core/event/events-binder'

const NAV_SELECTOR = '[data-glide-el="controls[nav]"]'
const CONTROLS_SELECTOR = '[data-glide-el^="controls"]'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  const Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount () {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR)

      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._i = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR)

      this.addBindings()
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive () {
      for (let i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children)
      }
    },

    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive () {
      for (let i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children)
      }
    },

    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass (controls) {
      let settings = Glide.settings
      let item = controls[Glide.index]

      item.classList.add(settings.classes.activeNav)

      siblings(item).forEach(sibling => {
        sibling.classList.remove(settings.classes.activeNav)
      })
    },

    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass (controls) {
      controls[Glide.index].classList.remove(Glide.settings.classes.activeNav)
    },

    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings () {
      for (let i = 0; i < this._i.length; i++) {
        this.bind(this._i[i].children)
      }
    },

    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings () {
      for (let i = 0; i < this._i.length; i++) {
        this.unbind(this._i[i].children)
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind (elements) {
      for (let i = 0; i < elements.length; i++) {
        Binder.on(['click', 'touchstart'], elements[i], this.click)
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind (elements) {
      for (let i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i])
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

      Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')))
    }
  }

  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get () {
      return Controls._i
    }
  })

  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */
  Events.on(['mount.after', 'move.after'], () => {
    Controls.setActive()
  })

  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', () => {
    Controls.removeBindings()
    Controls.removeActive()
    Binder.destroy()
  })

  return Controls
}
