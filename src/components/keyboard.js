import EventsBinder from '../core/event/events-binder'

export default function (Glide, Components, Events) {
  const { Run, Direction } = Components

  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  const Binder = new EventsBinder()

  /**
   * Handles keyboard's arrows press and moving glide foward and backward.
   *
   * @param  {Object} event
   * @return {Void}
   */
  const press = (event) => {
    const { perSwipe } = Glide.settings

    if (event.keyCode === 39) {
      Run.make(Direction.resolve(`${perSwipe}>`))
    }

    if (event.keyCode === 37) {
      Run.make(Direction.resolve(`${perSwipe}<`))
    }
  }

  const Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount () {
      if (Glide.settings.keyboard) {
        this.bind()
      }
    },

    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind () {
      Binder.on('keyup', document, press)
    },

    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind () {
      Binder.off('keyup', document)
    }
  }

  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */
  Events.on(['destroy', 'update'], () => {
    Keyboard.unbind()
  })

  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */
  Events.on('update', () => {
    Keyboard.mount()
  })

  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */
  Events.on('destroy', () => {
    Binder.destroy()
  })

  return Keyboard
}
