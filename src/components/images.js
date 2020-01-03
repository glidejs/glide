import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  const { Html } = Components

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
      Binder.on('dragstart', Html.wrapper, (event) => {
        event.preventDefault()
      })
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('dragstart', Html.wrapper)
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
