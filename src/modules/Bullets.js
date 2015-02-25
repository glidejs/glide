/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Glide.Bullets}
 */

var Bullets = function (Glide, Core) {

	function Module() {

		this.build();
		this.bind();

	}

	/**
	 * Build
	 * bullets DOM
	 */
	Module.prototype.build = function () {

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
	 * Bind
	 * bullets events
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
