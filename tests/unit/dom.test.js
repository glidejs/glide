import { exist, toArray, siblings } from '../../src/utils/dom'

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

  test('`toArray` should return an array with the same elements when passed a NodeList', () => {
    let children = document.querySelectorAll('.child')

    // eslint-disable-next-line no-undef
    expect(NodeList.prototype.isPrototypeOf(children)).toBe(true)
    expect(Array.isArray(toArray(children))).toBe(true)
    toArray(children).forEach((child, i) => {
      expect(child).toEqual(children[i])
    })
  })
})
