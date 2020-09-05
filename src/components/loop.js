import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const { Size, Gap, Html } = Components

  const Loop = {
    set (translate) {
      const { slides } = this
      const { value: gapValue } = Gap
      const { perView, peek, focusAt } = Glide.settings
      const { slideWidth, wrapperWidth } = Size

      // console.log(
      //   translate,
      //   (-((slideWidth * focusAt) + (gapValue * (perView - 1)) + peek)),
      //   translate >= (-((slideWidth * focusAt) + (gapValue * (perView - 1)) + peek)) && (translate <= 0)
      // )
      if (
        (translate <= wrapperWidth) &&
        (translate >= (wrapperWidth - (slideWidth * (perView + 1)) - (gapValue * perView)))
      ) {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.left = `${wrapperWidth + (slideWidth * i) + (gapValue * i)}px`
        }
      } else {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.left = `${(slideWidth * i) + (gapValue * i)}px`
        }
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
      const { focusAt, perView } = Glide.settings

      if (focusAt === 'center') {
        return perView + Math.floor(perView / 2)
      }

      if ((focusAt + 1) >= Math.round(perView / 2)) {
        return perView + focusAt
      }

      return perView + (perView - focusAt)
    }
  })

  Events.on('translate.set', (translate) => {
    Loop.set(translate.value)
  })

  return Loop
}
