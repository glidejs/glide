import { isObject } from './unit'

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
export function define (obj, prop, definition) {
  Object.defineProperty(obj, prop, definition)
}

/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */
export function sortKeys (obj) {
  return Object.keys(obj).sort().reduce((r, k) => {
    r[k] = obj[k]

    return (r[k], r)
  }, {})
}

/**
 * Deeply merges two objects.
 *
 * @param  {Object} target
 * @param  {Object} source
 * @return {Object}
 */
export function merge (target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        merge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    })
  }

  return target
}
