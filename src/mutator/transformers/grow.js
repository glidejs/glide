/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  /**
   * Adds to the passed translate width of the half of clones.
   *
   * @param  {Number} translate
   * @return {Number}
   */
  return function (translate) {
    return translate + (Components.Clones.grow / 2)
  }
}
