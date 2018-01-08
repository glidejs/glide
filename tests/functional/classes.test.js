import html from '../fixtures/html'
import query from '../fixtures/query'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Class', () => {
  let elements

  beforeEach(() => {
    document.body.innerHTML = html

    elements = query(document)
  })

  test('`classes.activeSlide` should be applied on the 0 indexed slide element by default', () => {
    let { slides } = elements

    new Glide('#glide').mount()

    expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)
  })

  test('`classes.activeSlide` should be applied on the `startAt` indexed slide element', () => {
    let { slides } = elements

    new Glide('#glide', { startAt: 2 }).mount()

    expect(slides[2].classList.contains(defaults.classes.activeSlide)).toBe(true)
  })

  test('`classes.activeSlide` should be applied to the new slide element after moving', () => {
    let { slides } = elements

    new Glide('#glide').mount().go('>')

    setTimeout(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(false)
      expect(slides[1].classList.contains(defaults.classes.activeSlide)).toBe(true)
    }, defaults.animationDuration)
  })

  test('`classes.swipeable` should be applied on the root element', () => {
    let { root } = elements

    new Glide('#glide').mount()

    expect(root.classList.contains(defaults.classes.swipeable)).toBe(true)
  })

  test('`classes.slider` should be applied on the root element', () => {
    let { root } = elements

    new Glide('#glide').mount()

    expect(root.classList.contains(defaults.classes.slider)).toBe(true)
  })

  test('`classes.carousel` should be applied on the root element', () => {
    let { root } = elements

    new Glide('#glide', { type: 'carousel' }).mount()

    expect(root.classList.contains(defaults.classes.carousel)).toBe(true)
  })
})
