/**
 * Makes a string's first character uppercase.
 *
 * @param  {String} string
 * @return {String}
 */
export function ucfirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
