import DOM from './dom'
import Core from './core'
import Translate from './translate'
import Transition from './transition'
import Dimensions from './dimensions'

class Animation {
  /**
   * Construct animation.
   */
  constructor() {
    this.displacement = 0
  }

  /**
   * Make configured animation type.
   *
   * @param  {Number} displacement
   * @return {self}
   */
  make(offset) {
    this.offset = offset

    this[Core.settings.type]();

    return this
  }

  /**
   * Logic of the `slider` animation type.
   *
   * @return {Void}
   */
  slider() {
    var translate = (Dimensions.slideSize * Core.index)

    if (Core.settings.focusAt === 'center') {
      translate = translate - (Dimensions.width/2 - Dimensions.slideSize/2);
    }

    if (Core.settings.focusAt > 0) {
      translate = translate - (Dimensions.slideSize * Core.settings.focusAt);
    }

    Transition.set('transform')
    Translate.set(translate)
  }

  /**
   * Run callback after animation.
   *
   * @param  {Closure} callback
   * @return {Integer}
   */
  after(callback) {
      return setTimeout(() => {
        callback()
      }, Core.settings.animationDuration + 20)
  }

  /**
   * Gets value of the additional animation displacement.
   *
   * @return {Integer}
   */
  get offset() {
    return this.displacement
  }

  /**
   * Sets value of the additional animation displacement.
   *
   * @param  {Number} value
   * @return {self}
   */
  set offset(value) {
    this.displacement = (typeof value !== 'undefined') ? parseInt(value) : 0;

    return this
  }
}

export default new Animation()
