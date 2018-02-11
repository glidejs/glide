import { isObject } from '../utils/unit'
import { sortKeys } from '../utils/object'

export default function (Glide, Components, Events) {
  // If there are breakpoints, sort it smaller to larger.
  if (isObject(Glide.settings.breakpoints)) {
    Glide.settings.breakpoints = sortKeys(Glide.settings.breakpoints)
  }

  // Cache default settings before we overwritting.
  const defaults = Object.assign({}, Glide.settings)

  const BREAKPOINTS = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} breakpoints
     * @returns {Object}
     */
    match (breakpoints) {
      if (window.matchMedia) {
        for (const point in breakpoints) {
          if (breakpoints.hasOwnProperty(point)) {
            if (window.matchMedia(`(max-width: ${point}px)`).matches) {
              return breakpoints[point]
            }
          }
        }
      } else {
        warn('The `window.matchMedia` function is not supported. Please, add polyfill to be able to use `Breakpoint` component.')
      }

      return defaults
    }
  }

  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */
  Glide.settings = Object.assign(Glide.settings, BREAKPOINTS.match(Glide.settings.breakpoints))

  /**
   * Reinit glide on:
   * - window resize with proper settings for matched breakpoint
   */
  Events.listen('resize', () => {
    Glide.update(BREAKPOINTS.match(Glide.settings.breakpoints))
  })

  return BREAKPOINTS
}
