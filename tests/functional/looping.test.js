import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized with `loop: true` option', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should go to the last slide when we are on the first slide and moving backward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      loop: true,
      startAt: 0
    }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('should go to the first slide when we are on the last slide and moving forward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      loop: true,
      startAt: slides.length - 1
    }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })


  test('should go to the perMove slide from the beginning when we are on the last slide and moving forward', (done) => {
    let { slides } = query(document)

    const view = 3

    let glide = new Glide('#glide', {
      loop: true,
      startAt: slides.length - 1,
      perView: view,
      perMove: view,
    }).mount()

    glide.go('>|')

    afterTransition(() => {
      expect(slides[view - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('should go to the perMove slide from the ending when moving backward and we are on the first viewport', (done) => {
    let { slides } = query(document)

    const view = 3

    let glide = new Glide('#glide', {
      loop: true,
      startAt: 0,
      perView: view,
      perMove: view,
    }).mount()

    glide.go('<|')

    afterTransition(() => {
      expect(slides[slides.length - view].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })
})
