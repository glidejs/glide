import { isArray } from '../../utils/unit'

export class EventsBus {
  constructor (topics = {}) {
    this.topics = topics
    this.hOP = topics.hasOwnProperty
  }

  on (topic, listener) {
    if (isArray(topic)) {
      for (let i = 0; i < topic.length; i++) {
        this.on(topic[i], listener)
      }
    }

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
    if (isArray(topic)) {
      for (let i = 0; i < topic.length; i++) {
        this.emit(topic[i], info)
      }
    }

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
