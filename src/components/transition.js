import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @private
   * @type {Boolean}
   */
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
        return `${property} ${this.duration}ms ${settings.animationTimingFunc}`
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
      }, this.duration)
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

  define(TRANSITION, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get () {
      let settings = Glide.settings

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration
      }

      return settings.animationDuration
    }
  })

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
