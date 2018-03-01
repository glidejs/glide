import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  const Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount () {
      this.bind()
    },

    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart)
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('dragstart', Components.Html.wrapper)
    },

    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart (event) {
      event.preventDefault()
    }
  }

  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */
  Events.on('destroy', () => {
    Images.unbind()
    Binder.destroy()
  })

  return Images
}
