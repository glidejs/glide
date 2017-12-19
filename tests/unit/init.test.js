import { init } from '../../src/core/index'

describe('`init()` function should', () => {
  test('initialize all registered components', () => {
    // Here we creating a mock of glide internal component. 
    // Every component have to implement a `init` method and be a function
    let fn = jest.fn()
    let stub = { init: fn }
    let mock = jest.fn(() => {
      return stub
    })

    init('glide', { mock }, 'events')

    // `init()` method of the component should be called
    expect(fn).toHaveBeenCalled()

    // component should be initialized with glide and other components as arguments
    expect(mock).toHaveBeenCalledWith('glide', { mock: stub }, 'events')
  })
})
