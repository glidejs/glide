/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Glide.Arrows}
 */

var Arrows = function (Glide, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Module() {
		this.build();
		this.bind();
	}


	/**
	 * Build
	 * arrows DOM
	 */
	Module.prototype.build = function () {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.arrows);
		this.items = this.wrapper.children();

	};


	/**
	 * Hide arrow
	 */
	Module.prototype.hide = function (type) {

		return this.items.filter('.' + Glide.options.classes['arrow' + Core.Helper.capitalise(type)])
			.css({ opacity: 0, visibility: 'hidden' })
			.siblings().css({ opacity: 1, visibility: 'visible' })
			.end();

	};


	/**
	 * Show arrows
	 */
	Module.prototype.show = function () {

		return this.items.css({ opacity: 1, visibility: 'visible' });

	};


	/**
	 * Bind
	 * arrows events
	 */
	Module.prototype.bind = function () {

		return this.items.on('click.glide touchstart.glide', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.pause();
				Core.Run.make($(this).data('glide-dir'));
				Core.Animation.after(function () {
					Core.Run.play();
				});
			}
		});

	};


	/**
	 * Unbind
	 * arrows events
	 */
	Module.prototype.unbind = function () {
		return this.items.unbind('click.glide touchstart.glide');
	};


	// @return Module
	return new Module();

};
