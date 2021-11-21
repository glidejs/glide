import { siblings } from '../utils/dom'
import { define } from '../utils/object'
import supportsPassive from '../utils/detect-passive-event'

import EventsBinder from '../core/event/events-binder'

const NAV_SELECTOR = '[data-glide-el="controls[nav]"]'
const CONTROLS_SELECTOR = '[data-glide-el^="controls"]'
const PREVIOUS_CONTROLS_SELECTOR = `${CONTROLS_SELECTOR} [data-glide-dir*="<"]`
const NEXT_CONTROLS_SELECTOR = `${CONTROLS_SELECTOR} [data-glide-dir*=">"]`

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  let capture = (supportsPassive) ? { passive: true } : false

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
      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR)

      /**
       * Collection of arrow control HTML elements.
       *
       * @private
       * @type {Object}
       */
      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      }

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
      const settings = Glide.settings
      const item = controls[Glide.index]

      if (!item) {
        return
      }

      if (item) {
        item.classList.add(settings.classes.nav.active)

        siblings(item).forEach(sibling => {
          sibling.classList.remove(settings.classes.nav.active)
        })
      }
    },

    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass (controls) {
      let item = controls[Glide.index]

      if (item) {
        item.classList.remove(Glide.settings.classes.nav.active)
      }
    },

    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState () {
      if (Glide.settings.rewind) {
        return
      }

      const next = Controls._arrowControls.next
      const previous = Controls._arrowControls.previous

      this.resetArrowState(next, previous)

      if (Glide.index === 0) {
        this.disableArrow(previous)
      }

      if (Glide.index === Components.Run.length) {
        this.disableArrow(next)
      }
    },

    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState (...lists) {
      const settings = Glide.settings

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled)
        })
      })
    },

    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow (...lists) {
      const settings = Glide.settings

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled)
        })
      })
    },

    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings () {
      for (let i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children)
      }
    },

    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings () {
      for (let i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children)
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
        Binder.on('click', elements[i], this.click)
        Binder.on('touchstart', elements[i], this.click, capture)
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
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click (event) {
      if (!supportsPassive && event.type === 'touchstart') {
        event.preventDefault()
      }

      const direction = event.currentTarget.getAttribute('data-glide-dir')

      Components.Run.make(Components.Direction.resolve(direction))
    }
  }

  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get () {
      return Controls._c
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
   * Add or remove disabled class of arrow elements
   */
  Events.on(['mount.after', 'run'], () => {
    Controls.setArrowState()
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
