import { dimension } from '../../../src/utils/unit'

describe('Function', () => {
  test('`dimension` should covert entered value in various formats to actual width number', () => {
    expect(dimension(1, 100)).toBe(1)
    expect(dimension('1', 100)).toBe(1)
    expect(dimension('1px', 100)).toBe(1)
    expect(dimension('1%', 100)).toBe(1)
  })
})
