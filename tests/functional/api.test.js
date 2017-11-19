import Glide from '../../src/index'

import html from '../fixtures/html'

describe('API call to', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('`index()` should return index of current index', () => {
    let glide = new Glide('#glide', { startAt: 2 })

    expect(glide.index()).toBe(2)
  })
})
