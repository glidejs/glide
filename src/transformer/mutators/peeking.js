import { isObject } from '../../utils/unit'

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
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
    modify (translate) {
      if (Glide.settings.focusAt >= 0) {
        let peek = Components.Peek.value

        if (isObject(peek)) {
          return translate - peek.before
        }

        return translate - peek
      }

      return translate
    }
  }
}
