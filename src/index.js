import defaults from './defaults'

import Engine from './engine'

import Run from './components/run'
import Html from './components/html'
import Core from './components/core'
import Build from './components/build'
import Swipe from './components/swipe'
import Arrows from './components/arrows'
import Window from './components/window'
import Images from './components/images'
import Anchors from './components/anchors'
import Callbacks from './components/callbacks'

const COMPONENTS = {
  Html,
  Anchors,
  Build,
  Images,
  Swipe,
  Arrows,
  Window,
  Run
}

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor (selector, options = {}) {
    this.selector = selector
    this.options = options

    let settings = Object.assign(defaults, options)

    Core.settings = settings
    Core.index = settings.startAt

    Callbacks.call(settings.beforeInit)

    this.init()

    Callbacks.call(settings.afterInit)
  }

  /**
   * Initializes glide components.
   *
   * @return {Void}
   */
  init () {
    /* eslint-disable no-new */
    new Engine(this, Object.assign(COMPONENTS, Core.settings.extensions))
  }

  /**
   * Gets current slide index.
   *
   * @return {Number}
   */
  index () {
    return Core.index
  }
}
