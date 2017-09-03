import Run from './run'
import Core from './core'
import Build from './build'
import Transition from './transition'

import Binder from '../events/binder'

import debounce from '../utils/debounce'

class Window extends Binder {
  init() {
    this.bind()
  }

  bind() {
    this.on('resize', window, debounce(this.resize, Core.settings.debounce))
  }

  unbind() {
    this.off('resize', window)
  }

  resize() {
    if(! Core.destroyed) {
      Transition.disable()

      Build.init()
      Run.make(`=${Core.index}`).init()

      Transition.enable()
    }
  }
}

export default new Window()