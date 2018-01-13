export default function (Glide, Components, Events) {
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

  /**
   * Set new translate value on:
   * - standard moving on index change
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.listen(['move', 'carousel.jumping'], (context) => {
    TRANSLATE.set(context.movement)
  })

  return TRANSLATE
}
