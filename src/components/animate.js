import easings from '../utils/easing'
import { define } from '../utils/object'
import { toInt, toFloat, isString, isNumber } from '../utils/unit'

const DIRECTION_MAP = {
  '<': 1,
  '>': -1
}

export default function (Glide, Components, Events) {
  const { Translate, Size, Gap } = Components

  let dir = -1
  let offset = 0
  let start = performance.now()
  let translate = Translate.value

  function lerp (start, end, l) {
    return start + (end - start) * l
  }

  const Animate = {
    make (now) {
      const then = (now - start)
      const l = Math.min(then / Animate.duration, 1)

      if (l < 1) {
        translate = Translate.set((dir * offset) * Animate.ease(l))

        requestAnimationFrame(Animate.make)
      } else {
        Translate.value = translate
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

  Events.on('run', (context) => {
    const { steps, direction } = context

    start = performance.now()
    dir = DIRECTION_MAP[direction]

    if (isNumber(steps)) {
      offset = Size.slideWidth + Gap.value
    }

    if (steps === '|') {
      offset = (Glide.settings.perView * (Size.slideWidth + Gap.value))
    }

    if (steps === '>') {

    }

    requestAnimationFrame(Animate.make)
  })

  return Animate
}
