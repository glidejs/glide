import { throttle } from '../utils/wait'

export default function (Glide, Components, Events) {
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  const settings = Glide.settings
  let inView = false

  const Lazy = {
    mount () {
      /**
       * Collection of image element to be lazy loaded.
       *
       * @private
       * @type {HTMLCollection}
       */
      if (settings.lazy) {
        this._wrapper = Components.Html.root
        this._slideElements = this._wrapper.querySelectorAll('.glide__slide')
      }
    },

    withinView () {
      let rect = this._wrapper.getBoundingClientRect()

      if (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top <= (window.innerHeight * settings.lazyScrollThreshold || document.documentElement.clientHeight) * settings.lazyScrollThreshold &&
        rect.left <= (window.innerWidth * settings.lazyScrollThreshold || document.documentElement.clientWidth * settings.lazyScrollThreshold)
      ) {
        this.lazyLoad()
      }
    },

    lazyLoad () {
      let length
      inView = true
      if (Glide.index + (settings.lazyInitialSlidesLoaded - 1) < this._slideElements.length) {
        length = Glide.index + (settings.lazyInitialSlidesLoaded - 1)
      } else {
        length = Glide.index
      }
      for (let i = 0; i <= length; i++) {
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
        image.removeAttribute('data-src')
      }
    }
  }

  Events.on(['mount.after'], () => {
    if (settings.lazy) {
      Lazy.withinView()
    }
  })

  Events.on(['move.after'], throttle(() => {
    if (settings.lazy && inView) {
      Lazy.lazyLoad()
    } else if (settings.lazy) {
      Lazy.withinView()
    }
  }, 100))

  document.addEventListener('scroll', throttle(() => {
    if (settings.lazy && !inView) {
      Lazy.withinView()
    }
  }, 100))

  return Lazy
}
