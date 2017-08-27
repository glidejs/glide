import DOM from './dom'
import Core from './core'
import Animation from './animation'

class Run {
  constructor() {
    this.flag = false
    this.running = false
  }

  play() {
    if (Core.settings.autoplay || this.running) {
        if (typeof this.interval === 'undefined') {
            this.interval = setInterval(() => {
              this.pause()
              this.make('>')
              this.play()
            }, this.time)
        }
    }
  }

  pause() {
    if (Core.settings.autoplay || this.running) {
        if (this.interval >= 0) {
            this.interval = clearInterval(this.interval)
        }
    }
  }

  make() {
    Core.index = 2
    Animation.make()
  }

  get time() {
    let autoplay = DOM.slides[Core.index].getAttribute('data-glide-autoplay')

    if (autoplay) {
      return parseInt(autoplay)
    }

    return Core.settings.autoplay
  }
}

export default new Run()