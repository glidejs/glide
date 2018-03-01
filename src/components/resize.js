import { throttle } from '../utils/wait'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  const Resize = {
    /**
     * Initializes window bindings.
     */
    mount () {
      this.bind()
    },

    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('resize', window, throttle(() => {
        Events.emit('resize')
      }, Glide.settings.throttle))
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('resize', window)
    }
  }

  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */
  Events.on('destroy', () => {
    Resize.unbind()
    Binder.destroy()
  })

  return Resize
}
