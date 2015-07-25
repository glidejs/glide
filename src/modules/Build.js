/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @param {Glide} Glide
 * @param {Core} Core
 * @return {Module}
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
		// Set bullet active class
		Core.Bullets.active();

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

		var translate = Glide.width * (Glide.current - 1);
		var shift = Core.Clones.shift - Glide.options.paddings;

		// If we on first slide
		if (Core.Run.isStart()) {
			// Hide prev arrow
			Core.Arrows.disable('prev');
		}
		// If we on last slide
		else if (Core.Run.isEnd()) {
			// Double and absolute shift
			shift = Math.abs(shift * 2);
			Core.Arrows.disable('next');
		}
		// Otherwise we on the one of inner slides
		else {
			// Absolute shift
			shift = Math.abs(shift);
		}

		// Apply slides width
		Glide.slides.width(Glide.width);

		// Apply translate
		Glide.track.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', translate - shift),
		});

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		// Update shift for carusel type
		Core.Clones.shift = (Glide.width * Glide.clones.length/2) - Glide.width;

		// Append clones
		Core.Clones.append();

		// Apply slides width
		Glide.slides.width(Glide.width);

		// Apply translate
		Glide.track.css({
			'width': (Glide.width * Glide.length) + Core.Clones.growth,
			'transform': Core.Translate.set('x',
				(Glide.width * Glide.current) - (Glide.options.paddings - Core.Clones.shift)
			),
		});

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function() {

		// Show up current slide
		Glide.slides.eq(Glide.current - 1)
			.css('opacity', 1)
			.siblings().css('opacity', 0);

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
