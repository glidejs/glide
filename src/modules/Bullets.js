/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Glide.Bullets}
 */

var Bullets = function(Glide, Core) {


	/**
	 * Bullets Module Constructor
	 */
	function Module() {
		this.init();
	}

	Module.prototype.init = function() {
		this.build();
		this.bind();
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
			$('<li>', {
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
	 * Bind
	 * bullets events
	 */
	Module.prototype.bind = function() {

		this.items.on('click.glide touchstart.glide', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.pause();
				Core.Run.make($(this).data('glide-dir'));
				Core.Animation.after(function() {
					Core.Run.play();
				});
			}
		});

	};


	/**
	 * Unbind
	 * bullets events
	 */
	Module.prototype.unbind = function() {
		return this.items.off('click.glide touchstart.glide');
	};


	// @return Module
	return new Module();

};
