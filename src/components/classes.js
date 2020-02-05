import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const { Html } = Components

  const Classes = {
    /**
     * Adds initial classes.
     *
     * @return {Void}
     */
    mount () {
      Events.emit('classes.before')

      this.add()

      Events.emit('classes.after')
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    add () {
      const classes = Glide.settings.classes
      const slide = Html.slides[Glide.index]

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
    remove () {
      const { slide } = Glide.settings.classes

      Html.slides.forEach((sibling) => {
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
    Classes.remove()
  })

  /**
   * Remount component:
   * - on resizing of the window to calculate new dimentions
   * - on updating settings via API
   */
  Events.on(['resize', 'update'], () => {
    Classes.mount()
  })

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.on('run.after', () => {
    Classes.add()
  })

  return Classes
}
