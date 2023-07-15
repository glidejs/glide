import mutator from '../mutator/index'

export default function (Glide, Components, Events) {
  const Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      const transform = mutator(Glide, Components).mutate(value)
      const translate3d = `translate3d(${-1 * transform}px, 0px, 0px)`

      Components.Html.wrapper.style.mozTransform = translate3d // needed for supported Firefox 10-15
      Components.Html.wrapper.style.webkitTransform = translate3d // needed for supported Chrome 10-35, Safari 5.1-8, and Opera 15-22
      Components.Html.wrapper.style.transform = translate3d
    },

    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove () {
      Components.Html.wrapper.style.transform = ''
    },

    /**
     * @return {number}
     */
    getStartIndex () {
      const length = Components.Sizes.length
      const index = Glide.index
      const perView = Glide.settings.perView

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView)
      }

      // "modulo length" converts an index that equals length to zero
      return (index + perView) % length
    },

    /**
     * @return {number}
     */
    getTravelDistance () {
      const travelDistance = Components.Sizes.slideWidth * Glide.settings.perView

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1
      }

      return travelDistance
    }
  }

  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */
  Events.on('move', (context) => {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement)
    }

    Components.Transition.after(() => {
      Events.emit('translate.jump')

      Translate.set(Components.Sizes.slideWidth * Glide.index)
    })

    const startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex()
    return Translate.set(startWidth - Components.Translate.getTravelDistance())
  })

  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', () => {
    Translate.remove()
  })

  return Translate
}
