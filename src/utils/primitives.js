export function isString(value) {
  return typeof value === 'string'
}

export function isObject(value) {
  return typeof value === 'object'
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isUndefined(value) {
  return typeof value === 'undefined'
}

export function isArray(value) {
  return value.constructor === Array
}

export function isPercentage(value) {
  return (isString(value)) && (value.indexOf('%') >= 0)
}
