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
		// Build proper slider type
		this[Glide.options.type]();
		// Set slide active class
		this.active();
		// Set bullet active class
		Core.Bullets.active();
	};


	/**
	 * Remove slides
	 * clones
	 */
	Module.prototype.removeClones = function() {
		return Glide.wrapper.find('.clone').remove();
	};


	/**
	 * Build Slider type
	 */
	Module.prototype.slider = function() {

		// Hide next/prev arrow when on the end/start
		if (Glide.current === Glide.length) Core.Arrows.hide('next');
		if (Glide.current === 1) Core.Arrows.hide('prev');

		Glide.wrapper.css({
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

		Glide.wrapper
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

		Glide.slides.eq(Glide.current - 1)
			.css('opacity', 1 )
			.siblings().css('opacity', 0);

	};


	/**
	 * Set active class
	 * to current slide
	 */
	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};


	// @return Module
	return new Module();

};
