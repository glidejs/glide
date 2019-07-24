import html from '../fixtures/html'
import { query } from '../fixtures/query'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('After destroying an instance', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`classes.type.slider` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide').mount().destroy()

    expect(root.classList.contains(defaults.classes.type.slider)).toBe(false)
  })

  test('`classes.type.carousel` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide', { type: 'carousel' }).mount().destroy()

    expect(root.classList.contains(defaults.classes.type.carousel)).toBe(false)
  })

  test('`classes.direction.ltr` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide').mount().destroy()

    expect(root.classList.contains(defaults.classes.direction.ltr)).toBe(false)
  })

  test('`classes.direction.rtl` should not be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide', { rtl: true }).mount().destroy()

    expect(root.classList.contains(defaults.classes.direction.rtl)).toBe(false)
  })

  test('`classes.slide.active` should not be applied on any slide elements', () => {
    let { slides } = query(document)

    new Glide('#glide').mount().destroy()

    for (let i = 0; i < slides.length; i++) {
      expect(slides[i].classList.contains(defaults.classes.slide.active)).toBe(false)
    }
  })
})
