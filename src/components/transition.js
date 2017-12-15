
export default function (Glide, Components) {
  let disabled = false

  return {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose (property = 'transform') {
      let settings = Glide.settings

      if (!disabled) {
        return `${property} ${settings.animationDuration}ms ${settings.animationTimingFunc}`
      }

      return `${property} 0ms ${settings.animationTimingFunc}`
    },

    /**
     * Sets value of transition.
     *
     * @param {String} property
     * @return {self}
     */
    set (property) {
      Components.Html.wrapper.style.transition = this.compose(property)

      return this
    },

    /**
     * Enable transition.
     *
     * @return {self}
     */
    enable () {
      disabled = false

      return this
    },

    /**
     * Disable transition.
     *
     * @return {self}
     */
    disable () {
      disabled = true

      return this
    }
  }
}
