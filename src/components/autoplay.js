import { define } from '../utils/object'
import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

  const AUTOPLAY = {
    init () {
      this.start()

      if (Glide.settings.hoverpause) {
        this.events()
      }
    },

    start () {
      if (Glide.settings.autoplay) {
        if (typeof this._i === 'undefined') {
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

    events () {
      Events.on('mouseover', Components.Html.root, () => {
        this.stop()
      })

      Events.on('mouseout', Components.Html.root, () => {
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
        return parseInt(autoplay)
      }

      return Glide.settings.autoplay
    }
  })

  return AUTOPLAY
}
