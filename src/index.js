import defaults from './defaults'
import { warn } from './utils/log'
import { mount } from './core/index'
import { toInt, isObject } from './utils/unit'
import { EventsBus } from './core/event/events-bus'

let Events = null
let Components = {}

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor (selector, options = {}) {
    Events = new EventsBus()

    this.disabled = false
    this.selector = selector
    this.settings = Object.assign({}, defaults, options)
    this.index = this.settings.startAt
  }

  /**
   * Initializes glide components.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Self}
   */
  mount (extensions = {}) {
    Events.emit('mount.before')

    if (isObject(extensions)) {
      Components = mount(this, extensions, Events)
    } else {
      warn('You need to provide a components object on `mount()`')
    }

    Events.emit('mount.after')

    return this
  }

  /**
   * Reinits glide with specified settings.
   *
   * @param {Object} settings
   * @return {Self}
   */
  reinit (settings = {}) {
    this.settings = Object.assign(this.settings, settings)
    this.index = this.settings.startAt

    Events.emit('reinit')

    return this
  }

  /**
   * Reinits glide with specified settings.
   *
   * @param {Object} settings
   * @return {Self}
   */
  update (settings = {}) {
    this.settings = Object.assign(this.settings, settings)

    Events.emit('update')

    return this
  }

  /**
   * Change slide with specified pattern. A pattern must be in the special format:
   * `>` - Move one forward
   * `<` - Move one backward
   * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
   * `>>` - Rewinds to end (last slide)
   * `<<` - Rewinds to start (first slide)
   *
   * @param {String} pattern
   * @return {Self}
   */
  go (pattern) {
    Components.Run.make(pattern)

    return this
  }

  /**
   * Move track by specified distance.
   *
   * @param {String} distance
   * @return {Self}
   */
  move (distance) {
    Components.Transition.disable()
    Components.Move.make(distance)

    return this
  }

  /**
   * Destroy instance and revert all changes done by components.
   *
   * @return {Self}
   */
  destroy () {
    Events.emit('destroy')

    return this
  }

  /**
   * Unpause instance autoplaying.
   *
   * @return {Self}
   */
  play () {
    Events.emit('play')

    return this
  }

  /**
   * Unpause instance autoplaying.
   *
   * @return {Self}
   */
  pause () {
    Events.emit('pause')

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
    Events.listen(event, handler)

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
    this._i = toInt(i)
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
