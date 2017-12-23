/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    translate (translate) {
      if (Glide.settings.focusAt >= 0) {
        let peek = Components.Peek.value

        if (typeof peek === 'object') {
          return translate - peek.before
        }

        return translate - peek
      }

      return translate
    }
  }
}
