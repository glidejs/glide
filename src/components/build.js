import { siblings } from '../utils/dom'
import { listen, emit } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  const BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    mount () {
      emit('build.before', Glide)

      this.dirClass()
      this.typeClass()
      this.activeClass()

      emit('build.after', Glide)
    },

    /**
     * Adds `rtl` class to the glide element.
     *
     * @return {Void}
     */
    dirClass () {
      if (Glide.settings.rtl) {
        Components.Html.root.classList.add(Glide.settings.classes.rtl)
      }
    },

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass () {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type])
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass () {
      let settings = Glide.settings
      let slide = Components.Html.slides[Glide.index]

      slide.classList.add(settings.classes.activeSlide)

      siblings(slide).forEach(sibling => {
        sibling.classList.remove(settings.classes.activeSlide)
      })
    }
  }

  /**
   * Reinit building of the glide:
   * - on resizing of the window to calculate new dimentions
   * - on reiniting via API to recalculate dimentions
   */
  listen(['resize', 'reinit'], () => {
    BUILD.mount()
  })

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  listen('move.after', () => {
    BUILD.activeClass()
  })

  return BUILD
}
