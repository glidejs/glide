/**
 * Generates "unique" identifier number.
 *
 * @return {Number}
 */
export default function uid() {
  return new Date().valueOf()
}