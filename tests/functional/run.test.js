import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized with', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`perRun` option should move `perRun` number of slides', (done) => {
    let { slides } = query(document)

    let perRun = 3

    let glide = new Glide('#glide', { perRun: perRun }).mount()

    glide.go('>')

    afterTransition(() => {
      expect(slides[perRun].classList.contains(defaults.classes.activeSlide)).toBe(true)

      done()
    })
  })
})
