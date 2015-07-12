/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @param {Glide} Glide
 * @param {Core} Core
 * @return {Module}
 */

var Build = function (Glide, Core) {


	// Build Module Constructor
	function Module() {
		this.growth = 0;
		this.shift = 0;
		this.init();
	}


	/**
	 * Init slider build
	 * @return {[type]} [description]
	 */
	Module.prototype.init = function() {

		// Calculate width grow with clones
		this.growth = Glide.width * Glide.clones.length;

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
	 * Remove slides
	 * clones
	 */
	Module.prototype.removeClones = function() {
		return Glide.track.find('.clone').remove();
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

		// Hide next/prev arrow when on the end/start
		if (Core.Run.isStart()) Core.Arrows.disable('prev');
		if (Core.Run.isEnd()) Core.Arrows.disable('next');

		// Apply slides width
		Glide.slides.width(Glide.width);

		// Apply translate
		Glide.track.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.current - 1)),
		});

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		// Update shift for carusel type
		this.shift = (Glide.width * Glide.clones.length/2) - Glide.width;

		// Append clones
		this.appendClones();

		// Apply slides width
		Glide.slides.width(Glide.width);

		// Apply translate
		Glide.track.css({
			'width': (Glide.width * Glide.length) + this.growth,
			'transform': Core.Translate.set('x',
				(Glide.width * Glide.current) - (Glide.options.paddings - this.shift)
			),
		});

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function () {

		// Show up current slide
		Glide.slides.eq(Glide.current - 1)
			.css('opacity', 1)
			.siblings().css('opacity', 0);

	};


	/**
	 * Set active class
	 * to current slide
	 */
	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass(Glide.options.classes.active)
			.siblings().removeClass(Glide.options.classes.active);

	};


	Module.prototype.appendClones = function() {

		var clone;
		var pointer = Glide.clones.length / 2;
		var appendClones = Glide.clones.slice(0, pointer);
		var prependClones = Glide.clones.slice(pointer);

		for(clone in appendClones) {
			appendClones[clone]
				.width(Glide.width)
				.appendTo(Glide.track);
		}

		for(clone in prependClones) {
			prependClones[clone]
				.width(Glide.width)
				.prependTo(Glide.track);
		}

	};


	// @return Module
	return new Module();

};
