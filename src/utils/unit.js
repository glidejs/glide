/**
 * Converts value entered as number, string 
 * or procentage to actual width value.
 * 
 * @param {Number|String} value 
 * @param {Number} width 
 * @returns {Number}
 */
export function dimension (value, width) {
  const isPercentage = typeof value === 'string' && value.indexOf('%') >= 0

  value = parseInt(value, 10)

  if (isPercentage) {
    return parseInt(width * (value / 100))
  }

  return value
}
