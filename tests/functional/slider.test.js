import html from '../fixtures/html'
import { query } from '../fixtures/query'

import defaults from '../../src/defaults'
import Glide from '../../entry/entry-complete'

describe('Glide initialized as `slider`', () => {
  let elements

  beforeEach(() => {
    document.body.innerHTML = html

    elements = query(document)
  })

  test('should have a correct type', () => {
    let glide = new Glide('#glide').mount()

    expect(glide.isType('slider')).toBe(true)
  })
})
