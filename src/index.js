import DOM from './components/dom'
import Run from './components/run'
import Core from './components/core'
import Build from './components/build'
import Swipe from './components/swipe'
import Arrows from './components/arrows'
import Window from './components/window'

import Trigger from './events/trigger'

import defaults from './defaults'

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor(selector, options = {}) {
    this.selector = selector
    this.options = options

    let settings = Object.assign(defaults, options)

    Core.settings = settings
    Core.index = settings.startAt

    new Trigger(settings.beforeInit)

    this.init()

    new Trigger(settings.afterInit)
  }

  /**
   * Initializes glide components.
   *
   * @return {Void}
   */
  init() {
    DOM.init(this.selector)
    Build.init()
    Swipe.init()
    Arrows.init()
    Window.init()
    Run.init()
  }

  /**
   * Gets current slide index.
   *
   * @return {Number}
   */
  index() {
    return Core.index
  }
}