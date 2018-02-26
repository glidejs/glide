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

  const AUTOPLAY = {
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
     * @return {self}
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
    }
  }

  define(AUTOPLAY, 'time', {
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
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - when starting a swiping
   * - on updating via API to reset interval that may changed
   */
  Events.listen(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], () => {
    AUTOPLAY.stop()
  })

  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending swiping
   * - on updating via API, to rerun autoplaying
   */
  Events.listen(['run.after', 'play', 'swipe.end', 'update'], () => {
    AUTOPLAY.start()
  })

  return AUTOPLAY
}
