import { define } from '../../../src/utils/object'

describe('Function', () => {
  test('`define` should create object getters and setters', () => {
    let obj = {}

    expect(typeof obj.property).toBe('undefined')

    define(obj, 'property', {
      get () {
        return this._prop
      },

      set (value) {
        this._prop = value
      }
    })

    obj.property = 'value'

    expect(obj.property).toBe('value')
  })
})
