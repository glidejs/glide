import { addPrefix } from './prefix'

export function addClass(el, name) {
  el.classList.add(addPrefix(name))
}

export function removeClass(el, name) {
  el.classList.remove(addPrefix(name))
}