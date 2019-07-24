import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized with `enqueue` option set to', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`false` should move to the next movement without waiting for transition', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, enqueue: false }).mount()

    glide.go('>')
    glide.go('>')
    glide.go('>')

    afterTransition(() => {
      expect(slides[3].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })

  test('`true` should move to the next movement after waiting for transition', (done) => {
    let { slides } = query(document)

    let glide = new Glide('#glide', { startAt: 0, enqueue: true }).mount()

    glide.go('>')
    glide.go('>')
    glide.go('>')

    afterTransition(() => {
      expect(slides[1].classList.contains(defaults.classes.slide.active)).toBe(true)

      done()
    })
  })
})
