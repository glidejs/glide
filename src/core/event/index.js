export class EventsBinder {
  /**
   * Construct events.
   */
  constructor (listeners = {}) {
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
  on (events, el, closure) {
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
  off (events, el) {
    if (typeof events === 'string') {
      events = [events]
    }

    for (var i = 0; i < events.length; i++) {
      el.removeEventListener(events[i], this.listeners[events[i]])

      delete this.listeners[events[i]]
    }
  }
}

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