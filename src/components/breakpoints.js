import { warn } from '../utils/log'
import { isObject } from '../utils/unit'
import { sortKeys } from '../utils/object'

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} breakpoints
 * @returns {Object}
 */
function sortBreakpoints (breakpoints) {
  if (isObject(breakpoints)) {
    return sortKeys(breakpoints)
  } else {
    warn(`Breakpoints option must be an object`)
  }

  return {}
}

export default function (Glide, Components, Events) {
  /**
   * Sort brekpoints from smaller to larger. It is required in order
   * to proper matching currently active breakpoint settings.
   */
  Glide.settings.breakpoints = sortBreakpoints(Glide.settings.breakpoints)

  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */
  let defaults = Object.assign({}, Glide.settings)

  const BREAKPOINTS = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} breakpoints
     * @returns {Object}
     */
    match (breakpoints) {
      if (typeof window.matchMedia !== 'undefined') {
        for (const point in breakpoints) {
          if (breakpoints.hasOwnProperty(point)) {
            if (window.matchMedia(`(max-width: ${point}px)`).matches) {
              return breakpoints[point]
            }
          }
        }
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
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */
  Events.listen('resize', () => {
    Glide.settings = Object.assign(Glide.settings, BREAKPOINTS.match(Glide.settings.breakpoints))
  })

  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */
  Events.listen('update', () => {
    Glide.settings.breakpoints = sortBreakpoints(Glide.settings.breakpoints)

    defaults = Object.assign({}, Glide.settings)
  })

  return BREAKPOINTS
}
