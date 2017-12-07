import Peeking from './peeking'
import Focusing from './focusing'

/**
 * Collection of transformers.
 *
 * @type {Array}
 */
const TRANSFORMERS = [
  Peeking,
  Focusing
]

/**
 * Applies diffrent transformers on glide translate value.
 *
 * @param  {Glide} Glide
 * @param  {Components} Components
 * @return {Object}
 */
export default function (Glide, Components) {
  return {
    /**
     * Pipline translate value registered transformers.
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
