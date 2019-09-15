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
    let gap = Components.Gaps.value
    let width = Components.Sizes.width
    let focusAt = Glide.settings.focusAt
    let slideWidth = Components.Sizes.slideWidth

    if (focusAt === 'center') {
      return translate - (width / 2 - slideWidth / 2)
    }

    return translate - (slideWidth * focusAt) - (gap * focusAt)
  }
}
