import { siblings } from '../utils/dom'

export default function (Glide, Components, Events) {
  const { Html, Size, Gap } = Components

  const Layout = {
    mount () {
      Events.emit('layout.before')

      this.set(Html.slides)

      Events.emit('layout.after')
    },

    set (slides) {
      Html.wrapper.style.height = `${Html.slides[Glide.index].getBoundingClientRect().height}px`

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.position = 'absolute'
        slides[i].style.top = '0px'
        slides[i].style.left = `${(Size.slideWidth * i) + (Gap.value * i)}px`
      }
    }
  }

  Events.on(['resize', 'update'], () => {
    Layout.mount()
  })

  return Layout
}
