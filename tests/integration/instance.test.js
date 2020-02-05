import html from '../fixtures/html'
import defaults from '../../src/defaults'
import { mergeDeep } from '../../src/utils/object'

import Glide from '../../entry/entry-complete'

describe('Glide', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should start at 0 by default', () => {
    const glide = new Glide('#glide').mount()

    expect(glide.index).toBe(0)
  })

  test('should start at index setup in `startAt`', () => {
    const glide = new Glide('#glide', { startAt: 2 }).mount()

    expect(glide.index).toBe(2)
  })

  test('unmodified settings should return defaults', () => {
    const glide = new Glide('#glide').mount()

    expect(glide.settings).toEqual(defaults)
  })

  test('modified settings should return defaults extended by options', () => {
    const glide = new Glide('#glide', {
      startAt: 2,
      classes: {
        direction: {
          ltr: 'one',
          rtl: 'two'
        }
      }
    }).mount()

    expect(glide.settings).toEqual(mergeDeep(defaults, {
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
    const glide = new Glide('#glide').mount()

    expect(glide.disabled).toBe(false)
  })

  test('should use specified selector', () => {
    const glide = new Glide('#glide').mount()

    expect(glide.selector).toBe('#glide')
  })

  test('should initialize extensions specified at mounting', () => {
    const fn = jest.fn()
    const stub = () => {
      return { mount: fn }
    }

    new Glide('#glide').mount({ stub })

    expect(fn).toHaveBeenCalled()
  })

  test('should warn about invalid extensions', () => {
    const fn = jest.fn()
    const stub = { mount () {} }

    console.error = fn

    new Glide('#glide').mount({ stub })

    expect(fn).toHaveBeenCalled()
  })
})
