/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify (translate) {
      if (Glide.isType('carousel')) {
        return translate + (Components.Clones.grow / 2)
      }

      return translate
    }
  }
}
