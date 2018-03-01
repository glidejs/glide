import { isString } from '../../utils/unit'

export default class EventsBinder {
  /**
   * Construct events.
   */
  constructor (listeners = {}) {
    this.oners = listeners
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @param  {Closure} closure
   * @return {Void}
   */
  on (events, el, closure) {
    if (isString(events)) {
      events = [events]
    }

    for (let i = 0; i < events.length; i++) {
      this.oners[events[i]] = closure

      el.addEventListener(events[i], this.oners[events[i]], false)
    }
  }

  /**
   * Removes event listeners from arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @return {Void}
   */
  off (events, el) {
    if (isString(events)) {
      events = [events]
    }

    for (let i = 0; i < events.length; i++) {
      el.removeEventListener(events[i], this.oners[events[i]], false)
    }
  }

  /**
   * Destroy collected listeners.
   *
   * @returns {Void}
   */
  destroy () {
    delete this.oners
  }
}
