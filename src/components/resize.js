import { throttle } from '../utils/wait'
import { emit } from '../core/event/events-bus'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components) {
  const Binder = new EventsBinder()

  return {
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
        emit('resize')
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
}
