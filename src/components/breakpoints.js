import { warn } from '../utils/log'
import { isObject } from '../utils/unit'
import { sortKeys } from '../utils/object'

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */
function sortBreakpoints (points) {
  if (isObject(points)) {
    return sortKeys(points)
  } else {
    warn(`Breakpoints option must be an object`)
  }

  return {}
}

export default function (Glide, Components, Events) {
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  let settings = Glide.settings

  /**
   * Holds reference to breakpoints object in settings
   *
   * @type {Object}
   */
  let points = settings.breakpoints

  /**
   * Sort breakpoints from smaller to larger. It is required in order
   * to proper matching currently active breakpoint settings.
   */
  points = sortBreakpoints(points)

  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */
  let defaults = Object.assign({}, settings)

  const Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match (points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (const point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia(`(max-width: ${point}px)`).matches) {
              return points[point]
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
  settings = Object.assign(settings, Breakpoints.match(points))

  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */
  Events.listen('resize', () => {
    settings = Object.assign(settings, Breakpoints.match(points))
  })

  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */
  Events.listen('update', () => {
    points = sortBreakpoints(points)

    defaults = Object.assign({}, settings)
  })

  return Breakpoints
}
