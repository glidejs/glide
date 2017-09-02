import DOM from './dom'
import Core from './core'
import Build from './build'
import Animation from './animation'

class Run {
  constructor() {
    this.flag = false
    this.running = false
  }

  init() {
    if (Core.settings.autoplay || this.running) {
      if (typeof this.interval === 'undefined') {
        this.interval = setInterval(() => {
          this.stop().make('>').init()
        }, this.period)
      }
    }

    return this
  }

  stop() {
    if (Core.settings.autoplay || this.running) {
      if (this.interval >= 0) {
        this.interval = clearInterval(this.interval)
      }
    }

    return this
  }

  make(move, callback) {
    this.direction = move.substr(0, 1)
    this.steps = (move.substr(1)) ? parseInt(move.substr(1)) : 0

    switch (this.direction) {
      case '>':
        // We are at the last slide while moving forward
        // and step is a number. Set "jumping" flag
        // and change index to the first.
        if (this.isEnd()) {
          Core.index = 0

          this.flag = true
        }
        // Step is not a number, but '>'
        // scroll slider to the end.
        else if (this.steps === '>') {
          Core.index = this.length
        }
        // Otherwise change normally.
        else {
          Core.index = Core.index + 1
        }
        break;

      case '<':
        // When we at first slide and move backward and steps
        // are number, set flag and index slide to last.
        if (this.isStart()) {
          Core.index = this.length

          this.flag = true
        }
        // When steps is not number, but '<'
        // scroll slider to start.
        else if (this.steps === '<') {
          Core.index = 0
        }
        // Otherwise change normally.
        else {
          Core.index = Core.index - 1
        }
        break;

      case '=':
        Core.index = this.steps
        break;
    }

    Animation.make().after(() => {
      Build.activeClass()
    })

    return this
  }

  /**
   * Checks if we are on the first slide.
   *
   * @return {Boolean}
   */
  isStart() {
    return Core.index === 0
  }

  /**
   * Checks if we are on the last slide.
   *
   * @return {Boolean}
   */
  isEnd() {
    return Core.index === this.length
  }

  /**
   * Checks if we are making offset run.
   *
   * @return {Boolean}
   */
  isOffset(direction) {
    return this.flag && this.direction === direction
  }

  /**
   * Gets time period value for the autoplay interval. Prioritizes
   * times in `data-glide-autoplay` attrubutes over options.
   *
   * @return {Number}
   */
  get period() {
    let autoplay = DOM.slides[Core.index].getAttribute('data-glide-autoplay')

    if (autoplay) {
      return parseInt(autoplay)
    }

    return Core.settings.autoplay
  }

  /**
   * Gets value of the running distance based
   * on zero-indexing number of slides.
   *
   * @return {Number}
   */
  get length() {
    return DOM.slides.length - 1
  }
}

export default new Run()