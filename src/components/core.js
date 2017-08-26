import uid from '../utils/uid'

class Core {
  constructor(uid) {
    this.uid = uid
    this.destroyed = false
  }

  init() {

  }

  get settings() {
    return this.attrs
  }

  set settings(attrs) {
    this.attrs = attrs
  }

  get element() {
    return this.el
  }

  set element(el) {
    this.el = el
  }

  get current() {
    return this.index
  }

  set current(i) {
    this.index = parseInt(i)
  }
}

export default new Core(uid())