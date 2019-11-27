/**
 * Easing functions
 *
 * https://gist.github.com/gre/1650294
 * http://easings.net
 */
// no easing, no acceleration
export function easeLinear(t){ return t }
// accelerating from zero velocity
export function easeInQuad(t){ return t*t }
// decelerating to zero velocity
export function easeOutQuad(t){ return t*(2-t) }
// acceleration until halfway, then deceleration
export function easeInOutQuad(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
// accelerating from zero velocity
export function easeInCubic(t) { return t*t*t }
// decelerating to zero velocity
export function easeOutCubic(t) { return (--t)*t*t+1 }
// acceleration until halfway, then deceleration
export function easeInOutCubic(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
// accelerating from zero velocity
export function easeInQuart(t) { return t*t*t*t }
// decelerating to zero velocity
export function easeOutQuart(t) { return 1-(--t)*t*t*t }
// acceleration until halfway, then deceleration
export function easeInOutQuart(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }
// accelerating from zero velocity
export function easeInQuint(t) { return t*t*t*t*t }
// decelerating to zero velocity
export function easeOutQuint(t) { return 1+(--t)*t*t*t*t }
// acceleration until halfway, then deceleration
export function easeInOutQuint(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
