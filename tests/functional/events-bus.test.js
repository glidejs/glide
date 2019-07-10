import EventsBus from '../../src/core/event/events-bus'

describe('EventsBus', () => {
  describe('eventName is string', () => {
    let bus
    let events
    let handler
    const eventName = 'foo'

    beforeEach(() => {
      handler = jest.fn()
      bus = new EventsBus(events = {})
    })

    test('`.on` should save handler in events object', () => {
      bus.on(eventName, handler)

      expect(events).toEqual({
        [eventName]: [handler]
      })
    })

    test('`.emit` should emit into handlers', () => {
      bus.on(eventName, handler)
      bus.emit(eventName, 'value')

      expect(handler).toHaveBeenCalledWith('value')
      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('`.off()` should remove event from events', () => {
      bus.on(eventName, handler)
      bus.off(eventName, handler)

      bus.emit(eventName, 'value')

      expect(handler).not.toHaveBeenCalled()
    })

    test('`.on().remove()` should remove event from events', () => {
      bus.on(eventName, handler).remove()

      bus.emit(eventName, 'value')

      expect(handler).not.toHaveBeenCalled()
    })

    test('`.emit` should not throw if a listener was removed', () => {
      const handler2 = jest.fn()
      const handler3 = jest.fn()

      bus.on(eventName, handler2)
      bus.on(eventName, handler)
      bus.on(eventName, handler3)

      bus.off(eventName, handler2)
      bus.off(eventName, handler3)

      bus.emit(eventName, 'value')
      expect(handler).toHaveBeenCalledWith('value')
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('eventName is string[]', () => {
    let bus
    let events
    let handler
    const eventName = ['foo', 'bar']

    beforeEach(() => {
      handler = jest.fn()
      bus = new EventsBus(events = {})
    })

    test('`.on` should save handler in events object', () => {
      bus.on(eventName, handler)

      expect(events).toEqual({
        [eventName[0]]: [handler],
        [eventName[1]]: [handler]
      })
    })

    test('`.emit` should emit into handlers', () => {
      bus.on(eventName, handler)
      bus.emit(eventName, 'value')

      expect(handler).toHaveBeenCalledWith('value')
      expect(handler).toHaveBeenCalledTimes(2)
    })

    test('`.off()` should remove the handler', () => {
      bus.on(eventName, handler)
      bus.off(eventName, handler)

      bus.emit(eventName, 'value')

      expect(handler).not.toHaveBeenCalled()
    })

    test('`.on().remove()` should remove event from events', () => {
      bus.on(eventName, handler).remove()

      expect(events).toEqual({
        [eventName[0]]: [],
        [eventName[1]]: []
      })
    })
  })
})
