import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized as `slider`', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should have a correct type', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.isType('slider')).toBe(true)
  })

  test('should move to the last slide when we are on the first slide and moving backward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(false)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('should move to the first slide when we are on the last slide and moving forward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: slides.length - 1 }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(false)
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('should NOT move to the last slide when we are on the first slide and rewind set to false', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, rewind: false }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(false)

      done()
    })
  })

  test('should NOT move to the first slide when we are on the last slide and rewind set to false', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: slides.length - 1, rewind: false }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(true)
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(false)

      done()
    })
  })

  test('should STOP move at `perView` number of slides from the end when `bound` option is `true`', (done) => {
    let { slides } = query(document)

    let perView = 3

    let glide = new Glide('#glide', { perView: perView, bound: true }).mount()

    glide.go('>>')

    afterTransition(() => {
      expect(slides[slides.length - perView].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })
})
