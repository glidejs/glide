import defaults from '../../src/defaults'

export function afterTransition (callback) {
  setTimeout(callback, defaults.animationDuration + 10)
}
