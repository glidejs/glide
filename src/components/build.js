import { siblings } from '../utils/dom'
import { listen, emit } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  const BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    init () {
      emit('build.before')

      this.typeClass()
      this.activeClass()

      emit('build.after')
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

  listen('resize', () => {
    BUILD.init()
  })

  listen('move.after', () => {
    BUILD.activeClass()
  })

  return BUILD
}
