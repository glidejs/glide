/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
export function toInt (value) {
  return parseInt(value)
}

/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */
export function toFloat (value) {
  return parseFloat(value)
}

/**
 * Converts a number or string of format /\d+(px|rem|em)?/
 * to a number in pixel units
 * @param {String|Number} value
 * @param {Glide} glide
 * @returns {Number}
 */
export function toPx (value) {
  const int = toInt(value)
  if (isNumber(value)) return int

  if (value.endsWith('rem')) {
    const { fontSize } = window.getComputedStyle(document.documentElement)
    return toInt(int * toFloat(fontSize))
  }

  return int
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */
export function isString (value) {
  return typeof value === 'string'
}

/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */
export function isObject (value) {
  let type = typeof value

  return type === 'function' || type === 'object' && !!value // eslint-disable-line no-mixed-operators
}

/**
 * Indicates whether the specified value is a number.
 *
 * @param  {*} value
 * @return {Boolean}
 */
export function isNumber (value) {
  return typeof value === 'number'
}

/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */
export function isFunction (value) {
  return typeof value === 'function'
}

/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */
export function isUndefined (value) {
  return typeof value === 'undefined'
}

/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */
export function isArray (value) {
  return value.constructor === Array
}
