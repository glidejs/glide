import defaults from '../defaults'

class Core {
  constructor() {
    this.uid = new Date().valueOf()
  }

  set settings(settings) {
    this.settings = Object.assign(defaults, settings)
  }

  set element(element) {
    this.element = element
  }
}

export default new Core()