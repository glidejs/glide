/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify (translate) {
      let focusAt = Glide.settings.focusAt
      let width = Components.Sizes.width
      let slideWidth = Components.Sizes.slideWidth

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2)
      }

      return translate - (slideWidth * focusAt)
    }
  }
}
