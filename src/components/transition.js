import DOM from './dom'
import Core from './core'

class Transition {
  /**
   * Construct transition.
   */
  constructor() {
    this.disabled = false
  }

  /**
   * Gets value of transition.
   *
   * @param {String} property
   * @return {String}
   */
  get(property = 'all') {
    let settings = Core.settings

    if (! this.disabled) {
      return `${property} ${settings.animationDuration}ms ${settings.animationTimingFunc}`
    }

    return `${property} 0ms ${settings.animationTimingFunc}`
  }

  /**
   * Sets value of transition.
   *
   * @param {String} property
   * @return {self}
   */
  set(property) {
    DOM.wrapper.style.transition = this.get(property)

    return this
  }

  /**
   * Enable transition.
   *
   * @return {self}
   */
  enable() {
    this.disabled = false

    return this
  }

  /**
   * Disable transition.
   *
   * @return {self}
   */
  disable() {
    this.disabled = true

    return this
  }
}

export default new Transition()
