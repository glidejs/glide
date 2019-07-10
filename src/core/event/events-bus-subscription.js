/**
 * Construct a EventBus instance.
 *
 * @param {EventsBus} eventsBus
 * @param {String|Array} event
 * @param {Function} handler
 */
export default function EventsBusSubscription (eventsBus, event, handler) {
  return {
    /**
     * Removes handler from event
     */
    remove: () => {
      eventsBus.off(event, handler)
    }
  }
}
