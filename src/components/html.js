import { warn } from '../utils/log'
import { exist } from '../utils/dom'
import { define } from '../utils/object'

const TRACK_SELECTOR = '[data-glide-el="track"]'
const SLIDE_SELECTOR = '[data-glide-el="slide"]'

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
      this.slides = this.wrapper.querySelectorAll(SLIDE_SELECTOR)
    }
  }

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get () {
      return HTML._e
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set (el) {
      if (typeof el === 'string') {
        el = document.querySelector(el)
      }

      if (exist(el)) {
        HTML._e = el
      } else {
        warn('Main element must be a existing HTML node')
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
