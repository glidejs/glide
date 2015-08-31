/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Bullets}
 */

var Bullets = function(Glide, Core) {


	/**
	 * Bullets Module Constructor
	 */
	function Module() {
		this.init();
		this.bind();
	}

	Module.prototype.init = function() {
		this.build();
		this.active();

		return this;
	};

	/**
	 * Build
	 * bullets DOM
	 */
	Module.prototype.build = function() {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.bullets);

		for(var i = 1; i <= Glide.length; i++) {
			$('<button>', {
				'class': Glide.options.classes.bullet,
				'data-glide-dir': '=' + i
			}).appendTo(this.wrapper);
		}

		this.items = this.wrapper.children();

	};


	/**
	 * Handle active class
	 * Adding and removing active class
	 */
	Module.prototype.active = function() {
		return this.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');
	};


	/**
	 * Delete all bullets
	 */
	Module.prototype.remove = function() {
		this.items.remove();
		return this;
	};


	/**
	 * Bullet click
	 * @param  {Object} event
	 */
	Module.prototype.click = function(event) {
		event.preventDefault();

		if (!Core.Events.disabled) {
			Core.Run.pause();
			Core.Run.make($(this).data('glide-dir'));
			Core.Animation.after(function() {
				Core.Run.play();
			});
		}
	};


	/**
	 * Bind
	 * bullets events
	 */
	Module.prototype.bind = function() {
		return this.wrapper.on('click.glide touchstart.glide', 'button', this.click);
	};


	/**
	 * Unbind
	 * bullets events
	 */
	Module.prototype.unbind = function() {
		return this.wrapper.on('click.glide touchstart.glide', 'button');
	};


	// @return Module
	return new Module();

};
