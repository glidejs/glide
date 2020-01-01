import { define } from '../utils/object'
import { isNumber, isObject, toFloat } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Sizes, Gaps, Run, Html } = Components

  const Loop = {
    mount () {
      this.set(Components.Translate.value)
    },

    set (translate) {
      const { slides } = Loop
      const { perView } = Glide.settings
      const { slideWidth, wrapperWidth } = Sizes
      const { value: gapValue } = Gaps

      if (
        (translate < wrapperWidth) &&
        (translate > (wrapperWidth - (slideWidth * perView) - (gapValue * perView)))
      ) {
        Loop.layout()
      } else {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.left = `${(slideWidth * i) + (gapValue * i)}px`
        }
      }
    },

    layout () {
      let { slides } = this

      for (let i = 0; i < slides.length; i++) {
        let value = ((Sizes.slideWidth * (i + 1)) + (Sizes.slideWidth * Run.length)) + ((Gaps.value * (i + 1)) + (Run.length * Gaps.value))
        slides[i].style.left = `${value}px`
      }
    }
  }

  define(Loop, 'slides', {
    get () {
      return Html.slides.slice(0, Loop.number)
    }
  })

  define(Loop, 'number', {
    get () {
      let { focusAt, perView } = Glide.settings

      if (focusAt === 'center') {
        return perView + Math.floor(perView / 2)
      }

      if ((focusAt + 1) >= Math.round(perView / 2)) {
        return perView + focusAt
      }

      return perView + (perView - (focusAt + 1))
    }
  })

  Events.on('translate.set', (translate) => {
    Loop.set(translate.value)
  })

  return Loop
}
