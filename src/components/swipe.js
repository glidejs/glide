import { toInt } from '../utils/unit'
import { define } from '../utils/object'
import { listen, emit } from '../core/event/events-bus'

import EventsBinder from '../core/event/events-binder'

const START_EVENTS = ['touchstart', 'mousedown']
const MOVE_EVENTS = ['touchmove', 'mousemove']
const END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave']
const MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']

export default function (Glide, Components) {
  const Binder = new EventsBinder()

  let swipeSin = 0
  let swipeStartX = 0
  let swipeStartY = 0
  let dragging = false

  const SWIPE = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount () {
      this.bindSwipeStart()
    },

    /**
     * Handler for `swipestart` event.
     * Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start (event) {
      if (this.enabled) {
        let swipe = this.touches(event)

        this.disable()

        swipeSin = null
        swipeStartX = toInt(swipe.pageX)
        swipeStartY = toInt(swipe.pageY)

        this.bindSwipeMove()
        this.bindSwipeEnd()

        emit('swipe.start')
      }
    },

    /**
     * Handler for `swipemove` event.
     * Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move (event) {
      if (this.enabled) {
        let settings = Glide.settings

        let swipe = this.touches(event)

        let subExSx = toInt(swipe.pageX) - swipeStartX
        let subEySy = toInt(swipe.pageY) - swipeStartY
        let powEX = Math.abs(subExSx << 2)
        let powEY = Math.abs(subEySy << 2)
        let swipeHypotenuse = Math.sqrt(powEX + powEY)
        let swipeCathetus = Math.sqrt(powEY)

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse)

        if (swipeSin * 180 / Math.PI < settings.touchAngle) {
          if (settings.rtl) {
            Components.Move.make(-subExSx * parseFloat(settings.touchRatio))
          } else {
            Components.Move.make(subExSx * parseFloat(settings.touchRatio))
          }
        }

        if (swipeSin * 180 / Math.PI < settings.touchAngle) {
          event.stopPropagation()
          event.preventDefault()

          Components.Html.root.classList.add(settings.classes.dragging)

          emit('swipe.move')
        } else {
          return false
        }
      }
    },

    /**
     * Handler for `swipeend` event. Finitializes
     * user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end (event) {
      if (this.enabled) {
        let settings = Glide.settings

        let swipe = this.touches(event)
        let threshold = this.threshold(event)

        this.enable()

        let swipeDistance = swipe.pageX - swipeStartX
        let swipeDeg = swipeSin * 180 / Math.PI
        let steps = Math.round(swipeDistance / Components.Sizes.slideWidth)

        if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (settings.perTouch) {
            steps = Math.min(steps, toInt(settings.perTouch))
          }

          if (settings.rtl) {
            Components.Run.make(`>${steps}`)
          } else {
            Components.Run.make(`<${steps}`)
          }
        } else if (
          swipeDistance < -threshold &&
          swipeDeg < settings.touchAngle
        ) {
          // While swipe is negative and lower than negative threshold move forward.
          if (settings.perTouch) {
            steps = Math.max(steps, -toInt(settings.perTouch))
          }

          if (settings.rtl) {
            Components.Run.make(`<${steps}`)
          } else {
            Components.Run.make(`>${steps}`)
          }
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make()
        }

        Components.Html.root.classList.remove(settings.classes.dragging)

        this.unbindSwipeMove()
        this.unbindSwipeEnd()

        emit('swipe.end')
      }
    },

    /**
   * Binds swipe's starting event.
   *
   * @return {Void}
   */
    bindSwipeStart () {
      let settings = Glide.settings

      if (settings.swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, this.start.bind(this))
      }

      if (settings.dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, this.start.bind(this))
      }
    },

    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart () {
      Binder.off(START_EVENTS[0], Components.Html.wrapper)
      Binder.off(START_EVENTS[1], Components.Html.wrapper)
    },

    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove () {
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, this.move.bind(this))
    },

    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove () {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper)
    },

    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd () {
      Binder.on(END_EVENTS, Components.Html.wrapper, this.end.bind(this))
    },

    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd () {
      Binder.off(END_EVENTS, Components.Html.wrapper)
    },

    touches (event) {
      if (MOUSE_EVENTS.includes(event.type)) {
        return event
      }

      return event.touches[0] || event.changedTouches[0]
    },

    /**
     * Gets value of minimum swipe distance.
     * Returns value based on event type.
     *
     * @return {Number}
     */
    threshold (event) {
      let settings = Glide.settings

      if (MOUSE_EVENTS.includes(event.type)) {
        return settings.dragThreshold
      }

      return settings.swipeThreshold
    },

    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable () {
      dragging = false

      Components.Transition.enable()

      return this
    },

    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable () {
      dragging = true

      Components.Transition.disable()

      return this
    }
  }

  define(SWIPE, 'enabled', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number}
     */
    get () {
      return !(Glide.disabled && dragging)
    }
  })

  /**
   * Add component class:
   * - after initial building
   */
  listen('build.after', () => {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable)
  })

  return SWIPE
}
