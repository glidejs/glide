/**
 * Reflects value of glide movement.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify (translate) {
      if (Glide.settings.rtl) {
        return -translate
      }

      return translate
    }
  }
}
