import DOM from './dom'
import Core from './core'
import Dimensions from './dimensions'

import { siblings } from '../utils/dom'

class Build {
  /**
   * Init glide building. Adds classes, sets
   * dimensions and setups initial state.
   */
  init() {
    this[Core.settings.type]()

    this.typeClass()
    this.modeClass()
    this.activeClass()
    this.setHeight()
  }

  /**
   * Build glide of `slider` type.
   *
   * @return {Void}
   */
  slider() {
      // // Turn on jumping flag.
      // Core.Transition.jumping = true;

      // Apply slides width.
      Dimensions.apply()

      // // Apply translate.
      // Glide.track.css(Glide.size, Glide[Glide.size] * Glide.length);

      // // If mode is vertical apply height.
      // if (this.isMode('vertical')) {
      //     Core.Height.set(true);
      // }

      // // Go to startup position.
      // Core.Animation.make();

      // // Turn off jumping flag.
      // Core.Transition.jumping = false;
  }

  /**
   * Build glide of `carousel` type.
   *
   * @return {Void}
   */
  carousel() {
      // // Turn on jumping flag.
      // Core.Transition.jumping = true;

      // // Update shift for carusel type.
      // Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length / 2) - Glide[Glide.size];

      // Apply slides width.
      Dimensions.setupSlides()

      // // Apply translate.
      // Glide.track.css(Glide.size, (Glide[Glide.size] * Glide.length) + Core.Clones.getGrowth());

      // // If mode is vertical apply height.
      // if (this.isMode('vertical')) {
      //     Core.Height.set(true);
      // }

      // // Go to startup position.
      // Core.Animation.make();

      // // Append clones.
      // Core.Clones.append();

      // // Turn off jumping flag.
      // Core.Transition.jumping = false;
  }

  /**
   * Build glide of `slideshow` type.
   *
   * @return {Void}
   */
  slideshow() {
    // // Turn on jumping flag
    // Core.Transition.jumping = true;

    // // Go to startup position
    // Core.Animation.make();

    // // Turn off jumping flag
    // Core.Transition.jumping = false;
  }

  /**
   * Sets height of the slides track.
   *
   * @return {Void}
   */
  setHeight() {
    if (Core.settings.autoheight) {
      // Core.Height.set();
    }
  }

  /**
   * Adds `type` class to the glide element.
   *
   * @return {Void}
   */
  typeClass() {
    const settings = Core.settings

    let type = settings.classes[settings.type]

    DOM.element.classList.add(type)
  }

  /**
   * Adds `mode` class to the glide element.
   *
   * @return {Void}
   */
  modeClass() {
    const settings = Core.settings

    let mode = settings.classes[settings.mode]

    DOM.element.classList.add(mode)
  }

  /**
   * Sets active class to current slide.
   *
   * @return {Void}
   */
  activeClass() {
    const settings = Core.settings

    let slide = DOM.slides[Core.index]

    slide.classList.add(settings.classes.activeSlide)

    siblings(slide).forEach((sibling) => {
      sibling.classList.remove(settings.classes.activeSlide)
    })
  }
}

export default new Build()
