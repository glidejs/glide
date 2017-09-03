import Core from '../components/core'

export default class Trigger {
  /**
   * Calls callback with attributes.
   *
   * @param {Function} closure
   * @return {self}
   */
  constructor(closure) {
    if ((closure !== 'undefined') && (typeof closure === 'function')) {
      closure(this.attrs)
    }
  }

  /**
   * Gets attributes for events callback's parameter.
   *
   * @return {Object}
   */
  get attrs() {
    return {
      index: Core.index
    }
  }
}