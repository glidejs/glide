import { define } from '../utils/object'
import { listen } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  const HEIGHT = {
    /**
     * Inits height. Adds `height` transition to the root.
     *
     * @return {Void}
     */
    mount () {
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

  /**
   * Set height of the current slide on:
   * - building, so it starts with proper dimensions
   * - each run, when slide changed
   */
  listen(['build.after', 'run'], () => {
    HEIGHT.set()
  })

  return HEIGHT
}
