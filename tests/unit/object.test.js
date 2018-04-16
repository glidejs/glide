import { define, merge } from '../../src/utils/object'

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

  test('`merge` should deep merge two objects', () => {
    let obj = merge(
      {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      },
      {
        a: 5,
        c: {
          d: 6
        }
      }
    )

    expect(obj).toEqual({
      a: 5,
      b: 2,
      c: {
        d: 6,
        e: 4
      }
    })
  })
})
