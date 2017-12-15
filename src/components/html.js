import { warn } from '../utils/log'
import { exist } from '../utils/dom'
import { define } from '../utils/object'

export default function (Glide, Components) {
  const TRACK_SELECTOR = '[data-glide-el="track"]'

  const HTML = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    init () {
      this.root = Glide.selector
      this.track = this.root.querySelector(TRACK_SELECTOR)
    }
  }

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get () {
      return HTML._el
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
        HTML._el = el
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
      return HTML._tr
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (tr) {
      if (exist(tr)) {
        HTML._tr = tr
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

  define(HTML, 'slides', {
    /**
     * Gets collection of the slides nodes.
     *
     * @return {Array}
     */
    get () {
      return HTML.wrapper.children
    }
  })

  return HTML
}
