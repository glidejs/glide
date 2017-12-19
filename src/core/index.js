/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Glide} glide
 * @param {Object} extensions
 *
 * @returns {Void}
 */
export function init (glide, extensions, events) {
  const components = {}

  for (let name in extensions) {
    components[name] = extensions[name](glide, components, events)
  }

  for (let name in components) {
    if (typeof components[name].init === 'function') {
      components[name].init()
    }
  }
}
