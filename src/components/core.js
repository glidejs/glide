import uid from '../utils/uid'

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
   * Initialize core of the slider.
   *
   * @return {Void}
   */
  init() {

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
    this.opt = opt
  }

  /**
   * Gets node of the slider main element.
   *
   * @return {Object}
   */
  get element() {
    return this.el
  }

  /**
   * Sets node of the slider main element.
   *
   * @return {Object}
   */
  set element(el) {
    this.el = el
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
}

export default new Core(uid())