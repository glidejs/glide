import Peek from '../../components/peek'

export default class Peeking {
  transform(translate) {
    return translate - (Peek.value)
  }
}