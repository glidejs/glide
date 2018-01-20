import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  let pattern = []

  const CLONES = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount () {
      this.items = []

      if (Glide.isType('carousel')) {
        this.map()
        this.collect()
      }
    },

    /**
     * Generate pattern of the cloning.
     *
     * @return {Void}
     */
    map () {
      // We should have one more slides clones, than we have slides per view.
      // This give us confidence that viewport will always filled with slides.
      let total = Glide.settings.perView + 1

      // Fill pattern with indexes of slides at the beginning of track.
      for (let i = 0; i < total; i++) {
        pattern.push(i)
      }

      // Fill pattern with indexes of slides from the end of track.
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
      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i]

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
  Events.listen('build.before', () => {
    if (Glide.isType('carousel')) {
      CLONES.append()
    }
  })

  return CLONES
}
