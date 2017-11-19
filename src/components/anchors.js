import Html from './html'

import Binder from '../binder'

class Anchors extends Binder {
  /**
   * Constructs anchors component.
   */
  constructor () {
    super()

    this.detached = false
    this.prevented = false
  }

  /**
   * Binds listeners to all anchors inside glide.
   *
   * @return {Void}
   */
  init () {
    this.links = Html.wrapper.querySelectorAll('a')

    this.bind()
  }

  /**
   * Bind events to anchors inside track.
   *
   * @return {Void}
   */
  bind () {
    this.on('click', Html.wrapper, this.click.bind(this))
  }

  /**
   * Handler for click event. Prevents click
   * when glide is in prevent status.
   *
   * @param  {Object} event
   * @return {Void}
   */
  click (event) {
    event.stopPropagation()

    if (this.prevented) {
      event.preventDefault()
    }
  }

  /**
   * Detaches anchors click event inside glide.
   *
   * @return {self}
   */
  detach () {
    if (!this.detached) {
      for (var i = 0; i < this.links.length; i++) {
        this.links[i].draggable = false

        this.links[i].dataset.href = this.links[i].getAttribute('href')

        this.links[i].removeAttribute('href')
      }

      this.detached = true
    }

    return this
  }

  /**
   * Attaches anchors click events inside glide.
   *
   * @return {self}
   */
  attach () {
    if (this.detached) {
      for (var i = 0; i < this.links.length; i++) {
        this.links[i].draggable = true

        this.links[i].setAttribute('href', this.links[i].dataset.href)

        delete this.links[i].dataset.href
      }

      this.detached = false
    }

    return this
  }

  /**
   * Sets `prevented` status so anchors inside track are not clickable.
   *
   * @return {self}
   */
  prevent () {
    this.prevented = true

    return this
  }

  /**
   * Unsets `prevented` status so anchors inside track are clickable.
   *
   * @return {self}
   */
  unprevent () {
    this.prevented = false

    return this
  }
}

export default new Anchors()
