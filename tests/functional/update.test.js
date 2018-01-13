import html from '../fixtures/html'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Calling `reinit()` method with', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('new options should extend previous settings', () => {
    let options = {
      startAt: 1,
      focusAt: 1,
      perView: 2
    }

    let glide = new Glide('#glide', { startAt: 0 }).mount()

    glide.update(options)

    expect(glide.settings).toEqual(Object.assign(defaults, options))
  })
})
