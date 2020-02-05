import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized with `rewind: true`', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should move to the last slide when we are on the first slide and moving backward', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', { startAt: 0, rewind: true }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('should move to the first slide when we are on the last slide and moving forward', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', { startAt: slides.length - 1, rewind: true }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('should NOT move to the last slide when we are on the first slide and rewind set to false', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', { startAt: 0, rewind: false }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(false)

      done()
    })
  })

  test('should NOT move to the first slide when we are on the last slide and rewind set to false', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', { startAt: slides.length - 1, rewind: false }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(false)

      done()
    })
  })

  test('`>|` should rewind when moving forward with `rewind: true` option', (done) => {
    const { slides } = query(document)

    const view = 3

    const glide = new Glide('#glide', {
      startAt: slides.length - 1,
      perView: view,
      perMove: view,
      rewind: true
    }).mount()

    glide.go('>|')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`<|` should rewind when moving backward with `rewind: true` option', (done) => {
    const { slides } = query(document)

    const view = 3

    const glide = new Glide('#glide', {
      startAt: 0,
      perView: view,
      perMove: view,
      rewind: true
    }).mount()

    glide.go('<|')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`>|` should NOT rewind when moving forward with `rewind: true` option', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', {
      startAt: slides.length - 1,
      perView: 3,
      rewind: false
    }).mount()

    glide.go('>|')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`<|` should NOT rewind when moving backward with `rewind: true` option', (done) => {
    const { slides } = query(document)

    const glide = new Glide('#glide', {
      startAt: 0,
      perView: 3,
      rewind: false
    }).mount()

    glide.go('<|')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })
})
