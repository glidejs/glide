import EventsBinder from '../../src/core/event/events-binder'

let events = null
let element = null
let callback = jest.fn()

describe('EventsBinder should', () => {
  beforeEach(() => {
    events = new EventsBinder()
    element = document.createElement('div')
  })

  afterEach(() => {
    element.remove()
  })

  test('create and remove event listener from element', () => {
    let addFn = jest.fn()
    let rmFn = jest.fn()

    element.addEventListener = addFn
    element.removeEventListener = rmFn

    events.on('click', element, callback)
    expect(addFn).toHaveBeenCalledWith('click', callback, expect.any(Boolean))

    events.off('click', element)
    expect(rmFn).toHaveBeenCalledWith('click', callback, expect.any(Boolean))
  })

  test('store created listeners when binding with `on`', () => {
    events.on('click', element, callback)

    expect(events.listeners).toHaveProperty('click')
    expect(events.listeners['click']).toBe(callback)
  })

  test('hold previously stored listeners when unbinding with `off`', () => {
    events.on('click', element, callback)

    events.off('click', element)

    expect(events.listeners).toHaveProperty('click')
  })

  test('remove stored listeners when destroying', () => {
    events.on('click', element, callback)

    events.destroy()

    expect(events).not.toHaveProperty('listeners')
  })
})
