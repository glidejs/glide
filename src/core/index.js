import { warn } from '../utils/log'
import { isFunc } from '../utils/unit'

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */
export function mount (glide, extensions, events) {
  const components = {}

  for (const name in extensions) {
    if (isFunc(extensions[name])) {
      components[name] = extensions[name](glide, components, events)
    } else {
      warn('Extension must be a function')
    }
  }

  for (const name in components) {
    if (isFunc(components[name].mount)) {
      components[name].mount()
    }
  }

  return components
}
