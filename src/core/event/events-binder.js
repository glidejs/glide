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
   * @return {Void}
   */
  on (events, el, closure, capture = false, passive = false) {
    if (isString(events)) {
      events = [events]
    }

    let passiveSupport = false
    let options = {}

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get () {
          passiveSupport = true
        }
      })

      const noop = () => { }
      window.addEventListener('testPassiveEventSupport', noop, opts)
      window.removeEventListener('testPassiveEventSupport', noop, opts)
    } catch (err) {
      passiveSupport = false
    }

    if (passiveSupport === false) {
      options = capture
    } else {
      options = {
        capture: capture,
        passive: passive
      }
    }

    for (let i = 0; i < events.length; i++) {
      this.listeners[events[i]] = closure

      el.addEventListener(events[i], this.listeners[events[i]], options)
    }
  }

  /**
   * Removes event listeners from arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @return {Void}
   */
  off (events, el) {
    if (isString(events)) {
      events = [events]
    }

    for (let i = 0; i < events.length; i++) {
      el.removeEventListener(events[i], this.listeners[events[i]], false)
    }
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
