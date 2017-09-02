import Core from '../../components/core'
import Peek from '../../components/peek'
import Dimensions from '../../components/dimensions'

export default class Focusing {
  transform(translate) {
    let peek = Peek.value
    let width = Dimensions.width
    let focusAt = Core.settings.focusAt
    let slideSize = Dimensions.slideSize

    if (focusAt === 'center') {
      translate = translate - (width/2 - slideSize/2) + peek;
    }

    if (focusAt > 0) {
      translate = translate - (slideSize * focusAt);
    }

    return translate
  }
}