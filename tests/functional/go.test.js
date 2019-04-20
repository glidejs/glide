import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Calling `go()` method with', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('invalid direction pattern should result in `warn()` message', (done) => {
    let glide = new Glide('#glide')
    let fn = jest.fn()

    global.console = { error: fn }

    glide.mount().go('??')

    afterTransition(() => {
      expect(fn).toHaveBeenCalled()

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
