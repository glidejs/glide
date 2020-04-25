import easings from '../utils/easing'
import { warn } from '../utils/log'
import { define } from '../utils/object'
import { toInt, isString, isFunc } from '../utils/unit'

const DIRECTION_MULTIPLIER = {
  '<': 1,
  '>': -1
}

export default function (Glide, Components, Events) {
  let multiplier = -1
  let start = performance.now()

  const Animate = {
    make (now) {
      const then = (now - start)
      const duration = Math.max(then / Animate.duration, 0)
      const l = Math.min(duration, 1)
      const easing = Animate.ease(duration)

      if (l < 1) {
        Events.emit('animate', { multiplier, easing })

        requestAnimationFrame(Animate.make)
      } else {
        Events.emit('animate.after', { multiplier, easing })
      }
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

  Events.on('run', (movement) => {
    const { direction } = movement

    start = performance.now()
    multiplier = DIRECTION_MULTIPLIER[direction]

    Events.emit('animate.before', { multiplier, movement })

    requestAnimationFrame(Animate.make)
  })

  return Animate
}
