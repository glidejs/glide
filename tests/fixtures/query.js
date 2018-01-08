const ROOT_SELECTOR = '.glide'
const TRACK_SELECTOR = '[data-glide-el="track"]'

export default function (document) {
  let root = document.querySelector(ROOT_SELECTOR)
  let track = root.querySelector(TRACK_SELECTOR)
  let wrapper = track.children[0]
  let slides = wrapper.children

  return {
    root,
    track,
    wrapper,
    slides
  }
}