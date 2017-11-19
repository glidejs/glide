/**
 * Bullets module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Bullets}
 */
var Bullets = function (Glide, Core) {
  /**
     * Bullets constructor.
     */
  function Bullets () {
    this.init()
        this.bind()
    }

  /**
     * Init bullets builder.
     *
     * @return {self}
     */
  Bullets.prototype.init = function () {
    this.build()
        this.active()

        return this
    };

  /**
     * Get Html and setup bullets.
     *
     * @return {Void}
     */
  Bullets.prototype.build = function () {
    // Get bullets wrapper.
    this.wrapper = Glide.slider.children('.' + Glide.options.classes.bullets)

        // Set class and direction to each bullet.
        for (var i = 1; i <= Glide.length; i++) {
      $('<button>', {
        'class': Glide.options.classes.bullet,
        'data-glide-dir': '=' + i
      }).appendTo(this.wrapper)
        }

    // Get all bullets.
    this.items = this.wrapper.children()

    };

  /**
     * Handle active class. Adding and removing active class.
     *
     * @return {Void}
     */
  Bullets.prototype.active = function () {
    this.items.eq(Glide.current - 1)
      .addClass('active')
      .siblings().removeClass('active')
    };

  /**
     * Delete all bullets.
     *
     * @return {self}
     */
  Bullets.prototype.remove = function () {
    this.items.remove()

        return this
    };

  /**
     * Bullet click event.
     *
     * @param {Object} event
     */
  Bullets.prototype.click = function (event) {
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
     * Bullets hover event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Bullets.prototype.hover = function (event) {
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
     * Bind bullets events.
     *
     * @return {Void}
     */
    Bullets.prototype.bind = function () {
    this.wrapper
      .on('click.glide touchstart.glide', 'button', this.click)
      .on('mouseenter.glide', 'button', this.hover)
      .on('mouseleave.glide', 'button', this.hover)
    };

  /**
     * Unbind bullets events.
     *
     * @return {Void}
     */
  Bullets.prototype.unbind = function () {
    this.wrapper
      .off('click.glide touchstart.glide', 'button')
      .off('mouseenter.glide', 'button')
      .off('mouseleave.glide', 'button')
    };

  // Return class.
  return new Bullets()

};
