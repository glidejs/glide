import mutator from '../mutator/index'
import { define } from '../utils/object'
import { toFloat } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Size, Html } = Components

  /**
   * Instance of the translate mutation function.
   *
   * @type {Function}
   */
  const mutate = mutator(Glide, Components, Events)

  const calculate = (value, offset = 0) => {
    const { loop } = Glide.settings
    const { wrapperWidth } = Size

    let move = value - offset

    if (loop) {
      if (move < 0) {
        return wrapperWidth + (value - offset)
      } else if (move > wrapperWidth) {
        return -1 * (offset + (wrapperWidth - value))
      }
    }

    return move
  }

  const apply = (value) => {
    Events.emit('translate.set', { value })

    Html.wrapper.style.transform = `translate3d(${-1 * value}px, 0px, 0px)`
  }

  const Translate = {
    mount () {
      this._v = mutate(Size.slideWidth * Glide.index)

      this.set()
    },

    set (offset = 0) {
      let value = calculate(this._v, offset)

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

  Events.on('resize', () => {
    Translate.mount()
  })

  return Translate
}
