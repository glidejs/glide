import { toInt } from '../utils/unit'
import { define } from '../utils/object'
import { throttle } from '../utils/wait'

export default function (Glide, Components, Events) {
  const Gaps = {}

  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get () {
      return toInt(Glide.settings.gap)
    }
  })

  define(Gaps, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get () {
      return Gaps.value * (Components.Sizes.length)
    }
  })

  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get () {
      let perView = Glide.settings.perView

      return (Gaps.value * (perView - 1)) / perView
    }
  })

  return Gaps
}
