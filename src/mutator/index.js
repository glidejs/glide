import { warn } from '../utils/log'
import { isFunction } from '../utils/unit'

import Rtl from './transformers/rtl'
import Gap from './transformers/gap'
import Grow from './transformers/grow'
import Peeking from './transformers/peeking'
import Focusing from './transformers/focusing'

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  let TRANSFORMERS = [
    Gap,
    Grow,
    Peeking,
    Focusing
  ].concat(Glide._t, [Rtl])

  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate (translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        let transformer = TRANSFORMERS[i]

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate)
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method')
        }
      }

      return translate
    }
  }
}
