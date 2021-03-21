import mutator from '../mutator/index'
import { define } from '../utils/object'
import { toFloat, isNumber } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Run, Size, Gap, Peek, Html } = Components

  /**
   * Instance of the translate mutation function.
   *
   * @type {Function}
   */
  const mutate = mutator(Glide, Components, Events)

  let jumping = false

  /**
   * Calculates a movement distance based on passed movement pattern.
   * Distance value is relative to current translate value.
   *
   * @param {Object} Movement values
   */
  const distance = ({ direction, steps }) => {
    const { length } = Run
    const { value: gap } = Gap
    const { slideWidth } = Size
    const { grow: peek } = Peek
    const { perView } = Glide.settings
    const { value: translate } = Translate

    const distance = slideWidth + gap

    if (isNumber(steps) && steps > 1) {
      return distance * steps
    } else if (steps === '|') {
      return perView * distance
    } else if (steps === '>') {
      return length * distance - translate - peek
    } else if (steps === '<') {
      return translate + peek
    } else if (direction === '=') {
      return translate - steps * distance + peek
    }

    return distance
  }

  const apply = (value) => {
    Html.wrapper.style.transform = `translate3d(${-1 * value}px, 0px, 0px)`

    Events.emit('translate.set', { value })
  }

  const Translate = {
    mount () {
      this._d = 0
      this._c = 0

      this.value = mutate(Size.slideWidth * Glide.index)

      apply(this.value)
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

  define(Translate, 'distance', {
    get () {
      return Translate._d
    },

    set (value) {
      Translate._d = toFloat(value)
    }
  })

  define(Translate, 'velocity', {
    get () {
      return Translate._c
    },

    set (value) {
      Translate._c = toFloat(value)
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

  Events.on('animate.before', ({ multiplier, movement }) => {
    Glide.disable()

    Translate.distance = multiplier * distance(movement)
  })

  Events.on('animate', ({ easing }) => {
    const velocity = Translate.distance * easing
    const value = (Translate.value + velocity).toFixed(3)

    if (Glide.settings.loop) {
      const edgeStart = toFloat(mutate(0))
      const edgeEnd = toFloat(mutate(Size.slideWidth * Html.slides.length))

      const viewportWidth = toFloat((Size.width - Size.slideWidth + Gap.value))

      if (value <= -1 * viewportWidth) {
        jumping = true
        Translate.value = edgeEnd
      } else if (value >= edgeEnd + viewportWidth - Size.slideWidth * 2) {
        jumping = true
        Translate.value = edgeStart
      }
    }

    apply(value)
  })

  Events.on('animate.after', ({ easing }) => {
    const velocity = Translate.distance * easing
    const value = Translate.value = Translate.value + velocity

    apply(value)

    Glide.enable()
  })

  return Translate
}
