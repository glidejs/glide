import { exist, siblings } from '../../src/utils/dom'

describe('Function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="parent">
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
      </div>
    `
  })

  test('`exist` should check if passed HTMLElement is present', () => {
    expect(exist(document.querySelector('.parent'))).toBe(true)
    expect(exist(document.querySelector('.missing'))).toBe(false)
  })

  test('`siblings` should return siblings of the passed HTMLElements', () => {
    let children = document.querySelectorAll('.child')

    expect(siblings(children[1])).toHaveLength(2)
  })
})
