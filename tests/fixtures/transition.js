import defaults from '../../src/defaults'

export function afterTransition (callback) {
  setTimeout(callback, defaults.animationDuration + 10)
}

export function afterRewindTransition (callback) {
  setTimeout(callback, defaults.rewindDuration + 10)
}
