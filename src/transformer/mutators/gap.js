/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify (translate) {
      return translate + (Components.Gap.value * Glide.index)
    }
  }
}
