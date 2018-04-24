import { define, mergeOptions } from '../../src/utils/object'

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

  test('`merge` should deep merge defaults and options object', () => {
    let obj = mergeOptions(
      {
        a: 1,
        b: 2,
        classes: {
          d: 3,
          e: 4
        }
      },
      {
        a: 5,
        classes: {
          d: 6
        }
      }
    )

    expect(obj).toEqual({
      a: 5,
      b: 2,
      classes: {
        d: 6,
        e: 4
      }
    })
  })
})
