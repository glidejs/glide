import DOM from './dom'
import Core from './core'
import Build from './build'
import Animation from './animation'

class Run {
  /**
   * Constructs run component.
   */
  constructor() {
    this.flag = false
    this.running = false
  }

  /**
   * Initializes autorunning of the glide.
   * 
   * @return {self}
   */
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

  /**
   * Stops autorunning of the glide.
   * 
   * @return {self}
   */
  stop() {
    if (Core.settings.autoplay || this.running) {
      if (this.interval >= 0) {
        this.interval = clearInterval(this.interval)
      }
    }

    return this
  }

  /**
   * Handles glide status. Calculates current index 
   * based on passed move and slider type.
   * 
   * @param {String} move 
   * @param {Function} callback 
   */
  make(move, callback) {
    this.direction = move.substr(0, 1)
    this.steps = (move.substr(1)) ? parseInt(move.substr(1)) : 0

    switch (this.direction) {
      case '>':
        if (typeof this.steps === 'number' && this.steps !== 0) {
          Core.index += Math.min(this.length - Core.index, -this.steps)
        }
        else if (this.steps === '>') {
          Core.index = this.length
        }
        else if (this.isEnd()) {
          Core.index = 0

          this.flag = true
        }
        else {
          Core.index++
        }
        break;

      case '<':
        if (typeof this.steps === 'number' && this.steps !== 0) {
          Core.index -= Math.min(Core.index, this.steps)
        }
        else if (this.steps === '<') {
          Core.index = 0
        }
        else if (this.isStart()) {
          Core.index = this.length

          this.flag = true
        }
        else {
          Core.index--
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