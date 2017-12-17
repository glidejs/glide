import Glide from '../../src/index'
import defaults from '../../src/defaults'

import html from '../fixtures/html'

describe('API call to', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`index` should return index of current index', () => {
    let glide = new Glide('#glide', { startAt: 2 })

    expect(glide.index).toBe(2)
  })

  test('`settings` should return extended options', () => {
    let glide = new Glide('#glide', { startAt: 2 })

    expect(glide.settings).toBe(Object.assign(defaults, { startAt: 2 }))
  })
})