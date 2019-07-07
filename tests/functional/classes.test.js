import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Class', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`classes.type.slider` should be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide').mount()

    expect(root.classList.contains(defaults.classes.type.slider)).toBe(true)
  })

  test('`classes.type.carousel` should be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide', { type: 'carousel' }).mount()

    expect(root.classList.contains(defaults.classes.type.carousel)).toBe(true)
  })

  test('`classes.slide.active` should be applied on the 0 indexed slide element by default', () => {
    let { slides } = query(document)

    new Glide('#glide').mount()

    expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)
  })

  test('`classes.slide.active` should be applied on the `startAt` indexed slide element', () => {
    let { slides } = query(document)

    new Glide('#glide', { startAt: 2 }).mount()

    expect(slides[2].classList.contains(defaults.classes.slide.active)).toBe(true)
  })

  test('`classes.slide.active` should be applied to the new slide element after moving', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`classes.swipeable` should be applied on the root element', () => {
    let { root } = query(document)

    new Glide('#glide').mount()

    expect(root.classList.contains(defaults.classes.swipeable)).toBe(true)
  })

  test('`classes.direction.ltr` should be applied on the root element in `ltr` mode', () => {
    let { root } = query(document)

    new Glide('#glide').mount()

    expect(root.classList.contains(defaults.classes.direction.ltr)).toBe(true)
  })

  test('`classes.direction.rtl` should be applied on the root element in `rtl` mode', () => {
    let { root } = query(document)

    new Glide('#glide', { direction: 'rtl' }).mount()

    expect(root.classList.contains(defaults.classes.direction.rtl)).toBe(true)
  })
})
