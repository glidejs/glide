import Core from './core'
import Dimensions from './dimensions'

import warn from '../utils/warn'

class Peek {
  /**
   * Construct peek component.
   */
  constructor() {
    this.size = 0
  }

  /**
   * Setups how much to peek based on settings.
   * 
   * @return {Void}
   */
  init() {
    this.value = Core.settings.peek
  }

  /**
   * Gets value of the peek.
   */
  get value() {
    return this.size
  }

  /**
   * Sets value of the peek.
   */
  set value(value) {
    if (typeof value === 'string') {
      let normalized = parseInt(value, 10)
      let isPercentage = value.indexOf('%') >= 0

      if (isPercentage) {
        value = parseInt(Dimensions.width * (normalized / 100))
      } else {
        value = normalized
      }
    }

    if (typeof value === 'number') {
      this.size = value
    } else {
      warn('Invalid peek value')
    }
  }
}

export default new Peek()