import { define } from '../utils/object'
import { toInt, isUndefined } from '../utils/unit'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  const Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount () {
      this.start()

      if (Glide.settings.hoverpause) {
        this.bind()
      }
    },

    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start () {
      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(() => {
            this.stop()

            Components.Run.make('>')

            this.start()
          }, this.time)
        }
      }
    },

    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop () {
      this._i = clearInterval(this._i)
    },

    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('mouseover', Components.Html.root, () => {
        this.stop()
      })

      Binder.on('mouseout', Components.Html.root, () => {
        this.start()
      })
    },

    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind () {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root)
    }
  }

  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get () {
      let autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay')

      if (autoplay) {
        return toInt(autoplay)
      }

      return toInt(Glide.settings.autoplay)
    }
  })

  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */
  Events.on(['destroy', 'update'], () => {
    Autoplay.unbind()
  })

  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */
  Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], () => {
    Autoplay.stop()
  })

  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */
  Events.on(['run.after', 'play', 'swipe.end'], () => {
    Autoplay.start()
  })

  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */
  Events.on('update', () => {
    Autoplay.mount()
  })

  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */
  Events.on('destroy', () => {
    Binder.destroy()
  })

  return Autoplay
}
