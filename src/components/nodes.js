class Nodes {
  init(element) {
    this.element = element
    this.track = element.querySelector('[data-glide="track"]')
    this.wrapper = this.track.children[0]
    this.slides = this.wrapper.children
  }
}

export default new Nodes()