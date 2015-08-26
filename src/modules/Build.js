/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @return {Build}
 */

var Build = function(Glide, Core) {

	// Build Module Constructor
	function Module() {
		this.init();
	}


	/**
	 * Init slider build
	 * @return {[type]} [description]
	 */
	Module.prototype.init = function() {
		// Build proper slider type
		this[Glide.options.type]();
		// Set slide active class
		this.active();

		// Set slides height
		Core.Height.set();
	};


	/**
	 * Check if slider type is
	 * @param  {string} name Type name to check
	 * @return {boolean}
	 */
	Module.prototype.isType = function(name) {
		return Glide.options.type === name;
	};


	/**
	 * Build Slider type
	 */
	Module.prototype.slider = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Apply slides width
		Glide.slides[Glide.size](Glide[Glide.size]);
		Core.Height.set(true);
		// Apply translate
		Glide.track.css(Glide.size, Glide[Glide.size] * Glide.length);
		// Go to startup position
		Core.Animation.make();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Update shift for carusel type
		Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length/2) - Glide[Glide.size];
		// Apply slides width
		Glide.slides[Glide.size](Glide[Glide.size]);
		// Apply translate
		Glide.track.css(Glide.size, (Glide[Glide.size] * Glide.length) + Core.Clones.getGrowth());
		Core.Height.set(true);
		// Go to startup position
		Core.Animation.make();
		// Append clones
		Core.Clones.append();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Go to startup position
		Core.Animation.make();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Set active class
	 * to current slide
	 */
	Module.prototype.active = function() {

		Glide.slides
			.eq(Glide.current - 1).addClass(Glide.options.classes.active)
			.siblings().removeClass(Glide.options.classes.active);

	};

	// @return Module
	return new Module();

};
