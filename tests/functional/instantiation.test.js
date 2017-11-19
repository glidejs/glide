import Glide from '../../src/index'
import Core from '../../src/components/core'

import html from '../fixtures/html'
import defaults from '../../src/defaults'

describe('On slider instantiation', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`selector` should be set', () => {
    let glide = new Glide('#glide')

    expect(glide.selector).toBe('#glide')
  })

  test('passed `options` should be extended by defaults', () => {
    /* eslint-disable no-new */
    new Glide('#glide', { type: 'slider' })

    let settings = Object.assign(defaults, { type: 'slider' })

    expect(Core.settings).toEqual(settings)
  })

  test('`beforeInit` and `afterInit` events should be called', () => {
    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    /* eslint-disable no-new */
    new Glide('#glide', {
      beforeInit: beforeCallback,
      afterInit: afterCallback
    })

    expect(beforeCallback).toBeCalled()
    expect(afterCallback).toBeCalled()
  })
})
