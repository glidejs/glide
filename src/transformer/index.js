import Rtl from './mutators/rtl'
import Gap from './mutators/gap'
import Grow from './mutators/grow'
import Peeking from './mutators/peeking'
import Focusing from './mutators/focusing'

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components, Events) {
  /**
   * Merge instance mutators with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  let MUTATORS = [
    Gap,
    Grow,
    Peeking,
    Focusing,
  ].concat(Glide._m, [Rtl])

  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate (translate) {
      for (var i = 0; i < MUTATORS.length; i++) {
        translate = MUTATORS[i](Glide, Components, Events).modify(translate)
      }

      return translate
    }
  }
}
