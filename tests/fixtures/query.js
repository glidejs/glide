const ROOT_SELECTOR = '.glide'
const CLONE_CLASS = 'glide__slide--clone'
const TRACK_SELECTOR = '[data-glide-el="track"]'
const BULLETS_SELECTOR = `[data-glide-dir*="="]`
const PREVIOUS_CONTROLS_SELECTOR = `[data-glide-dir*="<"]`
const NEXT_CONTROLS_SELECTOR = `[data-glide-dir*=">"]`

export function query (document) {
  const root = document.querySelector(ROOT_SELECTOR)
  const track = root.querySelector(TRACK_SELECTOR)
  const wrapper = track.children[0]

  const bullets = root.querySelectorAll(BULLETS_SELECTOR)
  const previousControls = root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR)
  const nextControls = root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
  const slides = Array.from(wrapper.children).filter((slide) => {
    return !slide.classList.contains(CLONE_CLASS)
  })
  const clones = Array.from(wrapper.children).filter((slide) => {
    return slide.classList.contains(CLONE_CLASS)
  })

  return {
    root,
    track,
    wrapper,
    slides,
    clones,
    bullets,
    previousControls,
    nextControls
  }
}
