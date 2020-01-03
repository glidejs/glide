/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  /**
   * Modifies passed translate value with index in the `focusAt` setting.
   *
   * @param  {Number} translate
   * @return {Number}
   */
  return function (translate) {
    const gap = Components.Gap.value
    const width = Components.Size.width
    const focusAt = Glide.settings.focusAt
    const slideWidth = Components.Size.slideWidth

    if (focusAt === 'center') {
      return translate - (width / 2 - slideWidth / 2)
    }

    return translate - (slideWidth * focusAt) - (gap * focusAt)
  }
}
