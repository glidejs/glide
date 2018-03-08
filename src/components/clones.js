import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount () {
      this.items = []

      if (Glide.isType('carousel')) {
        this.pattern = this.map()
        this.items = this.collect()
      }
    },

    /**
     * Generate pattern of the cloning.
     *
     * @return {Void}
     */
    map (pattern = []) {
      let perView = Glide.settings.perView
      let length = Components.Html.slides.length

      // Repeat creating pattern based on the ratio calculated
      // by number in `perView` per actual number of slides.
      for (let r = 0; r < Math.max(1, Math.floor(perView / length)); r++) {
        // Fill pattern with indexes of slides at the beginning of track.
        for (let i = 0; i <= length - 1; i++) {
          pattern.push(`${i}`)
        }

        // Fill pattern with indexes of slides from the end of track.
        for (let i = length - 1; i >= 0; i--) {
          pattern.unshift(`-${i}`)
        }
      }

      return pattern
    },

    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    collect (items = []) {
      let { pattern } = this

      for (let i = 0; i < pattern.length; i++) {
        let clone = Components.Html.slides[Math.abs(pattern[i])].cloneNode(true)

        clone.classList.add(Glide.settings.classes.cloneSlide)

        items.push(clone)
      }

      return items
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append () {
      let { items, pattern } = this

      for (let i = 0; i < items.length; i++) {
        let item = items[i]

        item.style.width = `${Components.Sizes.slideWidth}px`

        // Append clone if pattern position is positive.
        // Prepend clone if pattern position is negative.
        if (pattern[i][0] === '-') {
          Components.Html.wrapper.insertBefore(item, Components.Html.slides[0])
        } else {
          Components.Html.wrapper.appendChild(item)
        }
      }
    },

    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove () {
      let { items } = this

      for (let i = 0; i < items.length; i++) {
        items[i].remove()
      }
    }
  }

  define(Clones, 'grow', {
    /**
     * Gets additional dimentions value caused by clones.
     *
     * @return {Number}
     */
    get () {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length
    }
  })

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('update', () => {
    Clones.remove()
    Clones.mount()
    Clones.append()
  })

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('build.before', () => {
    if (Glide.isType('carousel')) {
      Clones.append()
    }
  })

  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */
  Events.on('destroy', () => {
    Clones.remove()
  })

  return Clones
}
