import { toInt } from '../utils/unit'
import { define } from '../utils/object'

export default function (Glide, Components, Events) {
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
    },
  }

  define(Animation, 'duration', {
    get () {
      return toInt(Glide.settings.animationDuration)
    }
  })

  return Animation
}
