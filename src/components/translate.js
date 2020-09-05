import mutator from '../mutator/index'
import { define } from '../utils/object'
import { toFloat } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Run, Size, Gap, Html } = Components

  /**
   * Instance of the translate mutation function.
   *
   * @type {Function}
   */
  const mutate = mutator(Glide, Components, Events)

  const distance = ({ steps, direction }) => {
    const singleDistance = Size.slideWidth + Gap.value

    let offset = 0

    if (direction === '=') {
      offset = Translate.value - (steps * singleDistance)
    } else if (steps === '|') {
      offset = Glide.settings.perView * singleDistance
    } else if (steps === '>') {
      offset = (Components.Run.length * singleDistance) - Translate.value
    } else if (steps === '<') {
      offset = Translate.value
    } else {
      offset = singleDistance
    }

    return offset
  }

  const Translate = {
    mount () {
      this._o = 0
      this._v = mutate(Size.slideWidth * Glide.index)

      this.set()
    },

    bound (value, offset) {
      const edgeStart = mutate(0)
      const edgeEnd = mutate(Size.slideWidth * Html.slides.length)

      let move = value - offset

      if (Glide.settings.loop) {
        if (move < edgeStart) {
          move = edgeEnd

          this._v = move
        } else if (move > edgeEnd) {
          move = edgeStart

          this._v = move
        }
      }

      return move
    },

    set (offset = 0) {
      const value = this.bound(this._v, offset)

      this.apply(value)

      return value
    },

    apply (value) {
      Events.emit('translate.set', { value })

      Html.wrapper.style.transform = `translate3d(${-1 * value}px, 0px, 0px)`
    }
  }

  define(Translate, 'value', {
    get () {
      return Translate._v
    },

    set (value) {
      Translate._v = toFloat(value)
    }
  })

  define(Translate, 'offset', {
    get () {
      return Translate._o
    },

    set (value) {
      Translate._o = toFloat(value)
    }
  })

  Events.on('resize', () => {
    Translate.mount()
  })

  Events.on('animate.before', ({ movement }) => {
    Glide.disable()

    Translate._o = distance(movement)
  })

  Events.on('animate', ({ multiplier, easing }) => {
    const value = (Translate._o * multiplier) * easing

    Translate.set(value)
  })

  Events.on('animate.after', ({ multiplier }) => {
    Translate._v = Translate._v - (multiplier * Translate._o)

    Glide.enable()
  })

  return Translate
}
