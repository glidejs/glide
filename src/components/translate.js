export default function (Glide, Components) {
  /**
   * Collection of available translate axes.
   *
   * @type {Object}
   */
  const AXES = {
    x: 0,
    y: 0,
    z: 0
  }

  return {
    /**
     * Gets value of translate.
     *
     * @param  {Integer} value
     * @return {String}
     */
    get (value) {
      AXES[Components.Dimensions.dimention.axis] = parseInt(value)

      return `translate3d(${-1 * AXES.x}px, ${-1 * AXES.y}px, ${-1 * AXES.z}px)`
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
}
