/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Glide.Bullets}
 */

Glide.Bullets = (function (self) {


	/**
	 * Init bullets
	 * build DOM and bind events
	 */
	self.init = function () {
		self.build();
		self.bind();
	};


	/**
	 * Build
	 * bullets DOM
	 */
	self.build = function () {

		self.wrapper = Glide.Core.slider.children('.' + Glide.options.classes.bullets);

		for(var i = 1; i <= Glide.Core.length; i++) {
			$('<li>', {
				'class': Glide.options.classes.bullet,
				'data-glide-dir': '=' + i
			}).appendTo(self.wrapper);
		}

		self.items = self.wrapper.children();

	};


	/**
	 * Bind
	 * bullets events
	 */
	self.bind = function () {

		self.items.on('click', function(){
			if (!Glide.Events.disabled) {
				Glide.Animation.run($(this).data('glide-dir'));
			}
		});

	};


	// @return module
	return self;


}(Glide.Bullets || {}));
