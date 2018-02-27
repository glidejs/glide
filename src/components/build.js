import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
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
     * @todo move this method to direction component. It should be responsible for appling class.
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
      let classes = Glide.settings.classes
      let slide = Components.Html.slides[Glide.index]

      slide.classList.add(classes.activeSlide)

      siblings(slide).forEach((sibling) => {
        sibling.classList.remove(classes.activeSlide)
      })
    },

    /**
     * Removes HTML classes applied at building.
     *
     * @todo Move removing rtl class logic to direction component.
     * @return {Void}
     */
    removeClasses () {
      let classes = Glide.settings.classes

      Components.Html.root.classList.remove(classes[Glide.settings.type])

      Components.Html.root.classList.remove(classes.rtl)

      Components.Html.slides.forEach((sibling) => {
        sibling.classList.remove(classes.activeSlide)
      })
    }
  }

  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */
  Events.listen(['destroy', 'update'], () => {
    BUILD.removeClasses()
  })

  /**
   * Remount component:
   * - on resizing of the window to calculate new dimentions
   * - on updating settings via API
   */
  Events.listen(['resize', 'update'], () => {
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
