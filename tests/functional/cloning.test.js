import html from '../fixtures/html'
import { query } from '../fixtures/query'

import Glide from '../../entry/entry-complete'

describe('Glide initialized with `loop: true` option', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('with odd number of `perView` slides should create sufficient cloning buffer', (done) => {
    let glide = new Glide('#glide', {
      loop: true,
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
      loop: true,
      perView: 2
    })

    glide.on('build.after', () => {
      let { clones } = query(document)

      expect(clones.length).toBe(6)

      done()
    })

    glide.mount()
  })

  test('with doubled `cloneRato` should create doubled cloning buffer', (done) => {
    let glide = new Glide('#glide', {
      loop: true,
      perView: 2,
      cloneRatio: 2
    })

    glide.on('build.after', () => {
      let { clones } = query(document)

      expect(clones.length).toBe(12)

      done()
    })

    glide.mount()
  })
})
