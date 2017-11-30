import { define } from '../utils/object'
import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  const START_EVENTS = ['touchstart', 'mousedown']
  const MOVE_EVENTS = ['touchmove', 'mousemove']
  const END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave']
  const MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']

  let swipeSin = 0
  let swipeStartX = 0
  let swipeStartY = 0
  let dragging = false

  let Events = new EventBus()

  const SWIPE = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    init () {
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
        swipeStartX = parseInt(swipe.pageX)
        swipeStartY = parseInt(swipe.pageY)

        this.bindSwipeMove()
        this.bindSwipeEnd()

        Components.Run.stop()
        Components.Callbacks.call(Glide.settings.swipeStart)
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
        let swipe = this.touches(event)

        let subExSx = parseInt(swipe.pageX) - swipeStartX
        let subEySy = parseInt(swipe.pageY) - swipeStartY
        let powEX = Math.abs(subExSx << 2)
        let powEY = Math.abs(subEySy << 2)
        let swipeHypotenuse = Math.sqrt(powEX + powEY)
        let swipeCathetus = Math.sqrt(powEY)

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse)

        if (swipeSin * 180 / Math.PI < Glide.settings.touchAngle) {
          Components.Animation.make(subExSx * parseFloat(Glide.settings.touchRatio))
        }

        if (swipeSin * 180 / Math.PI < Glide.settings.touchAngle) {
          event.stopPropagation()
          event.preventDefault()

          Components.Html.wrapper.classList.add(Glide.settings.classes.dragging)
        } else {
          return
        }

        Components.Anchors.prevent().detach()
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
        let swipe = this.touches(event)
        let threshold = this.threshold(event)

        this.enable()

        let swipeDistance = swipe.pageX - swipeStartX
        let swipeDeg = swipeSin * 180 / Math.PI
        let steps = Math.round(swipeDistance / Components.Dimensions.slideWidth)

        if (swipeDistance > threshold && swipeDeg < Glide.settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (Glide.settings.perTouch) {
            steps = Math.min(steps, parseInt(Glide.settings.perTouch))
          }

          Components.Run.make(`<${steps}`)
        } else if (
          swipeDistance < -threshold &&
          swipeDeg < Glide.settings.touchAngle
        ) {
          // While swipe is negative and lower than negative threshold move forward.
          if (Glide.settings.perTouch) {
            steps = Math.max(steps, -parseInt(Glide.settings.perTouch))
          }

          Components.Run.make(`>${steps}`)
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Animation.make()
        }

        Components.Html.wrapper.classList.remove(Glide.settings.classes.dragging)

        this.unbindSwipeMove()
        this.unbindSwipeEnd()

        Components.Animation.after(() => {
          Components.Run.init()
          Components.Anchors.unprevent().attach()
        })

        Components.Callbacks.call(Glide.settings.swipeEnd)
      }
    },

    /**
   * Binds swipe's starting event.
   *
   * @return {Void}
   */
    bindSwipeStart () {
      if (Glide.settings.swipeThreshold) {
        Events.on(START_EVENTS[0], Components.Html.wrapper, this.start.bind(this))
      }

      if (Glide.settings.dragThreshold) {
        Events.on(START_EVENTS[1], Components.Html.wrapper, this.start.bind(this))
      }
    },

    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart () {
      Events.off(START_EVENTS[0], Components.Html.wrapper)
      Events.off(START_EVENTS[1], Components.Html.wrapper)
    },

    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove () {
      Events.on(MOVE_EVENTS, Components.Html.wrapper, this.move.bind(this))
    },

    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove () {
      Events.off(MOVE_EVENTS, Components.Html.wrapper)
    },

    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd () {
      Events.on(END_EVENTS, Components.Html.wrapper, this.end.bind(this))
    },

    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd () {
      Events.off(END_EVENTS, Components.Html.wrapper)
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
      if (MOUSE_EVENTS.includes(event.type)) {
        return Glide.settings.dragThreshold
      }

      return Glide.settings.swipeThreshold
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

  return SWIPE
}
