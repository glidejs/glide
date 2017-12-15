import { siblings } from '../utils/dom'

export default function (Glide, Components) {
  return {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    init () {
      Components.Transition.disable()
      Components.Peek.init()
      Components.Dimensions.apply()

      this.typeClass()
      this.modeClass()
      this.activeClass()
      this.setHeight()

      Components.Animation.make()
      Components.Transition.enable()
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
     * Adds `mode` class to the glide element.
     *
     * @return {Void}
     */
    modeClass () {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.mode])
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
