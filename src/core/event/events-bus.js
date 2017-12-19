export default class EventsBus {
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

export const Events = new EventsBus()

export function listen (event, handler) {
  if (event.constructor === Array) {
    for (let i = 0; i < event.length; i++) {
      listen(event[i], handler)
    }
  }

  return Events.listen(event, handler)
}

export function emit (event, context) {
  return Events.emit(event, context)
}
