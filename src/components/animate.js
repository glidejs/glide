import easings from '../utils/easing'
import { define } from '../utils/object'
import { toInt, toFloat, isString } from '../utils/unit'

export default function (Glide, Components, Events) {
  const { Translate, Size, Gap } = Components

  let translate = Translate._v
  let start = performance.now()

  function lerp (start, end, l) {
    return start + (end - start) * l
  }

  const Animate = {
    make (now) {
      const then = (now - start)
      const l = Math.min(then / Animate.duration, 1)

      if (l < 1) {
        const offset = (Size.slideWidth + Gap.value)

        translate = Translate.set(-offset * Animate.ease(l))

        requestAnimationFrame(Animate.make)
      } else {
        Translate.value = translate

        cancelAnimationFrame(Animate.make)
      }
    },

    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after (callback) {
      setTimeout(() => {
        callback()
      }, this.duration)
    }
  }

  define(Animate, 'duration', {
    get () {
      return toInt(Glide.settings.animationDuration)
    }
  })

  define(Animate, 'ease', {
    get () {
      const ease = Glide.settings.animationEasing

      if (isString) {
        return easings[ease]
      }

      return ease
    }
  })

  Events.on('run', () => {
    start = performance.now()

    requestAnimationFrame(Animate.make)
  })

  return Animate
}
