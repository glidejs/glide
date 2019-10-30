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
      let transform = mutator(Glide, Components, Events)(value)

      Components.Html.wrapper.style.transform = `translate3d(${-1 * transform}px, 0px, 0px)`
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
  Events.on('move', (context) => {
    let length = Components.Sizes.length
    let width = Components.Sizes.slideWidth

    if (Glide.settings.loop && Components.Run.isOffset('<')) {
      Components.Transition.after(() => {
        Events.emit('translate.jump')

        Translate.set(width * Glide.index)
      })

      return Translate.set(-(width * (length - Glide.index)))
    }

    if (Glide.settings.loop && Components.Run.isOffset('>')) {
      Components.Transition.after(() => {
        Events.emit('translate.jump')

        Translate.set(width * Glide.index)
      })

      return Translate.set(width * (length + Glide.index))
    }

    return Translate.set(context.movement)
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
