import DOM from './dom'
import Dimensions from './dimensions'

/**
 * Collection of available translate axes.
 *
 * @type {Object}
 */
const AXES = {
  x: 0,
  y: 0,
  z: 0
}

class Translate {
  /**
   * Gets value of translate.
   *
   * @param  {Integer} value
   * @return {String}
   */
  get(value) {
    AXES[Dimensions.dimention.axis] = parseInt(value)

    return 'translate3d(' + (-1 * AXES.x) + 'px, ' + (-1 * AXES.y) + 'px, ' + (-1 * AXES.z) + 'px)'
  }

  /**
   * Sets value of translate.
   *
   * @param {HTMLElement} el
   * @return {self}
   */
  set(value) {
      DOM.wrapper.style.transform = this.get(value)

      return this
  }
}

export default new Translate()
