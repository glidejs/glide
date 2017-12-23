import { listen } from '../core/event/events-bus'

export default function (Glide, Components) {
  const TRANSLATE = {
    /**
     * Gets value of translate.
     *
     * @param  {Integer} value
     * @return {String}
     */
    get (value) {
      return `translate3d(${-1 * value}px, 0px, 0px)`
    },

    /**
     * Sets value of translate.
     *
     * @param {HTMLElement} el
     * @return {self}
     */
    set (value) {
      Components.Html.wrapper.style.transform = this.get(value)

      return this
    }
  }

  listen(['animation.make', 'carousel.jumping'], (data) => {
    TRANSLATE.set(data.movement)
  })

  return TRANSLATE
}
