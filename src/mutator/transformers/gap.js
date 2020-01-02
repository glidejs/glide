/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  /**
   * Modifies passed translate value with number in the `gap` settings.
   *
   * @param  {Number} translate
   * @return {Number}
   */
  return function (translate) {
    const multiplier = Math.floor(translate / Components.Sizes.slideWidth)

    return translate + (Components.Gap.value * multiplier)
  }
}
