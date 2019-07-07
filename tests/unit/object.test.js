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

  test('`mergeOptions` should merge defaults and options object', () => {
    let obj = mergeOptions(
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

  test('`mergeOptions` should deep merge classes options object', () => {
    let obj = mergeOptions(
      {
        classes: {
          direction: {
            ltr: 'a',
            rtl: 'a'
          },
          type: {
            slider: 'a',
            carousel: 'a'
          },
          slide: {
            clone: 'a',
            active: 'a'
          },
          arrow: {
            disabled: 'a'
          },
          nav: {
            active: 'a'
          }
        }
      },
      {
        classes: {
          type: {
            slider: 'b',
            carousel: 'b'
          },
          slide: {
            clone: 'b',
            active: 'b'
          },
          arrow: {
            disabled: 'b'
          },
          nav: {
            active: 'b'
          }
        }
      }
    )

    expect(obj).toEqual({
      classes: {
        direction: {
          ltr: 'a',
          rtl: 'a'
        },
        type: {
          slider: 'b',
          carousel: 'b'
        },
        slide: {
          clone: 'b',
          active: 'b'
        },
        arrow: {
          disabled: 'b'
        },
        nav: {
          active: 'b'
        }
      }
    })
  })
})
