/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Glide.Arrows}
 */

var Arrows = function (Glide, Core) {

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
	 * Bind
	 * arrows events
	 */
	Module.prototype.bind = function () {

		this.items.on('click', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Animation.run($(this).data('glide-dir'));
			}
		});

	};

	return new Module();

};
