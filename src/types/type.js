import Focus from './transformers/focus'

const TRANSFORMERS = [
  Focus
]

export default class Type {
  applyTransforms(translate) {
    for (var i = 0; i < TRANSFORMERS.length; i++) {
      let transformer = new TRANSFORMERS[i]

      translate = transformer.transform(translate)
    }

    return translate
  }
}