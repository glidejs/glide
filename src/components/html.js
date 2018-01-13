import { warn } from '../utils/log'
import { exist } from '../utils/dom'
import { define } from '../utils/object'
import { isString } from '../utils/unit'

const TRACK_SELECTOR = '[data-glide-el="track"]'

export default function (Glide, Components) {
  const HTML = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount () {
      this.root = Glide.selector
      this.track = this.root.querySelector(TRACK_SELECTOR)
      this.slides = Array.from(this.wrapper.children).filter((slide) => {
        return !slide.classList.contains(Glide.settings.classes.cloneSlide)
      })
    }
  }

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get () {
      return HTML._r
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set (root) {
      if (isString(root)) {
        root = document.querySelector(root)
      }

      if (exist(root)) {
        HTML._r = root
      } else {
        warn('Root element must be a existing HTML node')
      }
    }
  })

  define(HTML, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return HTML._t
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (tr) {
      if (exist(tr)) {
        HTML._t = tr
      } else {
        warn(`Could not find track element. Please use ${TRACK_SELECTOR} attribute.`)
      }
    }
  })

  define(HTML, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get () {
      return HTML.track.children[0]
    }
  })

  return HTML
}
