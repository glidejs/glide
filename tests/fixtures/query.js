const ROOT_SELECTOR = '.glide'
const CLONE_SELECTOR = '.glide__slide--clone'
const TRACK_SELECTOR = '[data-glide-el="track"]'

export function query (document) {
  let root = document.querySelector(ROOT_SELECTOR)
  let track = root.querySelector(TRACK_SELECTOR)
  let wrapper = track.children[0]
  let slides = Array.from(wrapper.children).filter((slide) => {
    return !slide.classList.contains(CLONE_SELECTOR)
  })

  return {
    root,
    track,
    wrapper,
    slides
  }
}
