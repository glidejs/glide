import { isString } from '../../utils/unit'

export default class EventsBinder {
  /**
   * Construct a EventsBinder instance.
   */
  constructor (listeners = {}) {
    this.listeners = listeners
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */
  on (events, el, closure, capture = false) {
    if (isString(events)) {
      events = [events]
    }

    events.forEach((eventName) => {
      this.listeners[eventName] = this.listeners[eventName] || []
      this.listeners[eventName].push({ closure, capture })

      el.addEventListener(eventName, closure, capture)
    })
  }

  /**
   * Removes event listeners from arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Boolean|Object} capture
   * @return {Void}
   */
  off (events, el, capture = false) {
    if (isString(events)) {
      events = [events]
    }

    events.forEach((eventName) => {
      const listeners = this.listeners[eventName]

      if (listeners) {
        this.listeners[eventName] = listeners.filter((event) => {
          const detached = event.capture === capture

          if (detached) {
            el.removeEventListener(eventName, event.closure, capture)
          }

          return !detached
        })
      }
    })
  }

  /**
   * Destroy collected listeners.
   *
   * @returns {Void}
   */
  destroy () {
    delete this.listeners
  }
}
