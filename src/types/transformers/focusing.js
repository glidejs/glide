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
     * Modifies passed translate value with according to the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    translate (translate) {
      let width = Components.Dimensions.width
      let focusAt = Glide.settings.focusAt
      let slideWidth = Components.Dimensions.slideWidth

      if (focusAt === 'center') {
        translate -= width / 2 - slideWidth / 2
      }

      if (focusAt >= 0) {
        translate -= slideWidth * focusAt
      }

      return translate
    }
  }
}
