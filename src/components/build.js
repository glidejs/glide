import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  return {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    init () {
      Events.emit('build.init.before')

      this.typeClass()
      this.activeClass()
      this.setHeight()

      Events.emit('build.init.after')
    },

    /**
     * Sets height of the slides track.
     *
     * @return {Void}
     */
    setHeight () {
      if (Glide.settings.autoheight) {
        Components.Height.set()
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
}
