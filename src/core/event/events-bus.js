import { isArray } from '../../utils/unit'

export class EventsBus {
  constructor (topics = {}) {
    this.topics = topics
    this.hOP = topics.hasOwnProperty
  }

  listen (topic, listener) {
    // Create the topic's object if not yet created
    if (!this.hOP.call(this.topics, topic)) {
      this.topics[topic] = []
    }

    // Add the listener to queue
    var index = this.topics[topic].push(listener) - 1

    // Provide handle back for removal of topic
    return {
      remove () {
        delete this.topics[topic][index]
      }
    }
  }

  emit (topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!this.hOP.call(this.topics, topic)) {
      return
    }

    // Cycle through topics queue, fire!
    this.topics[topic].forEach((item) => {
      item(info || {})
    })
  }
}

/**
 * Registers a event listener inside the events bus.
 *
 * @param  {EventsBus} bus
 * @param  {String|Array} event
 * @param  {Function} handler
 * @return {Object}
 */
export function listen (bus, event, handler) {
  if (isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      listen(bus, event[i], handler)
    }
  }

  return bus.listen(event, handler)
}

/**
 * Calls registered handlers for passed event.
 *
 * @param  {EventsBus} bus
 * @param  {String|Array} event
 * @param  {Mixed} context
 * @return {Void}
 */
export function emit (bus, event, context) {
  if (isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      emit(bus, event[i], context)
    }
  }

  return bus.emit(event, context)
}
