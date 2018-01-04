import { listen } from '../core/event/events-bus'

export default function (Glide, Components) {
  const defaults = Object.assign({}, Glide.settings)

  const MEDIA = {
    /**
     * Matches settings for currectly matching media breakpoint. 
     * 
     * @param {Object} breakpoints 
     * @returns {Object}
     */
    match (breakpoints) {
      for (const point in breakpoints) {
        if (breakpoints.hasOwnProperty(point)) {
          if (window.matchMedia(`(max-width: ${point})`).matches) {
            return breakpoints[point]
          }

          return defaults
        }
      }
    }
  }

  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */
  Glide.settings = Object.assign(Glide.settings, MEDIA.match(Glide.settings.breakpoints))

  /**
   * Reinit glide on:
   * - window resize with proper settings for matched breakpoint
   */
  listen('resize', () => {
    Glide.reinit(MEDIA.match(Glide.settings.breakpoints))
  })

  return MEDIA
}
