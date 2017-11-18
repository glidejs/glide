import Peeking from './transformers/peeking'
import Focusing from './transformers/focusing'

const TRANSFORMERS = [
  Peeking,
  Focusing
]

export default class Type {
  applyTransforms (translate) {
    for (var i = 0; i < TRANSFORMERS.length; i++) {
      let transformer = new TRANSFORMERS[i]()

      translate = transformer.transform(translate)
    }

    return translate
  }
}
