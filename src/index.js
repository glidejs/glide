import { warn } from './utils/log'
import { init } from './core/index'
import { EventsBus } from './core/event/index'

import defaults from './defaults'

import Run from './components/run'
import Html from './components/html'
import Peek from './components/peek'
import Build from './components/build'
import Swipe from './components/swipe'
import Clones from './components/clones'
import Height from './components/height'
import Window from './components/window'
import Images from './components/images'
import Anchors from './components/anchors'
import Controls from './components/controls'
import Keyboard from './components/keyboard'
import Autoplay from './components/autoplay'
import Callbacks from './components/callbacks'
import Animation from './components/animation'
import Transition from './components/transition'
import Translate from './components/translate'
import Dimensions from './components/dimensions'

const COMPONENTS = {
  // Required
  Html,
  Translate,
  Transition,
  Dimensions,
  Animation,
  Peek,
  Clones,
  Window,
  Callbacks,
  Build,
  Run,
  // Optional
  Swipe,
  Height,
  Images,
  Anchors,
  Controls,
  Keyboard,
  Autoplay
}

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor (selector, options = {}) {
    this.settings = Object.assign(defaults, options)

    this.disabled = false
    this.selector = selector
    this.index = this.settings.startAt

    this.settings.beforeInit(this)

    this.mount(this.settings.extensions)

    this.settings.afterInit(this)
  }

  /**
   * Initializes glide components.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Void}
   */
  mount (extensions) {
    init(this, Object.assign(extensions, COMPONENTS), new EventsBus())
  }

  /**
   * Gets value of the core options.
   *
   * @return {Object}
   */
  get settings () {
    return this._opt
  }

  /**
   * Sets value of the core options.
   *
   * @param  {Object} opt
   * @return {Void}
   */
  set settings (opt) {
    if (typeof opt === 'object') {
      this._opt = opt
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
    return this._i
  }

  /**
   * Sets current index a slider.
   *
   * @return {Object}
   */
  set index (i) {
    this._i = parseInt(i)
  }

  /**
   * Gets type name of the slider.
   *
   * @return {String}
   */
  get type () {
    return this.settings.type
  }

  /**
   * Checks if slider is a precised type.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isType (name) {
    return this.settings.type === name
  }
}
