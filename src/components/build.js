import { siblings, getFocusableElements } from '../utils/dom'

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
     * Sets visible classes and hidden accessibility attributes on slides
     *
     * @return {Void}
     */
    setVisibleSlideAttributes () {
      Components.Html.slides.forEach((slide, index) => {
        // if slide is in visible range
        if (index >= Glide.index && index < (Glide.index + Glide.settings.perView)) {
          // remove aria hidden and negative tabindex on focusable children
          getFocusableElements(slide, true).forEach((focusableElement) => focusableElement.removeAttribute('tabindex'))
          slide.removeAttribute('aria-hidden')
          slide.classList.add(Glide.settings.classes.slide.visible)
        } else {
          // apply tabindex = -1 to all focusable elements within the slide
          getFocusableElements(slide).forEach((focusableElement) => focusableElement.setAttribute('tabindex', '-1'))
          slide.setAttribute('aria-hidden', 'true')
          slide.classList.remove(Glide.settings.classes.slide.visible)
        }
      })
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

    if (Glide.settings.setVisibleAttributes) {
      Build.setVisibleSlideAttributes()
    }
  })

  return Build
}
