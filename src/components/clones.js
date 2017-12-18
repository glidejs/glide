import { define } from '../utils/object'

export default function (Glide, Components) {
  let pattern = []

  const CLONES = {
    init () {
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
      for (let i = 0; i < Glide.settings.perView; i++) {
        pattern.push(i)
      }

      for (let i = Glide.settings.perView - 1; i >= 0; i--) {
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

        item.style.width = Components.Dimensions.slideWidth

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
    get () {
      if (Glide.isType('carousel')) {
        return Components.Dimensions.slideWidth * CLONES.items.length
      }
      
      return 0
    }
  })

  return CLONES
}
