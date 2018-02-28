import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  const KEYBOARD = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount () {
      if (Glide.settings.keyboard) {
        this.bind()
      }
    },

    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('keyup', document, this.press)
    },

    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('keyup', document)
    },

    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press (event) {
      if (event.keyCode === 39) {
        Components.Run.make(Components.Direction.resolve('>'))
      }

      if (event.keyCode === 37) {
        Components.Run.make(Components.Direction.resolve('<'))
      }
    }
  }

  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */
  Events.listen(['destroy', 'update'], () => {
    KEYBOARD.unbind()
  })

  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */
  Events.listen('update', () => {
    KEYBOARD.mount()
  })

  return KEYBOARD
}
