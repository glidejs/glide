export default class Engine {
  /**
   * Constructs the engine.
   * 
   * @param {Glide} glide 
   * @param {Object} components 
   */
  constructor(glide, components) {
    for (var component in components) {
      components[component].init(glide)
    }
  }
}