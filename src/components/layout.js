import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const Layout = {
    mount () {
      Events.emit('layout.before')

      this.set(Components.Html.slides)

      Events.emit('layout.after')
    },

    set (slides) {
      let currentSlide = Components.Html.slides[Glide.index]

      Components.Html.wrapper.style.height = `${currentSlide.getBoundingClientRect().height}px`

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.position = 'absolute'
        slides[i].style.top = '0px'
        slides[i].style.left = `${(Components.Sizes.slideWidth * i) + (Components.Gaps.value * i)}px`
      }
    }
  }

  Events.on(['resize', 'update'], () => {
    Layout.mount()
  })

  return Layout
}
