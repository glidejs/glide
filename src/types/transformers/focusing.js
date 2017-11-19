import Core from '../../components/core'
import Dimensions from '../../components/dimensions'

export default class Focusing {
  transform (translate) {
    let width = Dimensions.width
    let focusAt = Core.settings.focusAt
    let slideSize = Dimensions.slideSize

    if (focusAt === 'center') {
      translate -= width / 2 - slideSize / 2
    }

    if (focusAt >= 0) {
      translate -= slideSize * focusAt
    }

    return translate
  }
}
