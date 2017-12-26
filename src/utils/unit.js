import { isString, isPercentage } from './primitives'

/**
 * Converts value entered as number, string
 * or procentage to actual width value.
 *
 * @param {Number|String} value
 * @param {Number} width
 * @returns {Number}
 */
export function dimension (value, width) {
  let parsed = parseInt(value, 10)

  if (isPercentage(value)) {
    return parseInt(width * (parsed / 100))
  }

  return parsed
}
