import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Calling `go()` method with', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('go() should wait for transition end', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>')
    glide.go('>')
    glide.go('>')

    afterTransition(() => {
      expect(slides[1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('go() should not wait for transition when configured', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, waitForTransition: false }).mount()

    glide.go('>')
    glide.go('>')
    glide.go('>')

    afterTransition(() => {
      expect(slides[3].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`>` should move one slide forward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`<` should move one slide backward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 1 }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`>>` should rewind to the last slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`<<` should rewind to the first slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: slides.length - 1 }).mount()

    glide.go('<<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|>` should go to the next page', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, perView: 2 }).mount()

    glide.go('|>')

    afterTransition(() => {
      expect(slides[2].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|<` should go to the previous page', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: slides.length - 1, perView: 2 }).mount()

    glide.go('|<')

    afterTransition(() => {
      expect(slides[4].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|>` should not exceed list end when rewind is disabled', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 4, perView: 2, rewind: false, waitForTransition: false }).mount()

    glide.go('|>')
    glide.go('|>')
    glide.go('|>')

    afterTransition(() => {
      expect(slides[6].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|<` should not exceed list start when rewind is disabled', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 4, perView: 2, rewind: false, waitForTransition: false }).mount()

    glide.go('|<')
    glide.go('|<')
    glide.go('|<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|>` should rewind to the first slide when index is greater than length', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 4, perView: 2, waitForTransition: false }).mount()

    glide.go('|>')
    glide.go('|>')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`|<` should rewind to the last slide when index is less than 0', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 4, perView: 2, waitForTransition: false }).mount()

    glide.go('|<')
    glide.go('|<')
    glide.go('|<')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('`={i}` should move to specified slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('=2')

    afterTransition(() => {
      expect(slides[2].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })
})
