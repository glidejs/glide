import { define } from '../utils/object'
import { toInt, isUndefined } from '../utils/unit'

import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
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
        this.events()
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
      if (Glide.settings.autoplay) {
        this._i = clearInterval(this._i)
      }
    },

    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    events () {
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
   * - on destroying, to clear defined interval
   */
  Events.listen('destroy', () => {
    AUTOPLAY.stop()
  })

  return AUTOPLAY
}
