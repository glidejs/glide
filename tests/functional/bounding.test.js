import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized with `bound: true` option', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('should STOP move at `perView` number of slides from the end', (done) => {
    let { slides } = query(document)

    let perView = 3

    let glide = new Glide('#glide', { perView: perView, bound: true }).mount()

    glide.go('>>')

    afterTransition(() => {
      expect(slides[slides.length - perView].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })
})
