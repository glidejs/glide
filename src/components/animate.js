import easings from '../utils/easing'
import { warn } from '../utils/log'
import { define } from '../utils/object'
import { toInt, isString, isNumber, isFunc } from '../utils/unit'

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

  const Animate = {
    make (now) {
      const then = (now - start)
      const duration = Math.max(then / Animate.duration, 0)
      const l = Math.min(duration, 1)
      const easing = Animate.ease(duration)

      if (l < 1) {
        translate = Translate.set((dir * offset) * easing)

        requestAnimationFrame(Animate.make)
      } else {
        Translate.value = Translate.value - (dir * offset)

        Translate.set()
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

      if (isString(ease)) {
        return easings[ease]
      }

      if (isFunc(ease)) {
        return ease
      }

      warn('Invalid `animateEasing` option. Have to be easing name or function')
    }
  })

  Events.on('run', (context) => {
    const { steps, direction } = context

    dir = DIRECTION_MAP[direction]

    if (direction === '=') {
      const to = steps * (Size.slideWidth + Gap.value)

      offset = to - Translate.value
    } else if (steps === '|') {
      offset = Glide.settings.perView * (Size.slideWidth + Gap.value)
    } else if (steps === '>') {

    } else {
      offset = Size.slideWidth + Gap.value
    }

    start = performance.now()
    requestAnimationFrame(Animate.make)
  })

  return Animate
}
