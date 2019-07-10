import {invokeEach, isArray} from '../../utils/unit'
import EventsBusSubscription from './events-bus-subscription'

export default class EventsBus {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  constructor (events = {}) {
    this.events = events
    this.hop = events.hasOwnProperty
  }

  /**
   * Adds listener to the specified event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */
  on (event, handler) {
    if (isArray(event)) {
      invokeEach(this, 'on', event, handler)
      return EventsBusSubscription(this, event, handler)
    }

    // Create the event's object if not yet created
    if (!this.hop.call(this.events, event)) {
      this.events[event] = []
    }

    // Add the handler to queue
    this.events[event].push(handler)

    // Provide handle back for removal of event
    return EventsBusSubscription(this, event, handler)
  }

  /**
   * Removes listener to the specified event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */
  off (event, handler) {
    if (isArray(event)) {
      invokeEach(this, 'off', event, handler)
      return
    }

    const eventNamespace = this.events[event]

    if (eventNamespace) {
      let index

      while ((index = eventNamespace.indexOf(handler)) !== -1) {
        eventNamespace.splice(index, 1)
      }
    }
  }

  /**
   * Runs registered handlers for specified event.
   *
   * @param {String|Array} event
   * @param {Object=} context
   */
  emit (event, context) {
    if (isArray(event)) {
      invokeEach(this, 'emit', event, context)
      return
    }

    // If the event doesn't exist, or there's no handlers in queue, just leave
    if (!this.hop.call(this.events, event)) {
      return
    }

    // Cycle through events queue, fire!
    this.events[event].forEach((item) => {
      item(context || {})
    })
  }
}
