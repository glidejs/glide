import { define } from '../utils/object'

export default function (Glide, Components) {
  const HEIGHT = {
    /**
     * Inits height. Adds `height` transition to the root.
     *
     * @return {Void}
     */
    init () {
      if (Glide.settings.autoheight) {
        Components.Html.track.style.transition = Components.Transition.compose('height')
      }
    },

    /**
     * Sets height of the slider.
     *
     * @param {Boolean} force Force height setting even if option is turn off.
     * @return {Void}
     */
    set (force) {
      if (Glide.settings.autoheight || force) {
        Components.Html.track.style.height = this.value
      }
    }
  }

  define(HEIGHT, 'value', {
    /**
     * Gets height of the current slide.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides[Glide.index].offsetHeight
    }
  })

  return HEIGHT
}
