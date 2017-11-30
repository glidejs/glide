import Type from './type'

class Slider extends Type {
  translate (Glide, Components) {
    let translate = Components.Dimensions.slideSize * Glide.index

    return this.applyTransforms(translate, Glide, Components)
  }
}

export default new Slider()
