import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  /**
   * Holds cloning order pattern under whose cloned slides are appended.
   *
   * @type {Array}
   */
  let pattern = []

  const Clones = {
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
      let perView = Glide.settings.perView
      let length = Components.Html.slides.length

      // Repet creating pattern based on the ratio calculated
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
     * @return {self}
     */
    remove () {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].remove()
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
