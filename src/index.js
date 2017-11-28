import defaults from './defaults'
import { warn } from './utils/log'

import { init } from './core/index'

// import Run from './components/run'
import Html from './components/html'
// import Build from './components/build'
// import Swipe from './components/swipe'
// import Arrows from './components/arrows'
// import Window from './components/window'
// import Images from './components/images'
import Anchors from './components/anchors'
// import Callbacks from './components/callbacks'

const COMPONENTS = {
  Html,
  Anchors
  // Build,
  // Images,
  // Swipe,
  // Arrows,
  // Window,
  // Run
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
    this.settings = Object.assign(defaults, options)
    this.index = this.settings.startAt

    this.mount()
  }

  /**
   * Initializes glide components.
   *
   * @return {Void}
   */
  mount () {
    init(this, Object.assign(this.settings.extensions, COMPONENTS))
  }

  /**
   * Gets value of the core options.
   *
   * @return {Object}
   */
  get settings () {
    return this.opt
  }

  /**
   * Sets value of the core options.
   *
   * @param  {Object} opt
   * @return {Void}
   */
  set settings (opt) {
    if (typeof opt === 'object') {
      this.opt = opt
    } else {
      warn('Options must be an `object` instance.')
    }
  }

  /**
   * Gets current index of the slider.
   *
   * @return {Object}
   */
  get index () {
    return this.i
  }

  /**
   * Sets current index a slider.
   *
   * @return {Object}
   */
  set index (i) {
    this.i = parseInt(i)
  }

  /**
   * Gets type name of the slider.
   *
   * @return {String}
   */
  get type () {
    return this.settings.type
  }
}
