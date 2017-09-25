import DOM from './dom'
import Core from './core'
import Translate from './translate'
import Transition from './transition'

import { ucfirst } from '../utils/string'

import Slider from '../types/slider'

const TYPES = {
  Slider
}

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

    this.apply()

    return this
  }

  /**
   * Applies an animation.
   *
   * @return {Void}
   */
  apply() {
    Transition.set()
    Translate.set(this.translate - this.offset)
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
    }, Core.settings.animationDuration + 10)
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
  }

  /**
   * Gets translate value based on configured glide type.
   *
   * @return {Number}
   */
  get translate() {
    return TYPES[ucfirst(Core.type)].translate()
  }
}

export default new Animation()
