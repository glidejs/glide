import Run from './run'
import Core from './core'
import Build from './build'
import Transition from './transition'

import Binder from '../binder'

import debounce from '../utils/debounce'

class Window extends Binder {
  /**
   * Initializes window bindings.
   */
  init () {
    this.bind()
  }

  /**
   * Binds `rezsize` listener to the window.
   * It's a costly event, so we are debouncing it.
   *
   * @return {Void}
   */
  bind () {
    this.on('resize', window, debounce(this.resize.bind(this), Core.settings.debounce.resize))
  }

  /**
   * Unbinds listeners from the window.
   *
   * @return {Void}
   */
  unbind () {
    this.off('resize', window)
  }

  /**
   * Handler for `resize` event. Rebuilds glide,
   * so its status matches new dimentions.
   */
  resize () {
    if (!Core.destroyed) {
      Transition.disable()

      Build.init()
      Run.make(`=${Core.index}`).init()

      Transition.enable()
    }
  }
}

export default new Window()
