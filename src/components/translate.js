import transformer from '../transformer/index'

export default function (Glide, Components, Events) {
  const Translate = {
    /**
     * Gets value of translate.
     *
     * @param  {Number} value
     * @return {String}
     */
    get (value) {
      return `translate3d(${-1 * value}px, 0px, 0px)`
    },

    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set (value) {
      let transform = transformer(Glide, Components).mutate(value)

      Components.Html.wrapper.style.transform = this.get(transform)
    },

    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove () {
      Components.Html.wrapper.style.transform = ''
    }
  }

  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */
  Events.listen('move', (context) => {
    let gap = Components.Gaps.value
    let length = Components.Sizes.length
    let width = Components.Sizes.slideWidth

    if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
      Components.Transition.after(() => {
        Events.emit('translate.jump')

        Translate.set(width * (length - 1))
      })

      return Translate.set(-width - (gap * length))
    }

    if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
      Components.Transition.after(() => {
        Events.emit('translate.jump')

        Translate.set(0)
      })

      return Translate.set((width * length) + (gap * length))
    }

    return Translate.set(context.movement)
  })

  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */
  Events.listen('destroy', () => {
    Translate.remove()
  })

  return Translate
}
