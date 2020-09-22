import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const { Size, Gap, Html } = Components

  const Loop = {
    /**
     * Re-positions edge slides based on passed translate
     * value to achieve infinite looped carousel.
     *
     * @param {Number} translate
     * @returns {Void}
     */
    set (translate) {
      const { slides } = Html
      const { value: gapValue } = Gap
      const { elements, number } = Loop
      const { slideWidth, wrapperWidth } = Size
      const { perView, peek, focusAt } = Glide.settings

      // If we are at beginning of the carousel in the the "starting zone" re-position end slides,
      // so they are positioned before start slides. Otherwise, reposition
      // end slides to its normal positions.
      if (
        translate >= -(peek + (slideWidth * focusAt) + (gapValue * (perView - 1))) &&
        translate <= 0
      ) {
        elements.end.reverse().forEach((element, i) => {
          element.style.left = `-${(slideWidth * (i + 1)) + (gapValue * (i + 1))}px`
        })
      } else {
        elements.end.forEach((element, i) => {
          const offsetNumber = slides.length - number + i

          element.style.left = `${(slideWidth * offsetNumber) + (gapValue * offsetNumber)}px`
        })
      }

      // If we are at the end of carousel in the the "ending zone" re-position start slides,
      // so they are positioned after end slides. Otherwise, reposition
      // start slides to it's normal positions.
      if (
        translate <= wrapperWidth &&
        translate >= (wrapperWidth - (slideWidth * (perView + 1)) - (gapValue * (perView + 1)) - peek)
      ) {
        elements.start.forEach((element, i) => {
          element.style.left = `${wrapperWidth + (slideWidth * i) + (gapValue * i)}px`
        })
      } else {
        elements.start.forEach((element, i) => {
          element.style.left = `${(slideWidth * i) + (gapValue * i)}px`
        })
      }
    }
  }

  define(Loop, 'elements', {
    /**
     * Gets collection of edge slide HTMLElements.
     *
     * @return {Object}
     */
    get () {
      const { slides } = Html
      const { number } = Loop

      return {
        start: [...slides.slice(0, number)],
        end: [...slides.slice(-number)]
      }
    }
  })

  define(Loop, 'number', {
    /**
     * Gets number of the slides which will be re-positioned.
     *
     * @returns {Number}
     */
    get () {
      const { focusAt, perView } = Glide.settings

      if (focusAt === 'center') {
        return Math.round(perView / 2)
      }

      return perView + 1
    }
  })

  /**
   * Re-position slides:
   * - each time we setting new translate value
   */
  Events.on('translate.set', (translate) => {
    Loop.set(translate.value)
  })

  return Loop
}
