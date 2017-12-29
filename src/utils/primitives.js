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
 */
export function isObject (value) {
  return typeof value === 'object'
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

/**
 * Indicates whether the specified value is a precentage value represented as string.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
export function isPercentage (value) {
  return (isString(value)) && (value.indexOf('%') >= 0)
}
