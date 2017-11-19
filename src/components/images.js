import Html from './html'

import Binder from '../binder'

class Images extends Binder {
  /**
   * Binds listener to glide wrapper.
   *
   * @return {Void}
   */
  init () {
    this.bind()
  }

  /**
   * Binds `dragstart` event on wrapper to prevent dragging images.
   *
   * @return {Void}
   */
  bind () {
    this.on('dragstart', Html.wrapper, this.dragstart)
  }

  /**
   * Unbinds `dragstart` event on wrapper.
   *
   * @return {Void}
   */
  unbind () {
    this.off('dragstart', Html.wrapper, this.dragstart)
  }

  /**
   * Event handler. Prevents dragging.
   *
   * @return {Void}
   */
  dragstart (event) {
    event.preventDefault()
  }
}

export default new Images()
