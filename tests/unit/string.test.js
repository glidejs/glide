import { ucfirst } from '../../src/utils/string'

describe('Function', () => {
  test('`ucfirst` should capitalize passed string', () => {
    expect(ucfirst('string')).toBe('String')
  })
})
