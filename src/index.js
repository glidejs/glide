import defaults from './defaults'
import { warn } from './utils/log'
import { mount } from './core/index'
import { isObject } from './utils/primitives'

import { Events, listen, emit } from './core/event/events-bus'

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
      mount(this, extensions, Events)
    } else {
      warn('You need to provide a components object on `mount()`')
    }

    emit('mount.after', this)

    return this
  }

  /**
   * Sets glide into a idle status.
   *
   * @return {Void}
   */
  disable () {
    this.disabled = true

    return this
  }

  /**
   * Sets glide into a active status.
   *
   * @return {Void}
   */
  enable () {
    this.disabled = false

    return this
  }

  /**
   * Adds cuutom event listener with handler.
   *
   * @param  {String|Array} event
   * @param  {Function} handler
   * @return {Void}
   */
  on (event, handler) {
    listen(event, handler)

    return this
  }

  /**
   * Checks if glide is a precised type.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isType (name) {
    return this.settings.type === name
  }

  /**
   * Checks if glide is idle.
   *
   * @return {Boolean}
   */
  isDisabled () {
    return this.disabled === true
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
   * Gets value of the idle status.
   *
   * @return {Boolean}
   */
  get disabled () {
    return this._d
  }

  /**
   * Sets value of the idle status.
   *
   * @return {Boolean}
   */
  set disabled (status) {
    this._d = !!status
  }
}
