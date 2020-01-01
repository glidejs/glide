import mutator from '../mutator/index'
import { define } from '../utils/object'
import { isNumber, toFloat } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Sizes, Html } = Components

  /**
   * Instance of the translate mutation function.
   *
   * @type {Function}
   */
  const mutate = mutator(Glide, Components, Events)

  const calculate = (value, offset) => {
    const { loop } = Glide.settings
    const { wrapperWidth } = Sizes

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
      this._v = mutate(Sizes.slideWidth * Glide.index)

      apply(this._v)
    },

    set (offset) {
      let value = calculate(this._v, offset)

      apply(value)

      console.log(value)

      return value
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

  return Translate
}
