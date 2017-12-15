import debounce from '../utils/debounce'
import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

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
      Events.on('resize', window, debounce(this.resize.bind(this), Glide.settings.debounce.resize))
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind () {
      Events.off('resize', window)
    },

    /**
     * Handler for `resize` event. Rebuilds glide,
     * so its status matches new dimentions.
     */
    resize () {
      if (!Glide.destroyed) {
        Components.Transition.disable()

        Components.Build.init()
        Components.Run.make(`=${Glide.index}`).init()

        Components.Transition.enable()
      }
    }
  }
}
