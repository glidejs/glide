import debounce from '../utils/debounce'
import { define } from '../utils/object'
import { listen } from '../core/event/events-bus'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components) {
  const Binder = new EventsBinder()

  const defaults = Object.assign({}, Glide.settings)
  
  const MEDIA = {
    mount () {
      this.match()
      this.bind()
    },

    bind () {
      Binder.on('resize', window, debounce(() => {
        this.match()
      }, Glide.settings.debounce))
    },

    match () {
      let breakpoints = Glide.settings.breakpoints

      for (const point in breakpoints) {
        if (breakpoints.hasOwnProperty(point)) {
          if (window.matchMedia(`(max-width: ${point})`).matches) {
            Glide.reinit(breakpoints[point])
          } else {
            Glide.reinit(defaults)
          }
        }
      }
    }
  }

  return MEDIA
}
