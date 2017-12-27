import defaults from './defaults'
import { warn } from './utils/log'
import { mount } from './core/index'
import { isObject } from './utils/primitives'

import { Events, listen, emit } from './core/event/events-bus'

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
import Movement from './components/movement'
import Translate from './components/translate'
import Transition from './components/transition'
import Dimensions from './components/dimensions'

const COMPONENTS = {
  // Required
  Html,
  Translate,
  Transition,
  Dimensions,
  Movement,
  Peek,
  Clones,
  Window,
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
  }

  /**
   * Initializes glide components.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Void}
   */
  mount (extensions = {}) {
    emit('mount.before', this)

    if (isObject(extensions)) {
      mount(this, Object.assign(extensions, COMPONENTS), Events)
    } else {
      warn('You need to provide a components object on `mount()`')
    }

    emit('mount.after', this)

    return this
  }

  /**
   * Gets value of the core options.
   *
   * @return {Object}
   */
  get settings () {
    return this._o
  }

  /**
   * Sets value of the core options.
   *
   * @param  {Object} opt
   * @return {Void}
   */
  set settings (opt) {
    if (isObject(opt)) {
      this._o = opt
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
   * Adds event listener.
   *
   * @param  {String|Array} event
   * @param  {Callable} handler
   * @return {Void}
   */
  on (event, handler) {
    listen(event, handler)
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
