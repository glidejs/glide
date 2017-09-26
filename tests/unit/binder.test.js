import Binder from '../../src/binder'

let binder

let event = 'click'
let callback = () => true
let element = document.createElement('div')

describe('Binder should', () => {
  beforeEach(() => {
    binder = new Binder()
  })

  test('store created listeners when binding with `on`', () => {
    binder.on(event, element, callback)

    expect(binder.listeners).toHaveProperty(event)
    expect(binder.listeners[event]).toBe(callback)
  })

  test('remove previously stored listeners when unbinding with `off`', () => {
    binder.on(event, element, callback)

    binder.off(event, element)

    expect(binder.listeners).not.toHaveProperty(event)
  })
})