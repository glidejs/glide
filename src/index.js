import { warn } from './utils/log'
import { init } from './core/index'

import defaults from './defaults'

import Run from './components/run'
import Html from './components/html'
import Peek from './components/peek'
import Build from './components/build'
import Swipe from './components/swipe'
import Window from './components/window'
import Images from './components/images'
import Anchors from './components/anchors'
import Controls from './components/controls'
import Callbacks from './components/callbacks'
import Animation from './components/animation'
import Transition from './components/transition'
import Translate from './components/translate'
import Dimensions from './components/dimensions'

const COMPONENTS = {
  Html,
  Build,
  Controls,
  Anchors,
  Callbacks,
  Animation,
  Images,
  Window,
  Swipe,
  Run,
  Transition,
  Dimensions,
  Translate,
  Peek
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

  /**
   * Checks if slider is a precised type.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isType (name) {
    return this.settings.type === name
  }

  /**
   * Checks if slider is in precised mode.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isMode (name) {
    return this.settings.mode === name
  }
}
