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
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(true)

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
      expect(slides[slides.length - 1].classList.contains(defaults.classes.slide.active)).toBe(false)
      expect(slides[0].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('with odd number of `perView` slides should create sufficient cloning buffer', (done) => {
    let glide = new Glide('#glide', {
      type: 'carousel',
      perView: 3
    })

    glide.on('build.after', () => {
      let { clones } = query(document)

      expect(clones.length).toBe(10)

      done()
    })

    glide.mount()
  })

  test('with even number of `perView` slides should create sufficient cloning buffer', (done) => {
    let glide = new Glide('#glide', {
      type: 'carousel',
      perView: 2
    })

    glide.on('build.after', () => {
      let { clones } = query(document)

      expect(clones.length).toBe(6)

      done()
    })

    glide.mount()
  })

  test('with even number of `perView` slides should create cloning buffer advanced by `cloningRatio`', (done) => {
    let glide = new Glide('#glide', {
      type: 'carousel',
      perView: 2,
      cloningRatio: 2,
    })

    glide.on('build.after', () => {
      let { clones } = query(document)

      expect(clones.length).toBe(12)

      done()
    })

    glide.mount()
  })
})
