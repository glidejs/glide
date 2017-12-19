import { EventsBinder } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventsBinder()

  return {
    init () {
      if (Glide.settings.keyboard) {
        this.bind()
      }
    },

    bind () {
      Events.on('keyup', document, this.press)
    },

    unbind () {
      Events.on('keyup', document, this.press)
    },

    press (event) {
      if (event.keyCode === 39) {
        Components.Run.make('>')
      }
      if (event.keyCode === 37) {
        Components.Run.make('<')
      }
    }
  }
}
