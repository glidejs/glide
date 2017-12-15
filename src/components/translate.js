export default function (Glide, Components) {
  return {
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
      console.log(this.get(value))
      Components.Html.wrapper.style.transform = this.get(value)

      return this
    }
  }
}
