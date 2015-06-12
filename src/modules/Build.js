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
		this.init();
	}


	/**
	 * Init slider build
	 * @return {[type]} [description]
	 */
	Module.prototype.init = function() {
		// Set slides height
		Core.Height.set();
		// Build proper slider type
		this[Glide.options.type]();
		// Set slide active class
		this.active();
		// Set bullet active class
		Core.Bullets.active();
		// Set active trigger
		this.activeTrigger();
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

		Glide.track.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.current - 1)),
		});

		Glide.slides.width(Glide.width);

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		Glide.track
			.append(Glide.clones[0].width(Glide.width))
			.prepend(Glide.clones[1].width(Glide.width))
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.current),
			});

		Glide.slides.width(Glide.width);

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function () {

		// Force height set
		// Core.Height.set(true);
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


	/**
	 * Set active trigger
	 */
	Module.prototype.activeTrigger = function () {

		this.triggers = $('[data-glide-trigger]');

		if (this.triggers.length) {

			$('[data-glide-dir]')
				.not('.' + Glide.options.classes.bullet)
				.removeClass(Glide.options.classes.active);

			$('[data-glide-dir="=' + Glide.current + '"]')
				.not('.' + Glide.options.classes.bullet)
				.addClass(Glide.options.classes.active);

		}

	};


	// @return Module
	return new Module();

};
