import Html from './html'
import Run from './run'
import Core from './core'
import Anchors from './anchors'
import Callbacks from './callbacks'
import Animation from './animation'
import Dimensions from './dimensions'
import Transition from './transition'

import Binder from '../binder'

const START_EVENTS = ['touchstart', 'mousedown']
const MOVE_EVENTS = ['touchmove', 'mousemove']
const END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave']
const MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']

let swipeSin = 0
let swipeStartX = 0
let swipeStartY = 0

class Swipe extends Binder {
  /**
   * Constructs swipe component.
   */
  constructor () {
    super()

    this.dragging = false
  }

  /**
   * Initializes swipe bindings.
   *
   * @return {Void}
   */
  init () {
    this.bindSwipeStart()
  }

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

      Run.stop()
      Callbacks.call(Core.settings.swipeStart)
    }
  }

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

      if (swipeSin * 180 / Math.PI < Core.settings.touchAngle) {
        Animation.make(subExSx * parseFloat(Core.settings.touchRatio))
      }

      if (swipeSin * 180 / Math.PI < Core.settings.touchAngle) {
        event.stopPropagation()
        event.preventDefault()

        Html.wrapper.classList.add(Core.settings.classes.dragging)
      } else {
        return
      }

      Anchors.prevent().detach()
    }
  }

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
      let steps = Math.round(swipeDistance / Dimensions.slideWidth)

      if (swipeDistance > threshold && swipeDeg < Core.settings.touchAngle) {
        // While swipe is positive and greater than threshold move backward.
        if (Core.settings.perTouch) {
          steps = Math.min(steps, parseInt(Core.settings.perTouch))
        }

        Run.make(`<${steps}`)
      } else if (
        swipeDistance < -threshold &&
        swipeDeg < Core.settings.touchAngle
      ) {
        // While swipe is negative and lower than negative threshold move forward.
        if (Core.settings.perTouch) {
          steps = Math.max(steps, -parseInt(Core.settings.perTouch))
        }

        Run.make(`>${steps}`)
      } else {
        // While swipe don't reach distance apply previous transform.
        Animation.make()
      }

      Html.wrapper.classList.remove(Core.settings.classes.dragging)

      this.unbindSwipeMove()
      this.unbindSwipeEnd()

      Animation.after(() => {
        Run.init()
        Anchors.unprevent().attach()
      })
      Callbacks.call(Core.settings.swipeEnd)
    }
  }

  /**
 * Binds swipe's starting event.
 *
 * @return {Void}
 */
  bindSwipeStart () {
    if (Core.settings.swipeThreshold) {
      this.on(START_EVENTS[0], Html.wrapper, this.start.bind(this))
    }

    if (Core.settings.dragThreshold) {
      this.on(START_EVENTS[1], Html.wrapper, this.start.bind(this))
    }
  }

  /**
   * Unbinds swipe's starting event.
   *
   * @return {Void}
   */
  unbindSwipeStart () {
    this.off(START_EVENTS[0], Html.wrapper)
    this.off(START_EVENTS[1], Html.wrapper)
  }

  /**
   * Binds swipe's moving event.
   *
   * @return {Void}
   */
  bindSwipeMove () {
    this.on(MOVE_EVENTS, Html.wrapper, this.move.bind(this))
  }

  /**
   * Unbinds swipe's moving event.
   *
   * @return {Void}
   */
  unbindSwipeMove () {
    this.off(MOVE_EVENTS, Html.wrapper)
  }

  /**
   * Binds swipe's ending event.
   *
   * @return {Void}
   */
  bindSwipeEnd () {
    this.on(END_EVENTS, Html.wrapper, this.end.bind(this))
  }

  /**
   * Unbinds swipe's ending event.
   *
   * @return {Void}
   */
  unbindSwipeEnd () {
    this.off(END_EVENTS, Html.wrapper)
  }

  touches (event) {
    if (MOUSE_EVENTS.includes(event.type)) {
      return event
    }

    return event.touches[0] || event.changedTouches[0]
  }

  /**
   * Gets value of minimum swipe distance.
   * Returns value based on event type.
   *
   * @return {Number}
   */
  threshold (event) {
    if (MOUSE_EVENTS.includes(event.type)) {
      return Core.settings.dragThreshold
    }

    return Core.settings.swipeThreshold
  }

  /**
   * Enables swipe event.
   *
   * @return {self}
   */
  enable () {
    this.dragging = false

    Transition.enable()

    return this
  }

  /**
   * Disables swipe event.
   *
   * @return {self}
   */
  disable () {
    this.dragging = true

    Transition.disable()

    return this
  }

  /**
   * Gets value of the dragging status.
   *
   * @return {Boolean}
   */
  get enabled () {
    return !(Core.disabled && this.dragging)
  }
}

export default new Swipe()
