import Core from '../../components/core'
import Dimensions from '../../components/dimensions'

export default class Focus {
  transform(translate) {
    let width = Dimensions.width
    let focusAt = Core.settings.focusAt
    let slideSize = Dimensions.slideSize

    if (focusAt === 'center') {
      translate = translate - (width/2 - slideSize/2);
    }

    if (focusAt > 0) {
      translate = translate - (slideSize * focusAt);
    }

    return translate
  }
}