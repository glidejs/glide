import Core from './core'
import Dimensions from './dimensions'

import warn from '../utils/warn'

class Peek {
  constructor() {
    this.size = 0
  }

  init() {
    this.value = Core.settings.peek
  }

  get value() {
    return this.size
  }

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