export function query (document) {
  const root = document.querySelector('.glide')
  const track = root.querySelector('[data-glide-el="track"]')
  const wrapper = track.children[0]
  const slides = Array.from(wrapper.children).filter((slide) => {
    return !slide.classList.contains('glide__slide--clone')
  })
  const clones = Array.from(wrapper.children).filter((slide) => {
    return slide.classList.contains('glide__slide--clone')
  })

  return {
    root,
    track,
    wrapper,
    slides,
    clones
  }
}
