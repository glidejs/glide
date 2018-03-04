import Rtl from './mutators/rtl'
import Gap from './mutators/gap'
import Grow from './mutators/grow'
import Peeking from './mutators/peeking'
import Focusing from './mutators/focusing'

/**
 * Collection of transformers.
 *
 * @type {Array}
 */
const MUTATORS = [
  Gap,
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
 * @param  {Object} Glide
 * @param  {Object} Components
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
    mutate (translate) {
      for (var i = 0; i < MUTATORS.length; i++) {
        translate = MUTATORS[i](Glide, Components).modify(translate)
      }

      return translate
    }
  }
}
