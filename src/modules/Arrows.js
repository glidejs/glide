/**
 * Arrows module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Arrows}
 */
var Arrows = function (Glide, Core) {
  /**
     * Arrows constructor.
     */
  function Arrows () {
    this.build()
        this.bind()
    }

  /**
     * Build arrows. Gets Html elements.
     *
     * @return {Void}
     */
  Arrows.prototype.build = function () {
    this.wrapper = Glide.slider.find('.' + Glide.options.classes.arrows)
        this.items = this.wrapper.children()
    };

  /**
     * Disable next/previous arrow and enable another.
     *
     * @param {String} type
     * @return {Void}
     */
  Arrows.prototype.disable = function (type) {
    var classes = Glide.options.classes

        if (!type) {
      return this.disableBoth()
        }

    this.items.filter('.' + classes['arrow' + Core.Helper.capitalise(type)])
      .unbind('click.glide touchstart.glide')
      .addClass(classes.disabled)
      .siblings()
      .bind('click.glide touchstart.glide', this.click)
      .bind('mouseenter.glide', this.hover)
      .bind('mouseleave.glide', this.hover)
      .removeClass(classes.disabled)
    };

  /**
     * Disable both arrows.
     *
     * @return {Void}
     */
  Arrows.prototype.disableBoth = function () {
    this.items
      .unbind('click.glide touchstart.glide')
      .addClass(Glide.options.classes.disabled)
    };

  /**
     * Show both arrows.
     *
     * @return {Void}
     */
  Arrows.prototype.enable = function () {
    this.bind()

        this.items.removeClass(Glide.options.classes.disabled)
    };

  /**
     * Arrow click event.
     *
     * @param {Object} event
     * @return {Void}
     */
  Arrows.prototype.click = function (event) {
    event.preventDefault()

        if (!Core.Events.disabled) {
      Core.Run.pause()
            Core.Run.make($(this).data('glide-dir'))
            Core.Animation.after(function () {
        Core.Run.play()
            })
        }
  }

    /**
     * Arrows hover event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Arrows.prototype.hover = function (event) {
    if (!Core.Events.disabled) {
      switch (event.type) {
        // Start autoplay on mouse leave.
        case 'mouseleave':
          Core.Run.play()
                    break;
          // Pause autoplay on mouse enter.
        case 'mouseenter':
          Core.Run.pause()
                    break;
      }
    }
  }

    /**
     * Bind arrows events.
     *
     * @return {Void}
     */
    Arrows.prototype.bind = function () {
    this.items
      .on('click.glide touchstart.glide', this.click)
      .on('mouseenter.glide', this.hover)
      .on('mouseleave.glide', this.hover)
    };

  /**
     * Unbind arrows events.
     *
     * @return {Void}
     */
  Arrows.prototype.unbind = function () {
    this.items
      .off('click.glide touchstart.glide')
      .off('mouseenter.glide')
      .off('mouseleave.glide')
    };

  // Return class.
  return new Arrows()

};
