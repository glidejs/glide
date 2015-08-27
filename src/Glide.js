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
		autoplay: 4000,
		type: 'carousel',
		mode: 'horizontal',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		touchDistance: 80,
		dragDistance: 120,
		animationDuration: 400,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		throttle: 16,
		autoheight: false,
		paddings: 0,
		centered: true,
		classes: {
			base: 'glide',
			wrapper: 'glide__wrapper',
			track: 'glide__track',
			slide: 'glide__slide',
			arrows: 'glide__arrows',
			arrow: 'glide__arrow',
			arrowNext: 'next',
			arrowPrev: 'prev',
			bullets: 'glide__bullets',
			bullet: 'glide__bullet',
			clone: 'clone',
			active: 'active',
			dragging: 'dragging',
			disabled: 'disabled'
		},
		beforeInit: function(slider) {},
		afterInit: function(i, el) {},
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
		swipeStart: function(i, el) {},
		swipeEnd: function(i, el) {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);
	this.current = parseInt(this.options.startAt);
	this.element = element;

	// Collect DOM
	this.collect();
	// Init values
	this.setup();

	// Call before init callback
	this.options.beforeInit(this.slider);

	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var Engine = new Core(this, {
		Helper: Helper,
		Translate: Translate,
		Transition: Transition,
		Run: Run,
		Animation: Animation,
		Clones: Clones,
		Arrows: Arrows,
		Bullets: Bullets,
		Height: Height,
		Build: Build,
		Events: Events,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.current, this.slides.eq(this.current - 1));

	// api return
	return Engine.Api.instance();

};


/**
 * Collect DOM
 * and set classes
 */
Glide.prototype.collect = function() {
	var options = this.options;
	var classes = options.classes;

	this.slider = this.element.addClass(classes.base + '--' + options.type).addClass(classes.base + '--' + options.mode);
	this.track = this.slider.find('.' + classes.track);
	this.wrapper = this.slider.find('.' + classes.wrapper);
	this.slides = this.track.find('.' + classes.slide).not('.' + classes.clone);
};


/**
 * Setup properties and values
 */
Glide.prototype.setup = function() {
	var modeMap = {
		horizontal: ['width', 'x'],
		vertical: ['height', 'y'],
	};

	this.size = modeMap[this.options.mode][0];
	this.axis = modeMap[this.options.mode][1];
	this.length = this.slides.length;

	this.paddings = this.getPaddings();
	this[this.size] = this.getSize();
};


/**
 * Normalize paddings option value
 * Parsing string (%, px) and numbers
 * @return {Number} normalized value
 */
Glide.prototype.getPaddings = function() {

	var option = this.options.paddings;

	if(typeof option === 'string') {

		var normalized = parseInt(option, 10);
		var isPercentage = option.indexOf('%') >= 0;

		if (isPercentage) return parseInt(this.slider[this.size]() * (normalized/100));
		else return normalized;

	}

	return option;

};


/**
 * Get slider width updated by addtional options
 * @return {Number} width value
 */
Glide.prototype.getSize = function() {
	return this.slider[this.size]() - (this.paddings * 2);
};