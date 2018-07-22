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
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */
export function mergeOptions (defaults, settings) {
  let options = Object.assign({}, defaults, settings)

  // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.
  if (settings.hasOwnProperty('classes')) {
    options.classes = Object.assign({}, defaults.classes, settings.classes)

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = Object.assign({}, defaults.classes.direction, settings.classes.direction)
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints)
  }

  return options
}
