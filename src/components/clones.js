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
      let { settings } = Glide
      let slides = Components.Html.slides
      let start = slides.slice(0, settings.perView);
      let end = slides.slice(-settings.perView);

      for (let i = 0; i < start.length; i++) {
        let clone = start[i].cloneNode(true);

        clone.classList.add(settings.classes.cloneSlide);

        items.push(clone);
      }

      for (let i = 0; i < end.length; i++) {
        let clone = end[i].cloneNode(true);

        clone.classList.add(settings.classes.cloneSlide);

        items.unshift(clone);
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
      let half = Math.floor(items.length / 2)
      let prepend = items.slice(0, half).reverse()
      let append = items.slice(half, items.length)

      for (let i = 0; i < append.length; i++) {
        Components.Html.wrapper.appendChild(append[i])
      }

      for (let i = 0; i < prepend.length; i++) {
        Components.Html.wrapper.insertBefore(prepend[i], Components.Html.slides[0])
      }

      for (let i = 0; i < items.length; i++) {
        items[i].style.width = Components.Sizes.slideWidth + 'px'
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
