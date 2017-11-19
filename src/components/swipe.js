import Html from './html'
import Run from './run'
import Core from './core'
import Anchors from './anchors'
import Callbacks from './callbacks'
import Animation from './animation'
import Dimensions from './dimensions'
import Transition from './transition'

import Binder from '../binder'

import debounce from '../utils/debounce'

const START_EVENTS = ['touchstart', 'mousedown']
const MOVE_EVENTS = ['touchmove', 'mousemove']
const END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave']
const MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']

let limiter = 0
let distance = 0
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
      distance = swipe.pageX - swipeStartX

      if ((swipeSin * 180 / Math.PI) < 45) {
        Animation.make(subExSx)
      }

      if ((swipeSin * 180 / Math.PI) < 45) {
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
      let limiter = this.limiter(event)

      this.enable()

      let swipeDistance = swipe.pageX - swipeStartX
      let swipeDeg = swipeSin * 180 / Math.PI
      let steps = Math.round(swipeDistance / Dimensions.slideWidth)

      if (swipeDistance > limiter && swipeDeg < 45) {
        // While swipe is positive and greater than
        // distance set in options move backward.
        Run.make(`<${steps}`)
      } else if (swipeDistance < -limiter && swipeDeg < 45) {
        // While swipe is negative and lower than negative
        // distance set in options move forward.
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
    if (Core.settings.swipeDistance) {
      this.on(START_EVENTS[0], Html.wrapper, this.start.bind(this))
    }

    if (Core.settings.dragDistance) {
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
  limiter (event) {
    if (MOUSE_EVENTS.includes(event.type)) {
      return Core.settings.dragDistance
    }

    return Core.settings.swipeDistance
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
