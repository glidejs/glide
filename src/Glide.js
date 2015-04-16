/**
 * --------------------------------
 * Glide Main
 * --------------------------------
 * Responsible for slider initiation,
 * extending defaults, returning public api
 * @param {jQuery} element Root element
 * @param {Object} options Plugin init options
 * @return {Glide}
 */

var Glide = function (element, options) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		autoplay: 2000,
		type: 'carousel',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		touchDistance: 60,
		animationDuration: 300,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		throttle: 30,
		classes: {
			base: 'glide',
			wrapper: 'glide__wrapper',
			slide: 'glide__slide',
			arrows: 'glide__arrows',
			arrow: 'glide__arrow',
			arrowNext: 'next',
			arrowPrev: 'prev',
			bullets: 'glide__bullets',
			bullet: 'glide__bullet'
		},
		beforeInit: function(el) {},
		afterInit: function(el) {},
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);
	this.current = parseInt(this.options.startAt);
	this.element = element;

	// Collect DOM
	this.collect();
	// Init values
	this.init();

	// Call before init callback
	this.options.beforeInit(this.slider);

	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var core = new Core(this, {
		Helper: Helper,
		Translate: Translate,
		Transition: Transition,
		Events: Events,
		Arrows: Arrows,
		Bullets: Bullets,
		Build: Build,
		Run: Run,
		Animation: Animation,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.slider);

	// api return
	return core.Api.instance();

};


/**
 * Collect DOM
 * and set classes
 */
Glide.prototype.collect = function() {
	this.slider = this.element.addClass(this.options.classes.base + '--' + this.options.type);
	this.wrapper = this.slider.children('.' + this.options.classes.wrapper);
	this.slides = this.wrapper.children('.' + this.options.classes.slide);
};


/**
 * Init
 * properties
 */
Glide.prototype.init = function() {
	this.width = this.slider.width();
	this.length = this.slides.length;
};
