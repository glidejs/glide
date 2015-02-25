/*!
 * Glide.js
 * Version: 2.0.0
 * Simple, lightweight and fast jQuery slider
 * Author: @jedrzejchalubek
 * Site: http://http://glide.jedrzejchalubek.com/
 * Licensed under the MIT license
 */

;(function($, window, document, undefined){
/**
 * --------------------------------
 * Glide Animation
 * --------------------------------
 * Animation logic module
 * @return {Module}
 */

var Animation = function (Glide, Core) {


	function Module() {
		this.interval = 0;
		this.flag = 0;
		this.play();
	}


	/**
	 * Start autoplay animation
	 * Setup interval
	 */
	Module.prototype.play = function() {

		var that = this;

		if (Glide.options.autoplay) {
			this.interval = setInterval(function() {
				that.run('>');
			}, Glide.options.autoplay);
		}

		return this.interval;

	};


	/**
	 * Pasue autoplay animation
	 * Clear interval
	 */
	Module.prototype.pause = function() {
		if (Glide.options.autoplay) this.interval = clearInterval(this.interval);
		return this.interval;
	};


	/**
	 * Run move animation
	 * @param  {string} move Code in pattern {direction}{steps} eq. ">3"
	 */
	Module.prototype.run = function (move, callback) {

		var that = this;
		// Extract move direction
		var direction = move.substr(0, 1);
		// Extract move steps
		var steps = (move.substr(1)) ? move.substr(1) : 0;

		// Stop autoplay until hoverpause is not set
		if(!Glide.options.hoverpause) this.pause();
		// Disable events and call before transition callback
		Core.Events.disable().call(Glide.options.beforeTransition);

		// Based on direction
		switch(direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (Glide.current == Glide.length) Glide.current = 1, this.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (steps === '>') Glide.current = Glide.length;
				// Otherwise change normally
				else Glide.current = Glide.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(Glide.current == 1) Glide.current = Glide.length, this.flag = true;
				// When steps is not number, but '<'
				// scroll slider to start
				else if (steps === '<') Glide.current = 1;
				// Otherwise change normally
				else Glide.current = Glide.current - 1;
				break;

			case '=':
				// Jump to specifed slide
				Glide.current = parseInt(steps);
				break;

		}

		// Run actual translate animation
		this['run' + Core.Helper.capitalise(Glide.options.type)](direction);

		// When animation is done
		this.afterAnimation(function(){
			// Set active flags
			Core.Build.active();
			// Enable events and call callbacks
			Core.Events.enable().call(callback).call(Glide.options.afterTransition);
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) that.play();
		});

	};


	/**
	 * After transition callback
	 * @param  {Function} callback
	 * @return {Int}
	 */
	Module.prototype.afterAnimation = function(callback, steps) {
		return setTimeout(function(){
			callback();
		}, Glide.options.animationDuration + 10);
	};


	/**
	 * Run slider type animation
	 * @param {string} direction
	 */
	Module.prototype.runSlider = function (direction) {

		var translate = (Glide.current * Glide.width) - Glide.width;

		Glide.wrapper.css({
			'transition': Core.Transition.get('transform'),
			'transform': Core.Translate.get('x', translate)
		});

	};


	/**
	 * Run carousel type animation
	 * @param {string} direction
	 */
	Module.prototype.runCarousel = function (direction) {

		// Translate container
		var translate;

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (this.flag && direction === '<') {

			// Translate is 0 (left edge of wrapper)
			translate = 0;
			// Reset flag
			this.flag = false;

			// After offset animation is done,
			// clear transition and jump to last slide
			this.afterAnimation(function() {
				Glide.wrapper.css({
					'transition': Core.Transition.clear('transform'),
					'transform': Core.Translate.get('x', Glide.length * Glide.width)
				});
			});

		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		else if (this.flag && direction === '>') {

			// Translate is euqal wrapper width with offset
			translate = (Glide.length * Glide.width) + Glide.width;
			// Reset flag
			this.flag = false;

			// After offset animation is done,
			// clear transition and jump to first slide
			this.afterAnimation(function() {
				Glide.wrapper.css({
					'transition': Core.Transition.clear('transform'),
					'transform': Core.Translate.get('x', Glide.width)
				});
			});

		}


		/**
		 * While flag is not set
		 * make normal translate
		 */
		else {
			translate = (Glide.current * Glide.width);
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.wrapper.css({
			'transition': Core.Transition.get('transform'),
			'transform': Core.Translate.get('x', translate)
		});

	};


	/**
	 * Run slideshow type animation
	 * @param {string} direction
	 */
	Module.prototype.runSlideshow = function (direction) {

		Glide.slides.css({
			'transition': Core.Transition.get('opacity'),
		}).eq(Glide.current - 1).css({
			'opacity': '1'
		}).siblings().css('opacity', 0);

	};

	return new Module();

};
;/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

var Api = function (Glide, Core) {

	/**
	 * Construnct modules
	 * and inject Glide and Core as dependency
	 */
	function Module() {}

	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function () {

		return {

			/**
			 * Get current slide index
			 * @return {int}
			 */
			current: function() {
				return Glide.current;
			},

			/**
			 * Go to specifed slide
			 * @param  {String}   distance
			 * @param  {Function} callback
			 * @return {Core.Animation}
			 */
			go: function(distance, callback) {
				return Core.Animation.run(distance, callback);
			},

			/**
			 * Start autoplay
			 * @return {Core.Animation}
			 */
			play: function(){
				return Core.Animation.play();
			},

			/**
			 * Stop autoplay
			 * @return {Core.Animation}
			 */
			pause: function() {
				return Core.Animation.pause();
			}


		};

	};

	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Glide.Arrows}
 */

var Arrows = function (Glide, Core) {

	function Module() {

		this.build();
		this.bind();

	}

	/**
	 * Build
	 * arrows DOM
	 */
	Module.prototype.build = function () {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.arrows);
		this.items = this.wrapper.children();

	};


	/**
	 * Bind
	 * arrows events
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
;/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * Core logic module
 * @param {Glide} Glide
 * @param {Animation} Animation
 * @return {Module}
 */

var Build = function (Glide, Core) {

	function Module() {

		this.clones = {};

		this[Glide.options.type]();
		this.active();

	}

	Module.prototype.slider = function() {

		Glide.wrapper.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.get('x', Glide.width * (Glide.options.startAt - 1))
		});

		Glide.slides.width(Glide.width);

	};

	Module.prototype.carousel = function() {

		this.clones.first = Glide.slides.filter(':first-child')
			.clone().addClass('isCloned').width(Glide.width);

		this.clones.last = Glide.slides.filter(':last-child')
			.clone().addClass('isCloned').width(Glide.width);

		Glide.wrapper
			.append(this.clones.first)
			.prepend(this.clones.last)
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.get('x', Glide.width * Glide.options.startAt)
			});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.slideshow = function () {

		Glide.slides.eq(Glide.options.startAt - 1)
			.css({
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

		Core.Bullets.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};

	return new Module();

};
;/**
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
;/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * @param {Glide} Glide	Slider Class
 * @param {array} Modules	Modules list to construct
 * @return {Module}
 */

var Core = function (Glide, Modules) {

	/**
	 * Construnct modules
	 * and inject Glide and Core as dependency
	 */
	function Module() {

		for(var module in Modules) {
			this[module] = new Modules[module](Glide, this);
		}

	}

	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Events
 * --------------------------------
 * Events functions
 * @return {Glide.Events}
 */

var Events = function (Glide, Core) {


	function Module() {
		this.disabled = false;
		this.keyboard();
		this.hoverpause();
	}


	Module.prototype.keyboard = function() {
		if (Glide.options.keyboard) {
			$(window).on('keyup.glide', function(event){
				if (event.keyCode === 39) Core.Animation.run('>');
				if (event.keyCode === 37) Core.Animation.run('<');
			});
		}
	};


	Module.prototype.hoverpause = function() {

		if (Glide.options.hoverpause) {

			Glide.slider
				.on('mouseover.glide', function(){
					Core.Animation.pause();
				})
				.on('mouseout.glide', function(){
					Core.Animation.play();
				});

		}

	};


	/**
	 * Disable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.disable = function () {
		this.disabled = true;
		return this;
	};


	/**
	 * Enable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.enable = function () {
		this.disabled = false;
		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.call = function (func) {
		if ( (func !== 'undefined') && (typeof func === 'function') ) func(Glide.current, Glide.slides.eq(Glide.current - 1));
		return this;
	};

	return new Module();

};
;/**
 * --------------------------------
 * Glide Helper
 * --------------------------------
 * Helper functions
 * @return {Glide.Helper}
 */

var Helper = function (Glide, Core) {

	function Module() {}

	/**
	 * Capitalise string
	 * @param  {string} s
	 * @return {string}
	 */
	Module.prototype.capitalise = function (s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	return new Module();

};
;var Transition = function (Glide, Core) {

	function Module() {}

	/**
	 * Get transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	Module.prototype.get = function(property) {
		return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
	};


	/**
	 * Clear transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	Module.prototype.clear = function(property) {
		return property + ' 0ms ' + Glide.options.animationTimingFunc;
	};


	return new Module();


};
;var Translate = function (Glide, Core) {


	function Module() {

		this.axes = {
			x: 0,
			y: 0,
			z: 0
		};

	}


	/**
	 * Get translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.get = function(axis, value) {
		this.axes[axis] = parseInt(value);
		return 'translate3d(-' + this.axes.x + 'px, ' + this.axes.y + 'px, ' + this.axes.z + 'px)';
	};


	return new Module();


};
;/**
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
		type: 'slider',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		animationDuration: 500,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		classes: {
			base: 'glide',
			wrapper: 'glide__wrapper',
			slide: 'glide__slide',
			arrows: 'glide__arrows',
			arrow: 'glide__arrow',
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

	this.slider = element.addClass(this.options.classes.base + '--' + this.options.type);
	this.wrapper = this.slider.children('.' + this.options.classes.wrapper);
	this.slides = this.wrapper.children('.' + this.options.classes.slide);

	this.current = parseInt(this.options.startAt);
	this.width = this.slider.width();
	this.length = this.slides.length;

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
		Animation: Animation,
		Build: Build,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.slider);

	// api return
	return core.Api.instance();

};

;/**
 * Wire Glide to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.glide = function (options) {

	return this.each(function () {
		if ( !$.data(this, 'glide_api') ) {
			$.data(this, 'glide_api',
				new Glide($(this), options)
			);
		}
	});

};

})(jQuery, window, document);