import { init } from '../../src/core/index'

describe('`init()` function should', () => {
  test('initialize all registered components with Glide instance and Components collection as an argument', () => {
    let fn = jest.fn()
    
    let mock = jest.fn(() => {
      return { init: fn }
    })

    init('glide', { mock })

    expect(mock).toHaveBeenCalledWith('glide', { mock: { init: fn } })
  })
})
