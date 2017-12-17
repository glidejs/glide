import { define } from '../utils/object'

export default function (Glide, Components) {
  const RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    init () {
      this.flag = false
      this.running = false

      if (Glide.settings.autoplay || this.running) {
        if (typeof this.interval === 'undefined') {
          this.interval = setInterval(() => {
            this.stop()
              .make('>')
              .init()
          }, this.period)
        }
      }

      return this
    },

    /**
     * Stops autorunning of the glide.
     *
     * @return {self}
     */
    stop () {
      if (Glide.settings.autoplay || this.running) {
        if (this.interval >= 0) {
          this.interval = clearInterval(this.interval)
        }
      }

      return this
    },

    /**
     * Handles glide status. Calculates current index
     * based on passed move and slider type.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make (move, callback) {
      this.direction = move.substr(0, 1)
      this.steps = move.substr(1) ? move.substr(1) : 0

      switch (this.direction) {
        case '>':
          if (typeof this.steps === 'number' && parseInt(this.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this.steps))
          } else if (this.steps === '>') {
            Glide.index = this.length
          } else if (this.isEnd()) {
            Glide.index = 0

            this.flag = true
          } else {
            Glide.index++
          }
          break

        case '<':
          if (typeof this.steps === 'number' && parseInt(this.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this.steps))
          } else if (this.steps === '<') {
            Glide.index = 0
          } else if (this.isStart()) {
            Glide.index = this.length

            this.flag = true
          } else {
            Glide.index--
          }
          break

        case '=':
          Glide.index = this.steps
          break
      }

      Components.Height.set()
      Components.Transition.enable()
      Components.Animation.make().after(() => {
        Components.Build.activeClass()
      })

      return this
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart () {
      return Glide.index === 0
    },

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd () {
      return Glide.index === this.length
    },

    /**
     * Checks if we are making offset run.
     *
     * @return {Boolean}
     */
    isOffset (direction) {
      return this.flag && this.direction === direction
    }
  }

  define(RUN, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get () {
      return Components.Html.slides.length - 1
    }
  })

  define(RUN, 'period', {
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

  return RUN
}
