import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

  return {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    init () {
      this.bind()
    },

    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind () {
      Events.on('dragstart', Components.Html.wrapper, this.dragstart)
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind () {
      Events.off('dragstart', Components.Html.wrapper, this.dragstart)
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
}
