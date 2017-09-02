import warn from '../utils/warn'
import { timestamp } from '../utils/time'

class Core {
  /**
   * Construct core.
   *
   * @param {Integer} id
   */
  constructor(id) {
    this.id = id
    this.destroyed = false
  }

  /**
   * Gets value of the core options.
   *
   * @return {Object}
   */
  get settings() {
    return this.opt
  }

  /**
   * Sets value of the core options.
   *
   * @param  {Object} opt
   * @return {Void}
   */
  set settings(opt) {
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
  get index() {
    return this.i
  }

  /**
   * Sets current index a slider.
   *
   * @return {Object}
   */
  set index(i) {
    this.i = parseInt(i)
  }

  /**
   * Gets type name of the slider.
   *
   * @return {String}
   */
  get type() {
    return this.settings.type
  }

  /**
   * Checks if slider is a precised type.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isType(name) {
    return this.settings.type === name
  }

  /**
   * Checks if slider is in precised mode.
   *
   * @param  {String} name
   * @return {Boolean}
   */
  isMode(name) {
    return this.settings.mode === name
  }
}

export default new Core(timestamp())
