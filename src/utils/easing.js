/**
 * Easing functions
 *
 * https://gist.github.com/gre/1650294
 * http://easings.net
 */

// no easing, no acceleration
const easeLinear = (t) => t
// accelerating from zero velocity
const easeInQuad = (t) => t * t
// decelerating to zero velocity
const easeOutQuad = (t) => t * (2 - t)
// acceleration until halfway, then deceleration
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
// accelerating from zero velocity
const easeInCubic = (t) => t * t * t
// decelerating to zero velocity
const easeOutCubic = (t) => (--t) * t * t + 1
// acceleration until halfway, then deceleration
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
// accelerating from zero velocity
const easeInQuart = (t) => t * t * t * t
// decelerating to zero velocity
const easeOutQuart = (t) => 1 - (--t) * t * t * t
// acceleration until halfway, then deceleration
const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
// accelerating from zero velocity
const easeInQuint = (t) => t * t * t * t * t
// decelerating to zero velocity
const easeOutQuint = (t) => 1 + (--t) * t * t * t * t
// acceleration until halfway, then deceleration
const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t

export {
  easeLinear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
}
