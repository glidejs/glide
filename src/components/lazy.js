import { throttle } from '../utils/wait'

export default function (Glide, Components, Events) {
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  let settings = Glide.settings

  const Lazy = {
    mount () {
      /**
       * Collection of image element to be lazy loaded.
       *
       * @private
       * @type {HTMLCollection}
       */
      if (settings.lazy) {
        this._slideElements = Components.Html.root.querySelectorAll('.glide__slide')
      }
    },

    lazyLoad () {
      let length
      if (Glide.index + 1 < this._slideElements.length) {
        length = Glide.index + 1
      } else {
        length = Glide.index
      }
      for (let i = Glide.index; i <= length; i++) {
        const img = this._slideElements[i].getElementsByTagName('img')[0]
        if (img && img.classList.contains('glide__lazy')) {
          if (!this._slideElements[i].classList.contains('glide__lazy__loaded')) {
            this.loadImage(img)
          }
        }
      }
    },

    loadImage (image) {
      if (image.dataset.src) {
        image.src = image.dataset.src
        image.classList.add('glide__lazy__loaded')
        image.classList.remove('glide__lazy')
      }
    }
  }

  Events.on(['mount.after'], () => {
    if (settings.lazy) {
      Lazy.lazyLoad()
    }
  })

  Events.on(['move.after'], throttle(() => {
    if (settings.lazy) {
      Lazy.lazyLoad()
    }
  }, 100))

  return Lazy
}
