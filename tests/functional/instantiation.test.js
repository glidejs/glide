import Glide from '../../src/index'
import defaults from '../../src/defaults'

import html from '../fixtures/html'

describe('On slider instantiation', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`selector` should be set', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.selector).toBe('#glide')
  })

  test('passed `options` should be extended by defaults', () => {
    let glide = new Glide('#glide', { type: 'slider' }).mount()

    expect(glide.settings).toEqual(Object.assign(defaults, { type: 'slider' }))
  })

  test('`beforeInit` and `afterInit` events should be called', () => {
    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    let glide = new Glide('#glide')

    glide.on('mount.before', beforeCallback)
    glide.on('mount.after', afterCallback)

    glide.mount()

    expect(beforeCallback).toHaveBeenCalledWith(glide)
    expect(afterCallback).toHaveBeenCalledWith(glide)
  })
})
