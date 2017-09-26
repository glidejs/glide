import Binder from '../../src/binder'

let binder

let event = 'click'
let callback = jest.fn()
let element = document.createElement('div')

describe('Binder should', () => {
  beforeEach(() => {
    binder = new Binder()
  })

  test('create and remove event listener from element', () => {
    let addFn = jest.fn()
    let rmFn = jest.fn()

    element.addEventListener = addFn
    element.removeEventListener = rmFn

    binder.on(event, element, callback)
    expect(addFn).toHaveBeenCalledWith(event, callback)

    binder.off(event, element)
    expect(rmFn).toHaveBeenCalledWith(event, callback)
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