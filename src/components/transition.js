export default function (Glide, Components, Events) {
  let disabled = false

  const TRANSITION = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose (property = 'transform') {
      let settings = Glide.settings

      if (!disabled) {
        if (Glide.isType('slider') && Components.Run.isOffset('<') || Components.Run.isOffset('>')) {
          return `${property} ${settings.rewindDuration}ms ${settings.animationTimingFunc}`
        }

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
     * Runs callback after animation.
     *
     * @param  {Closure} callback
     * @return {Integer}
     */
    after (callback) {
      setTimeout(() => {
        callback()
      }, Glide.settings.animationDuration)
    },

    /**
     * Enable transition.
     *
     * @return {self}
     */
    enable () {
      disabled = false

      return this.set()
    },

    /**
     * Disable transition.
     *
     * @return {self}
     */
    disable () {
      disabled = true

      return this.set()
    }
  }

  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */
  Events.listen('move', () => {
    TRANSITION.set()
  })

  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimentions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.listen(['build.before', 'resize', 'translate.jump'], () => {
    TRANSITION.disable()
  })

  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */
  Events.listen('run', () => {
    TRANSITION.enable()
  })

  return TRANSITION
}
