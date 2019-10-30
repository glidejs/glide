/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  /**
   * Negates the passed translate if glide is in RTL option.
   *
   * @param  {Number} translate
   * @return {Number}
   */
  return function (translate) {
    if (Components.Direction.is('rtl')) {
      return -translate
    }

    return translate
  }
}
