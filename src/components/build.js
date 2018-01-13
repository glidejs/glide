import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    mount () {
      Events.emit('build.before', Glide)

      this.dirClass()
      this.typeClass()
      this.activeClass()

      Events.emit('build.after', Glide)
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
   * - on updating settings via API to recalculate dimentions
   */
  Events.listen(['resize', 'reinit', 'update'], () => {
    BUILD.mount()
  })

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.listen('move.after', () => {
    BUILD.activeClass()
  })

  return BUILD
}
