import { define } from '../utils/object'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  const Binder = new EventsBinder()

  let detached = false
  let prevented = false

  const ANCHORS = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount () {
      this._a = Components.Html.wrapper.querySelectorAll('a')

      this.bind()
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('click', Components.Html.wrapper, this.click.bind(this))
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click (event) {
      event.stopPropagation()

      if (prevented) {
        event.preventDefault()
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach () {
      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false

          this.items[i].dataset.href = this.items[i].getAttribute('href')

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
      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true

          this.items[i].setAttribute('href', this.items[i].dataset.href)

          delete this.items[i].dataset.href
        }

        detached = false
      }

      return this
    },

    /**
     * Sets `prevented` status so anchors inside track are not clickable.
     *
     * @return {self}
     */
    prevent () {
      prevented = true

      return this
    },

    /**
     * Unsets `prevented` status so anchors inside track are clickable.
     *
     * @return {self}
     */
    unprevent () {
      prevented = false

      return this
    }
  }

  define(ANCHORS, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get () {
      return ANCHORS._a
    }
  })

  /**
   * Unbind anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */
  Events.listen('swipe.move', () => {
    ANCHORS.prevent().detach()
  })

  /**
   * Bind anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.listen('swipe.end', () => {
    Components.Transition.after(() => {
      ANCHORS.unprevent().attach()
    })
  })

  return ANCHORS
}
