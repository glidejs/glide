import html from '../fixtures/html'
import defaults from '../../src/defaults'
import { mergeOptions } from '../../src/utils/object'

import Glide from '../../entry/entry-complete'

describe('Glide', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should start at 0 by default', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.index).toBe(0)
  })

  test('should start at index setup in `startAt`', () => {
    let glide = new Glide('#glide', { startAt: 2 }).mount()

    expect(glide.index).toBe(2)
  })

  test('unmodified settings should return defaults', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.settings).toEqual(defaults)
  })

  test('modified settings should return defaults extended by options', () => {
    let glide = new Glide('#glide', {
      startAt: 2,
      classes: {
        direction: {
          ltr: 'one',
          rtl: 'two'
        }
      }
    }).mount()

    expect(glide.settings).toEqual(mergeOptions(defaults, {
      startAt: 2,
      classes: {
        direction: {
          ltr: 'one',
          rtl: 'two'
        }
      }
    }))
  })

  test('should not be disabled at start', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.disabled).toBe(false)
  })

  test('should use specified selector', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.selector).toBe('#glide')
  })

  test('should initialize extensions specified at mounting', () => {
    let fn = jest.fn()
    let stub = () => {
      return { mount: fn }
    }

    new Glide('#glide').mount({ stub })

    expect(fn).toHaveBeenCalled()
  })

  test('should warn about invalid extensions', () => {
    let fn = jest.fn()
    let stub = { mount () {} }

    console.error = fn

    new Glide('#glide').mount({ stub })

    expect(fn).toHaveBeenCalled()
  })
})
