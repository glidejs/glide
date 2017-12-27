import { mount } from '../../src/core/index'

describe('`mount()` function should', () => {
  test('initialize all registered components', () => {
    // Here we creating a mock of glide internal component.
    // Every component have to implement a `mount()` method and be a function
    let fn = jest.fn()
    let stub = { mount: fn }
    let mock = jest.fn(() => {
      return stub
    })

    mount('glide', { mock }, 'events')

    // `mount()` method of the component should be called
    expect(fn).toHaveBeenCalled()

    // component should be initialized with glide and other components as arguments
    expect(mock).toHaveBeenCalledWith('glide', { mock: stub }, 'events')
  })
})
