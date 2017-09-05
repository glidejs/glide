import Core from '../components/core'

class Callbacks {
  /**
   * Calls callback with attributes.
   *
   * @param {Function} closure
   * @return {self}
   */
  call(closure) {
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

export default new Callbacks()