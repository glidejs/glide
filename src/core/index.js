import { warn } from '../utils/log'

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Glide} glide
 * @param {Object} extensions
 *
 * @returns {Void}
 */
export function init (glide, extensions) {
  const components = {}

  for (let name in extensions) {
    components[name] = extensions[name](glide, components)
  }

  for (let name in components) {
    if (typeof components[name].init === 'function') {
      components[name].init()
    } else {
      warn(`Extension [${name}] must implement a init() method`)
    }
  }
}
