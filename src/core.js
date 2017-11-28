import { warn } from './utils/log'

export class Core {
  constructor (glide) {
    this.glide = glide
  }

  /**
   * Initializes all registered components.
   *
   * @param {Object} extensions
   * @returns {Void}
   */
  init (extensions) {
    const components = {}

    for (let name in extensions) {
      components[name] = extensions[name](this.glide, components)
    }

    for (let name in components) {
      if (typeof components[name].init === 'function') {
        components[name].init()
      } else {
        warn(`Extension [${name}] must implement a init() method`)
      }
    }
  }
}
