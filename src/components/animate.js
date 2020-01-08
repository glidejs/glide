import { toInt } from '../utils/unit'
import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1)
  const easeOut = progress => Math.pow(--progress, 5) + 1
  const finalPosition = 600
  const time = {
    start: performance.now(),
    total: 2000
  }

  const tick = now => {
    time.elapsed = now - time.start
    const progress = getProgress(time)
    const easing = easeOut(progress)
    const position = easing * finalPosition
    element.style.transform = `translate(${position}px)`
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)

  const Animation = {
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

  define(Animation, 'duration', {
    get () {
      return toInt(Glide.settings.animationDuration)
    }
  })

  return Animation
}
