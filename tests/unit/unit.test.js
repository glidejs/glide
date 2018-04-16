import {
  toInt,
  isArray,
  isString,
  isObject,
  isNumber,
  isFunction,
  isUndefined
} from '../../src/utils/unit'

describe('Function', () => {
  test('`toInt` should covert entered value in various formats to actual width number', () => {
    expect(toInt(1, 100)).toBe(1)
    expect(toInt('1', 100)).toBe(1)
    expect(toInt('1px', 100)).toBe(1)
  })

  test('`isString` return `true` on valid string', () => {
    expect(isString('undefined')).toBe(true)

    expect(isString(1)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(() => {})).toBe(false)
  })

  test('`isNumber` return `true` on valid number', () => {
    expect(isNumber(1)).toBe(true)

    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber(() => {})).toBe(false)
    expect(isNumber('undefined')).toBe(false)
  })

  test('`isObject` return `true` on valid object', () => {
    expect(isObject({})).toBe(true)

    expect(isObject(1)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject('undefined')).toBe(false)
  })

  test('`isArray` return `true` on valid array', () => {
    expect(isArray([])).toBe(true)

    expect(isArray(1)).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray(() => {})).toBe(false)
    expect(isArray('undefined')).toBe(false)
  })

  test('`isFunction` return `true` on valid function', () => {
    expect(isFunction(() => {})).toBe(true)

    expect(isFunction(1)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(true)).toBe(false)
    expect(isFunction('undefined')).toBe(false)
  })

  test('`isUndefined` return `true` on undefined', () => {
    let value = {}

    expect(isUndefined(value.prop)).toBe(true)

    expect(isUndefined('undefined')).toBe(false)
    expect(isUndefined(1)).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined([])).toBe(false)
    expect(isUndefined(true)).toBe(false)
    expect(isUndefined(() => {})).toBe(false)
  })
})
