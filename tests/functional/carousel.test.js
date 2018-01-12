import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized as `carousel`', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should have a correct type', () => {
    let glide = new Glide('#glide', { type: 'carousel' }).mount()

    expect(glide.isType('carousel')).toBe(true)
  })

  test('should go to the last slide when we are on the first slide and moving backward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      type: 'carousel',
      startAt: 0
    }).mount()

    glide.go('<')

    afterTransition(() => {
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(false)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })

  test('should go to the first slide when we are on the last slide and moving forward', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', {
      type: 'carousel',
      startAt: slides.length - 1
    }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[slides.length - 1].classList.contains(defaults.classes.activeSlide)).toBe(false)
      expect(slides[0].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })
})
