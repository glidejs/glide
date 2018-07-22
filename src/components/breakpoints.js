import { warn } from '../utils/log'
import { throttle } from '../utils/wait'
import { isObject } from '../utils/unit'
import { sortKeys, mergeOptions } from '../utils/object'

import EventsBinder from '../core/event/events-binder'

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
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  let settings = Glide.settings

  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */
  let points = sortBreakpoints(settings.breakpoints)

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
        for (let point in points) {
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
  Object.assign(settings, Breakpoints.match(points))

  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */
  Binder.on('resize', window, throttle(() => {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points))
  }, Glide.settings.throttle))

  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */
  Events.on('update', () => {
    points = sortBreakpoints(points)

    defaults = Object.assign({}, settings)
  })

  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', () => {
    Binder.off('resize', window)
  })

  return Breakpoints
}
