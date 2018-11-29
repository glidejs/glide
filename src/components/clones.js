import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount () {
      this.items = []

      if (Glide.isType('carousel')) {
        this.items = this.collect()
      }
    },

    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    collect (items = []) {
      let { slides } = Components.Html
      let { perView, classes } = Glide.settings

      let peekIncrementer = +!!Glide.settings.peek
      let part = perView + peekIncrementer
      let start = slides.slice(0, part)
      let end = slides.slice(-part)

      for (let r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
        for (let i = 0; i < start.length; i++) {
          let clone = start[i].cloneNode(true)

          clone.classList.add(classes.cloneSlide)

          items.push(clone)
        }

        for (let i = 0; i < end.length; i++) {
          let clone = end[i].cloneNode(true)

          clone.classList.add(classes.cloneSlide)

          items.unshift(clone)
        }
      }

      return items
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append () {
      let { items } = this
      let { wrapper, slides } = Components.Html

      let half = Math.floor(items.length / 2)
      let prepend = items.slice(0, half).reverse()
      let append = items.slice(half, items.length)
      let width = `${Components.Sizes.slideWidth}px`

      for (let i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i])
      }

      for (let i = 0; i < prepend.length; i++) {
        wrapper.insertBefore(prepend[i], slides[0])
      }

      for (let i = 0; i < items.length; i++) {
        items[i].style.width = width
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
        Components.Html.wrapper.removeChild(items[i])
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
