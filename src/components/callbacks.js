import { define } from '../utils/object'

export default function (Glide, Components) {
  const CALLBACKS = {
    /**
     * Calls callback with attributes.
     *
     * @param {Function} closure
     * @return {self}
     */
    call (closure) {
      if (closure !== 'undefined' && typeof closure === 'function') {
        closure(this.params)
      }
    }
  }

  define(CALLBACKS, 'params', {
    /**
     * Gets attributes for events callback's parameter.
     *
     * @return {Object}
     */
    get () {
      return {
        index: Glide.index
      }
    }
  })

  return CALLBACKS
}
