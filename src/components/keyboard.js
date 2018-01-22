import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
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
      Binder.on('keyup', document)
    },

    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press (event) {
      if (event.keyCode === 39) {
        if (Glide.settings.rtl) {
          Components.Run.make('<')
        } else {
          Components.Run.make('>')
        }
      }

      if (event.keyCode === 37) {
        if (Glide.settings.rtl) {
          Components.Run.make('>')
        } else {
          Components.Run.make('<')
        }
      }
    }
  }

  /**
   * Remove bindings from keyboard:
   * - on destroying, to remove added EventListeners
   */
  Events.listen('destroy', () => {
    KEYBOARD.unbind()
  })

  return KEYBOARD
}
