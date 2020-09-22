import { define } from '../utils/object'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  const { Html } = Components

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

  /**
   * Handler for click event. Prevents clicks when glide is in `prevent` status.
   *
   * @param  {Object} event
   * @return {Void}
   */
  const click = (event) => {
    if (prevented) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

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
      this._a = Html.wrapper.querySelectorAll('a')

      this.bind()
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('click', Html.wrapper, click)
    },

    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('click', Html.wrapper)
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {Void}
     */
    detach (items) {
      prevented = true

      if (!detached) {
        for (let i = 0; i < items.length; i++) {
          items[i].draggable = false

          items[i].setAttribute('data-href', items[i].getAttribute('href'))

          items[i].removeAttribute('href')
        }

        detached = true
      }
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {Void}
     */
    attach (items) {
      prevented = false

      if (detached) {
        for (let i = 0; i < items.length; i++) {
          items[i].draggable = true

          items[i].setAttribute('href', items[i].getAttribute('data-href'))
        }

        detached = false
      }
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
    Anchors.detach(Anchors.items)
  })

  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.on('swipe.end', () => {
    Anchors.attach(Anchors.items)
  })

  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */
  Events.on('destroy', () => {
    Anchors.attach(Anchors.items)
    Anchors.unbind()
    Binder.destroy()
  })

  return Anchors
}
