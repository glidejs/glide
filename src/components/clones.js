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
     * @return {[]}
     */
    collect (items = []) {
      const { slides } = Components.Html
      const { perView, classes, cloningRatio } = Glide.settings

      if (slides.length > 0) {
        const peekIncrementer = +!!Glide.settings.peek
        const cloneCount = perView + peekIncrementer + Math.round(perView / 2)
        const append = slides.slice(0, cloneCount).reverse()
        const prepend = slides.slice(cloneCount * -1)

        for (let r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (let i = 0; i < append.length; i++) {
            const clone = append[i].cloneNode(true)

            clone.classList.add(classes.slide.clone)

            items.push(clone)
          }

          for (let i = 0; i < prepend.length; i++) {
            const clone = prepend[i].cloneNode(true)

            clone.classList.add(classes.slide.clone)

            items.unshift(clone)
          }
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
      const { items } = this
      const { wrapper, slides } = Components.Html

      const half = Math.floor(items.length / 2)
      const prepend = items.slice(0, half).reverse()
      const append = items.slice(half * -1).reverse()
      const width = `${Components.Sizes.slideWidth}px`

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
     * Gets additional dimensions value caused by clones.
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
