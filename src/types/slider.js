import Type from './type'
import Core from '../components/core'
import Dimensions from '../components/dimensions'

class Slider extends Type {
  translate () {
    let translate = Dimensions.slideSize * Core.index

    return this.applyTransforms(translate)
  }
}

export default new Slider()
