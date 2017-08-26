class Nodes {
  init(element) {
    this.element = element
    this.track = this.find('[data-glide="track"]')
    this.wrapper = this.track.children[0]
    this.slides = this.wrapper.children
  }

  find(selector) {
    return this.element.querySelector(selector)
  }
}

export default new Nodes()