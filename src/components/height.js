import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const HEIGHT = {
    /**
     * Sets height of the slider.
     *
     * @return {Void}
     */
    set () {
      if (Glide.settings.autoheight) {
        let style = Components.Html.track.style

        style.transition = Components.Transition.compose('height')
        style.height = this.value
      }
    },

    /**
     * Unsets height of the slider.
     *
     * @return {Void}
     */
    unset () {
      if (Glide.settings.autoheight) {
        let style = Components.Html.track.style

        style.transition = null
        style.height = null
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
  Events.listen(['build.after', 'run'], () => {
    HEIGHT.set()
  })

  /**
   * Clear applied height styles:
   * - on destroying, to bring HTML to its initial state
   */
  Events.listen('destroy', () => {
    HEIGHT.unset()
  })

  return HEIGHT
}
