import { define } from '../utils/object'
import { isNumber, isObject, toFloat } from '../utils/unit'

export default function (Glide, Components, Events) {
  const Loop = {
    mount(value = 0) {
      Components.Layout.set(Components.Html.slides)

      let peek = 0
      if (isObject(Glide.settings.peek)) {
        peek = Math.max(Object.values(Glide.settings.peek))
      } else {
        peek = toFloat(Glide.settings.peek)
      }

      if (value < (peek * 2)) {
        Loop.setEndSlides()
      } else if (value >= Components.Sizes.wrapperWidth - (Components.Sizes.slideWidth * Glide.settings.perView) - (Components.Gaps.value * Glide.settings.perView) - (peek * 2)) {
        Loop.setStartSlides()
      }
    },

    setEndSlides() {
      let { slideWidth } = Components.Sizes

      this.slidesEnd.forEach((slide, i) => {
        slide.style.left = `-${(slideWidth * (i + 1)) + (Components.Gaps.value * (i + 1))}px`
      })
    },

    setStartSlides() {
      let { slideWidth } = Components.Sizes

      this.slidesStart.forEach((slide, i) => {
        slide.style.left = `${((slideWidth * (i + 1)) + (slideWidth * Components.Run.length)) + ((Components.Gaps.value * (i + 1)) + (Components.Run.length * Components.Gaps.value))}px`
      })
    }
  }

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

  define(Loop, 'slidesEnd', {
    get () {
      return Components.Html.slides.slice(`-${Loop.number}`).reverse()
    }
  })

  define(Loop, 'slidesStart', {
    get () {
      return Components.Html.slides.slice(0, Loop.number)
    }
  })

  define(Loop, 'indexesEnd', {
    get () {
      let indexes = []

      for (let i = 0; i < Loop.number; i++) {
        indexes.push((Components.Html.slides.length - 1) - i)
      }

      return indexes
    }
  })

  define(Loop, 'indexesStart', {
    get () {
      let indexes = []

      for (let i = 0; i < Loop.number; i++) {
        indexes.push(i)
      }

      return indexes
    }
  })

  Events.on('translate.set', (context) => {
    let { value } = context

    setTimeout(() => {
      Loop.mount(value)
    }, 0)
  })

  return Loop
}
