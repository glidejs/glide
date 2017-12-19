import debounce from '../utils/debounce'
import { EventsBinder } from '../core/event/index'

export default function (Glide, Components) {
  let Binder = new EventsBinder()

  return {
    /**
     * Initializes window bindings.
     */
    init () {
      this.bind()
    },

    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('resize', window, debounce(this.resize.bind(this), Glide.settings.debounce.resize))
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('resize', window)
    },

    /**
     * Handler for `resize` event. Rebuilds glide,
     * so its status matches new dimentions.
     * 
     * @returns {Void}
     */
    resize () {
      Components.Transition.disable()
      Components.Build.init()
      Components.Run.make(`=${Glide.index}`).init()
      Components.Transition.enable()
    }
  }
}
