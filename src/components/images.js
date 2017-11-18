import DOM from './dom'

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
    this.on('dragstart', DOM.wrapper, this.dragstart)
  }

  /**
   * Unbinds `dragstart` event on wrapper.
   *
   * @return {Void}
   */
  unbind () {
    this.off('dragstart', DOM.wrapper, this.dragstart)
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
