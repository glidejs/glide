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
      if (Glide.isType('carousel')) {
        return translate + (Components.Clones.grow / 2)
      }
      
      return translate
    }
  }
}
