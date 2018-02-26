import html from '../fixtures/html'
import { query } from '../fixtures/query'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Calling `update()` method with', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('new options should extend previous settings', () => {
    let options = {
      startAt: 1,
      focusAt: 1,
      perView: 2
    }

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.update(options)

    expect(glide.settings).toEqual(Object.assign(defaults, options))
  })

  test('new `startAt` option should change active slide', () => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.update({ startAt: 1 })

    expect(glide.index).toBe(1)
    expect(slides[1].classList.contains(defaults.classes.activeSlide)).toBe(true)
  })
})
