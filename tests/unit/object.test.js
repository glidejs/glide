import { define, mergeDeep } from '../../src/utils/object'

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

  test('`mergeDeep` should merge defaults and options object', () => {
    let obj = mergeDeep(
      {
        a: 1,
        b: 2
      },
      {
        a: 5
      }
    )

    expect(obj).toEqual({
      a: 5,
      b: 2
    })
  })

  test('`mergeDeep` should deep merge object', () => {
    let obj = mergeDeep(
      {
        a: {
          c: 1
        },
        b: 2
      },
      {
        a: {
          c: 3
        }
      }
    )

    expect(obj).toEqual({
      a: {
        c: 3
      },
      b: 2
    })
  })
})
