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

      this.typeClass()
      this.activeClass()

      Events.emit('build.after')
    },

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass () {
      Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type])
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass () {
      const classes = Glide.settings.classes
      const slide = Components.Html.slides[Glide.index]

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
      const { type, slide } = Glide.settings.classes

      Components.Html.root.classList.remove(type[Glide.settings.type])

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
   * - on resizing of the window to calculate new dimensions
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
