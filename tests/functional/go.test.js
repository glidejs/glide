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

  test('go() should wait for transition end', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>')
    glide.go('>')
    glide.go('>')

    afterTransition(() => {
      expect(slides[1].classList.contains(defaults.classes.slide.active)).toBe(true)

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
      expect(slides[3].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`>` should move one slide forward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`<` should move one slide backward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 1 }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`>>` should rewind to the last slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('>>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`<<` should rewind to the first slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: slides.length - 1 }).mount()

    glide.go('<<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`={i}` should move to specified slide', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.go('=2')

    afterTransition(() => {
      expect(slides[2].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|>` should go to the next viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, perView: 3 }).mount()

    glide.go('|>')

    afterTransition(() => {
      expect(slides[3].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|>` should go to the next viewport when active slide is not first on current viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 1, perView: 3 }).mount()

    glide.go('|>')

    afterTransition(() => {
      expect(slides[3].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|<` should go to the previous viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 3, perView: 3 }).mount()

    glide.go('|<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|<` should go to the previous viewport when active slide is not first on current viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 3, perView: 3 }).mount()

    glide.go('|<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|>` should not change viewport when rewind is disabled, moving forward and we on the last viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      startAt: slides.length - 1,
      perView: 3,
      rewind: false
    }).mount()

    glide.go('|>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|<` should not change viewport when rewind is disabled, moving backward and we on the first viewport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      startAt: 0,
      perView: 3,
      rewind: false
    }).mount()

    glide.go('|<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|>` should change to the first viewport when moving forward and we are on the last vievport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      startAt: slides.length - 1,
      perView: 3
    }).mount()

    glide.go('|>')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`|<` should change to the last viewport when moving backward and we are on the first vievport', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      startAt: 0,
      perView: 3
    }).mount()

    glide.go('|<')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })
})
