import { define } from '../utils/object'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */
  let detached = false

  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */
  let prevented = false

  const Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount () {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a')

      this.bind()
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('click', Components.Html.wrapper, this.click)
    },

    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('click', Components.Html.wrapper)
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click (event) {
      if (prevented) {
        event.stopPropagation()
        event.preventDefault()
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach () {
      prevented = true

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false

          this.items[i].setAttribute(
            'data-href',
            this.items[i].getAttribute('href')
          )

          this.items[i].removeAttribute('href')
        }

        detached = true
      }

      return this
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach () {
      prevented = false

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true

          this.items[i].setAttribute(
            'href',
            this.items[i].getAttribute('data-href')
          )
        }

        detached = false
      }

      return this
    }
  }

  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get () {
      return Anchors._a
    }
  })

  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */
  Events.on('swipe.move', () => {
    Anchors.detach()
  })

  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.on('swipe.end', () => {
    Components.Transition.after(() => {
      Anchors.attach()
    })
  })

  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */
  Events.on('destroy', () => {
    Anchors.attach()
    Anchors.unbind()
    Binder.destroy()
  })

  return Anchors
}
