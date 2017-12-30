import { define } from '../utils/object'
import { listen } from '../core/event/events-bus'

export default function (Glide, Components, Events) {
  let pattern = []

  const CLONES = {
    mount () {
      this.items = []

      this.map()
      this.collect()
    },

    /**
     * Generate pattern of the cloning.
     *
     * @return {Void}
     */
    map () {
      // We should have one more slides clones
      // than we have slides per view.
      let total = Glide.settings.perView + 1

      for (let i = 0; i < total; i++) {
        pattern.push(i)
      }

      for (let i = total - 1; i >= 0; i--) {
        pattern.push(-(Components.Html.slides.length - 1) + i)
      }
    },

    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    collect () {
      let clone = null

      for (let i = 0; i < pattern.length; i++) {
        clone = Components.Html.slides[Math.abs(pattern[i])].cloneNode(true)

        clone.classList.add(Glide.settings.classes.cloneSlide)

        this.items.push(clone)
      }
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append () {
      var item = null

      for (let i = 0; i < this.items.length; i++) {
        item = this.items[i]

        item.style.width = Components.Sizes.slideWidth

        // Append clone if pattern position is positive.
        // Prepend clone if pattern position is negative.
        if (pattern[i] >= 0) {
          Components.Html.wrapper.appendChild(item)
        } else {
          Components.Html.wrapper.insertBefore(item, Components.Html.slides[0])
        }
      }
    },

    /**
     * Remove all cloned slides.
     *
     * @return {self}
     */
    remove () {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].remove()
      }

      return this
    }
  }

  define(CLONES, 'grow', {
    /**
     * Gets additional dimentions value caused by clones.
     *
     * @return {Number}
     */
    get () {
      if (Glide.isType('carousel')) {
        return Components.Sizes.slideWidth * CLONES.items.length
      }

      return 0
    }
  })

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  listen('build.before', () => {
    if (Glide.isType('carousel')) {
      CLONES.append()
    }
  })

  return CLONES
}
