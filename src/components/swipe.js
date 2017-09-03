import DOM from './dom'
import Run from './run'
import Core from './core'
import Build from './build'
import Animation from './animation'
import Transition from './transition'

import Binder from '../events/binder'

import debounce from '../utils/debounce'

const START_EVENTS = ['touchstart', 'mousedown']
const MOVE_EVENTS = ['touchmove', 'mousemove']
const END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave']

let swipeStartX = 0
let swipeStartY = 0
let swipeSin = 0
let distance = 0
let limiter = 0

class Swipe extends Binder {
  /**
   * Constructs swipe component.
   */
  constructor() {
    super()

    this.dragging = false
  }

  /**
   * Inits swipe bindings.
   *
   * @return {Void}
   */
  init() {
    this.bindSwipeStart()
  }

  start(event) {
    if (this.enabled) {
      let swipe = (event.type === 'mousedown') ? event : (event.touches[0] || event.changedTouches[0])

      this.disable()

      swipeSin = null
      swipeStartX = parseInt(swipe.pageX)
      swipeStartY = parseInt(swipe.pageY)

      this.bindSwipeMove()
      this.bindSwipeEnd()
    }
  }

  move(event) {
    if (this.enabled) {
      let swipe = (event.type === 'mousemove') ? event : (event.touches[0] || event.changedTouches[0])

      let subExSx = parseInt(swipe.pageX) - swipeStartX
      let subEySy = parseInt(swipe.pageY) - swipeStartY
      let powEX = Math.abs(subExSx << 2)
      let powEY = Math.abs(subEySy << 2)
      let swipeHypotenuse = Math.sqrt(powEX + powEY)
      let swipeCathetus = Math.sqrt(powEY)

      swipeSin = Math.asin(swipeCathetus / swipeHypotenuse)
      distance = swipe.pageX - swipeStartX

      if ((swipeSin * 180 / Math.PI) < 45) {
        Animation.make(subExSx);
      }

      if ((swipeSin * 180 / Math.PI) < 45) {
        event.stopPropagation()
        event.preventDefault()

        DOM.wrapper.classList.add(Core.settings.classes.dragging)
      } else {
        return
      }
    }
  }

  end(event) {
    if (this.enabled) {
      let swipe = (event.type === 'mouseup' || event.type === 'mouseleave') ? event : (event.touches[0] || event.changedTouches[0])

      let swipeDistance = swipe.pageX - swipeStartX
      let swipeDeg = swipeSin * 180 / Math.PI

      this.enable()

      if (Core.isType('slider')) {
        if (Run.isStart()) {
          if (swipeDistance > 0) {
              swipeDistance = 0
          }
        }

        if (Run.isEnd()) {
          if (swipeDistance < 0) {
            swipeDistance = 0
          }
        }
      }

      if (event.type === 'mouseup' || event.type === 'mouseleave') {
        limiter = Core.settings.dragDistance
      } else {
        limiter = Core.settings.swipeDistance
      }

      // While swipe is positive and greater than
      // distance set in options move backward.
      if (swipeDistance > limiter && swipeDeg < 45) {
        Run.make('<')
      }
      // While swipe is negative and lower than negative
      // distance set in options move forward.
      else if (swipeDistance < -limiter && swipeDeg < 45) {
        Run.make('>')
      }
      // While swipe don't reach distance apply previous transform.
      else {
        Animation.make()
      }

      // Remove dragging class and unbind events.
      DOM.wrapper.classList.remove(Core.settings.classes.dragging)

      this.unbindSwipeMove()
      this.unbindSwipeEnd()
    }
  }

    /**
   * Binds swipe's starting event.
   *
   * @return {Void}
   */
  bindSwipeStart() {
    if (Core.settings.swipeDistance) {
      this.on(START_EVENTS[0], DOM.wrapper, this.start.bind(this))
    }

    if (Core.settings.dragDistance) {
      this.on(START_EVENTS[1], DOM.wrapper, this.start.bind(this))
    }
  }

  /**
   * Unbinds swipe's starting event.
   *
   * @return {Void}
   */
  unbindSwipeStart() {
    this.off(START_EVENTS[0], DOM.wrapper)
    this.off(START_EVENTS[1], DOM.wrapper)
  }

  /**
   * Binds swipe's moving event.
   *
   * @return {Void}
   */
  bindSwipeMove() {
    this.on(MOVE_EVENTS, DOM.wrapper, this.move.bind(this))
  }

  /**
   * Unbinds swipe's moving event.
   *
   * @return {Void}
   */
  unbindSwipeMove() {
    this.off(MOVE_EVENTS, DOM.wrapper)
  }

  /**
   * Binds swipe's ending event.
   *
   * @return {Void}
   */
  bindSwipeEnd() {
    this.on(END_EVENTS, DOM.wrapper, this.end.bind(this))
  }

  /**
   * Unbinds swipe's ending event.
   *
   * @return {Void}
   */
  unbindSwipeEnd() {
    this.off(END_EVENTS, DOM.wrapper)
  }

  /**
   * Enables swipe event.
   *
   * @return {self}
   */
  enable() {
    this.dragging = false

    Transition.enable()

    return self
  }

  /**
   * Disables swipe event.
   *
   * @return {self}
   */
  disable() {
    this.dragging = true

    Transition.disable()

    return self
  }

  /**
   * Gets value of the dragging status.
   *
   * @return {Boolean}
   */
  get enabled() {
    return ! (Core.disabled && this.dragging)
  }
}

export default new Swipe()