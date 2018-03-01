import { warn } from '../utils/log'
import { exist } from '../utils/dom'
import { define } from '../utils/object'
import { isString } from '../utils/unit'

const TRACK_SELECTOR = '[data-glide-el="track"]'

export default function (Glide, Components) {
  const Html = {
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

  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get () {
      return Html._r
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
        Html._r = root
      } else {
        warn('Root element must be a existing Html node')
      }
    }
  })

  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return Html._t
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (tr) {
      if (exist(tr)) {
        Html._t = tr
      } else {
        warn(`Could not find track element. Please use ${TRACK_SELECTOR} attribute.`)
      }
    }
  })

  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get () {
      return Html.track.children[0]
    }
  })

  return Html
}
