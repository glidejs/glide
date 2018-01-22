import html from '../fixtures/html'
import { query } from '../fixtures/query'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('After destroying an instance', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`classes.slider` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide').mount().destroy()

    expect(root.classList.contains(defaults.classes.slider)).toBe(false)
  })

  test('`classes.carousel` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide', { type: 'carousel' }).mount().destroy()

    expect(root.classList.contains(defaults.classes.slider)).toBe(false)
  })

  test('`classes.rtl` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide', { rtl: true }).mount().destroy()

    expect(root.classList.contains(defaults.classes.rtl)).toBe(false)
  })

  test('`classes.activeClass` should not be applied on any slide elements', () => {
    let { slides } = query(document)

    new Glide('#glide').mount().destroy()

    for (let i = 0; i < slides.length; i++) {
      expect(slides[i].classList.contains(defaults.classes.activeClass)).toBe(false)
    }
  })
})
