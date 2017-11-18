import DOM from './dom'
import Core from './core'
import Peek from './peek'
import Animation from './animation'
import Transition from './transition'
import Dimensions from './dimensions'

import { siblings } from '../utils/dom'

class Build {
  /**
   * Init glide building. Adds classes, sets
   * dimensions and setups initial state.
   */
  init () {
    Transition.disable()
    Peek.init()
    Dimensions.apply()

    this.typeClass()
    this.modeClass()
    this.activeClass()
    this.setHeight()

    Animation.make()
    Transition.enable()
  }

  /**
   * Sets height of the slides track.
   *
   * @return {Void}
   */
  setHeight () {
    if (Core.settings.autoheight) {
      // Core.Height.set();
    }
  }

  /**
   * Adds `type` class to the glide element.
   *
   * @return {Void}
   */
  typeClass () {
    const settings = Core.settings

    let type = settings.classes[settings.type]

    DOM.element.classList.add(type)
  }

  /**
   * Adds `mode` class to the glide element.
   *
   * @return {Void}
   */
  modeClass () {
    const settings = Core.settings

    let mode = settings.classes[settings.mode]

    DOM.element.classList.add(mode)
  }

  /**
   * Sets active class to current slide.
   *
   * @return {Void}
   */
  activeClass () {
    const settings = Core.settings

    let slide = DOM.slides[Core.index]

    slide.classList.add(settings.classes.activeSlide)

    siblings(slide).forEach((sibling) => {
      sibling.classList.remove(settings.classes.activeSlide)
    })
  }
}

export default new Build()
