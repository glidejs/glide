import Rtl from './rtl'
import Grow from './grow'
import Peeking from './peeking'
import Focusing from './focusing'

/**
 * Collection of transformers.
 *
 * @type {Array}
 */
const TRANSFORMERS = [
  Grow,
  Peeking,
  Focusing,
  // It's important that the Rtl component
  // be last on the list, so it reflects
  // all previous transformations.
  Rtl
]

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Glide} Glide
 * @param  {Components} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    transform (translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        translate = TRANSFORMERS[i](Glide, Components).translate(translate)
      }

      return translate
    }
  }
}
