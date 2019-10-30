import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount () {
      Events.emit('build.before')

      this.activeClass()

      Events.emit('build.after')
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass () {
      let classes = Glide.settings.classes
      let slide = Components.Html.slides[Glide.index]

      if (slide) {
        slide.classList.add(classes.slide.active)

        siblings(slide).forEach((sibling) => {
          sibling.classList.remove(classes.slide.active)
        })
      }
    },

    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses () {
      const { slide } = Glide.settings.classes

      Components.Html.slides.forEach((sibling) => {
        sibling.classList.remove(slide.active)
      })
    }
  }

  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */
  Events.on(['destroy', 'update'], () => {
    Build.removeClasses()
  })

  /**
   * Remount component:
   * - on resizing of the window to calculate new dimentions
   * - on updating settings via API
   */
  Events.on(['resize', 'update'], () => {
    Build.mount()
  })

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.on('move.after', () => {
    Build.activeClass()
  })

  return Build
}
