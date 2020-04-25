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

  const Translate = {
    mount () {
      this._v = mutate(Size.slideWidth * Glide.index)

      this.set()
    },

    bound (value, offset) {
      const { loop } = Glide.settings
      const { wrapperWidth } = Size

      let move = value - offset

      if (loop) {
        if (move < 0) {
          move = wrapperWidth + move

          this._v = move
        } else if (move > wrapperWidth) {
          move = mutate(0)

          this._v = move
        }
      }

      return move
    },

    set (offset = 0) {
      const value = this.bound(this._v, offset)

      Events.emit('translate.set', { value })

      Html.wrapper.style.transform = `translate3d(${-1 * value}px, 0px, 0px)`

      console.log('offset:', offset)
      console.log('value: ', value)
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
