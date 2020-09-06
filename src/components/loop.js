import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const { Size, Gap, Html } = Components

  const Loop = {
    set (translate) {
      const { slides } = this
      const { value: gapValue } = Gap
      const { perView, peek, focusAt } = Glide.settings
      const { slideWidth, wrapperWidth } = Size

      if (
        // (translate <= wrapperWidth) &&
        // (translate >= (wrapperWidth - (slideWidth * (perView + 1)) - (gapValue * (perView + 1)) - peek))
        translate >= -(peek + (slideWidth * focusAt) + (gapValue * (perView - 1))) &&
        translate <= 0
      ) {
        const mocks = slides.end.reverse()

        for (let i = 0; i < mocks.length; i++) {
          mocks[i].style.left = `-${(slideWidth * (i + 1)) + (gapValue * (i + 1))}px`
        }
      } else {
        const mocksEnd = slides.end

        for (let i = 0; i < mocksEnd.length; i++) {
          const num = Html.slides.length - Loop.number + i

          mocksEnd[i].style.left = `${(slideWidth * num) + (gapValue * num)}px`
        }
      }

      if (
        translate <= wrapperWidth &&
        translate >= (wrapperWidth - (slideWidth * (perView + 1)) - (gapValue * (perView + 1)) - peek)
      ) {
        const mocks = slides.start

        for (let i = 0; i < mocks.length; i++) {
          mocks[i].style.left = `${wrapperWidth + (slideWidth * i) + (gapValue * i)}px`
        }
      } else {
        const mocksStart = slides.start

        for (let i = 0; i < mocksStart.length; i++) {
          mocksStart[i].style.left = `${(slideWidth * i) + (gapValue * i)}px`
        }
      }
    }
  }

  define(Loop, 'slides', {
    get () {
      return {
        start: [...Html.slides.slice(0, Loop.number)],
        end: [...Html.slides.slice(-Loop.number)]
      }
    }
  })

  define(Loop, 'number', {
    get () {
      const { focusAt, perView } = Glide.settings

      if (focusAt === 'center') {
        return Math.round(perView / 2)
      }

      return perView + 1
    }
  })

  Events.on('translate.set', (translate) => {
    Loop.set(translate.value)
  })

  return Loop
}
