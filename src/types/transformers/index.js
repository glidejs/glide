import Peeking from './peeking'
import Focusing from './focusing'

const TRANSFORMERS = [
  Peeking,
  Focusing
]

export default function (Glide, Components) {
  return {
    transform (translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        translate = TRANSFORMERS[i](Glide, Components).translate(translate)
      }

      return translate
    }
  }
}
