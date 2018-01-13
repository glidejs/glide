import html from '../fixtures/html'

import Glide from '../../entry/entry-complete'

describe('Events on', () => {
  let glide = null

  beforeEach(() => {
    document.body.innerHTML = html

    glide = new Glide('#glide')
  })

  test('mounting should be called', () => {
    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    glide.on('mount.before', beforeCallback)
    glide.on('mount.after', afterCallback)

    glide.mount()

    expect(beforeCallback).toHaveBeenCalled()
    expect(afterCallback).toHaveBeenCalled()
  })

  test('building should be called', () => {
    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    glide.on('build.before', beforeCallback)
    glide.on('build.after', afterCallback)

    glide.mount()

    expect(beforeCallback).toHaveBeenCalled()
    expect(afterCallback).toHaveBeenCalled()
  })
})
