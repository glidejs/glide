export default class Events {
  /**
   * Construct events.
   */
  constructor(listeners = {}) {
    this.listeners = listeners
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @param  {Closure} closure
   * @return {Void}
   */
  on(events, el, closure) {
    if (typeof events === 'string') {
      events = [events]
    }

    for (var i = 0; i < events.length; i++) {
      this.listeners[events[i]] = closure

      el.addEventListener(events[i], this.listeners[events[i]])
    }
  }

  /**
   * Removes event listeners from arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @return {Void}
   */
  off(events, el) {
    if (typeof events === 'string') {
      events = [events]
    }

    for (var i = 0; i < events.length; i++) {
      el.removeEventListener(events[i], this.listeners[events[i]])

      delete this.listeners[event]
    }
  }
}