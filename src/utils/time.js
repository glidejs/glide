/**
 * Returns current time in timestamp format.
 *
 * @return {Number}
 */
export function timestamp() {
  return new Date().valueOf()
}

/**
 * Returns current time.
 *
 * @return {Number}
 */
export function now() {
  return new Date().getTime()
}