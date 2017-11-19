import Core from '../../components/core'
import Peek from '../../components/peek'

export default class Peeking {
  transform (translate) {
    if (Core.settings.focusAt >= 0) {
      translate -= Peek.value / 2
    }

    return translate
  }
}
