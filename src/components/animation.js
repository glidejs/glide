import DOM from './dom'
import Core from './core'
import Translate from './translate'
import Transition from './transition'

import Slider from '../types/slider'

class Animation {
  /**
   * Constructs animation component.
   */
  constructor() {
    this.displacement = 0
  }

  /**
   * Makes configured animation type on slider.
   *
   * @param  {Number} offset
   * @return {self}
   */
  make(offset) {
    this.offset = offset

    this[Core.type]();

    return this
  }

  /**
   * Makes a `slider` animation type.
   *
   * @return {Void}
   */
  slider() {
    let translate = Slider.translate()

    Transition.set()
    Translate.set(translate)
  }

  /**
   * Runs callback after animation.
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
