/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Glide.Arrows}
 */

Glide.Arrows = (function (self) {


	/**
	 * Init arrows
	 * build DOM and bind events
	 */
	self.init = function () {
		self.build();
		self.bind();
	};


	/**
	 * Build
	 * arrows DOM
	 */
	self.build = function () {

		self.wrapper = Glide.Core.slider.children('.' + Glide.options.classes.arrows);
		self.items = self.wrapper.children();

	};


	/**
	 * Bind
	 * arrows events
	 */
	self.bind = function () {

		self.items.on('click', function(e){
			if (!Glide.Events.disabled) {
				Glide.Animation.run($(this).data('glide-dir'));
			}
		});

	};


	// @return module
	return self;


}(Glide.Arrows || {}));
