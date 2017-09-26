import Glide from '../../src/index'
import Engine from '../../src/engine'

describe('Engine should', () => {
  test('initialize all injected components with Glide instance as argument', () => {
    let fn = jest.fn()

    let stub = { init: fn }

    new Engine('glide', { stub })

    expect(fn).toHaveBeenCalledWith('glide')
  })
})