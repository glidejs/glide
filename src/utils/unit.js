/**
 * Converts value entered as number 
 * or string to integer value.
 *
 * @param {Number|String} value
 * @returns {Number}
 */
export function toInt (value) {
  return parseInt(value)
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isString (value) {
  return typeof value === 'string'
}

/**
 * Indicates whether the specified value is an object.
 *
 * @param  {Mixed}   value
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
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isNumber (value) {
  return typeof value === 'number'
}

/**
 * Indicates whether the specified value is a function.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isFunction (value) {
  return typeof value === 'function'
}

/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isUndefined (value) {
  return typeof value === 'undefined'
}

/**
 * Indicates whether the specified value is an array.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isArray (value) {
  return value.constructor === Array
}
