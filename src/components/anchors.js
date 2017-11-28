import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  const Events = new EventBus()

  let detached = false
  let prevented = false

  return {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    init () {
      this.links = Components.Html.wrapper.querySelectorAll('a')

      this.bind()
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind () {
      Events.on('click', Components.Html.wrapper, this.click.bind(this))
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click (event) {
      event.stopPropagation()

      if (prevented) {
        event.preventDefault()
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach () {
      if (!detached) {
        for (var i = 0; i < this.links.length; i++) {
          this.links[i].draggable = false

          this.links[i].dataset.href = this.links[i].getAttprribute('href')

          this.links[i].removeAttribute('href')
        }

        detached = true
      }

      return this
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach () {
      if (detached) {
        for (var i = 0; i < this.links.length; i++) {
          this.links[i].draggable = true

          this.links[i].setAttribute('href', this.links[i].dataset.href)

          delete this.links[i].dataset.href
        }

        detached = false
      }

      return this
    },

    /**
     * Sets `prevented` status so anchors inside track are not clickable.
     *
     * @return {self}
     */
    prevent () {
      prevented = true

      return this
    },

    /**
     * Unsets `prevented` status so anchors inside track are clickable.
     *
     * @return {self}
     */
    unprevent () {
      prevented = false

      return this
    }
  }
}
