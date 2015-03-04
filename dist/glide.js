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
 * Animation functions
 * @return {Glide.Animation}
 */

var Animation = function (Glide, Core) {


	function Module() {}


	/**
	 * Make specifed animation type
	 * @return {[type]} [description]
	 */
	Module.prototype.make = function() {

		// Animation actual translate animation
		this[Glide.options.type]();
		return this;

	};


	/**
	 * After transition callback
	 * @param  {Function} callback
	 * @return {Int}
	 */
	Module.prototype.after = function(callback) {
		return setTimeout(function(){
			callback();
		}, Glide.options.animationDuration + 20);
	};


	/**
	 * Animation slider animation type
	 * @param {string} direction
	 */
	Module.prototype.slider = function () {

		var translate = (Glide.current * Glide.width) - Glide.width;

		Glide.wrapper.css({
			'transition': Core.Transition.get('transform'),
			'transform': Core.Translate.set('x', translate)
		});

		if (Glide.current === 1) Core.Arrows.hide('prev');
		else if (Glide.current === Glide.length) Core.Arrows.hide('next');
		else Core.Arrows.show();

	};


	/**
	 * Animation carousel animation type
	 * @param {string} direction
	 */
	Module.prototype.carousel = function () {

		// Translate container
		var translate;

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (Core.Run.flag && Core.Run.direction === '<') {

			// Translate is 0 (left edge of wrapper)
			translate = 0;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			// clear transition and jump to last slide
			this.after(function() {
				Glide.wrapper.css({
					'transition': Core.Transition.clear('transform'),
					'transform': Core.Translate.set('x', Glide.length * Glide.width)
				});
			});

		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		else if (Core.Run.flag && Core.Run.direction === '>') {

			// Translate is euqal wrapper width with offset
			translate = (Glide.length * Glide.width) + Glide.width;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			// clear transition and jump to first slide
			this.after(function() {
				Glide.wrapper.css({
					'transition': Core.Transition.clear('transform'),
					'transform': Core.Translate.set('x', Glide.width)
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
			'transform': Core.Translate.set('x', translate)
		});

	};


	/**
	 * Animation slideshow animation type
	 * @param {string} direction
	 */
	Module.prototype.slideshow = function (direction) {

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
			 * @return {Core.Run}
			 */
			go: function(distance, callback) {
				return Core.Run.run(distance, callback);
			},

			/**
			 * Start autoplay
			 * @return {Core.Run}
			 */
			start: function(interval){
				Core.Run.started = true;
				Glide.options.autoplay = parseInt(interval);
				return Core.Run.play();
			},

			/**
			 * Play autoplay
			 * @return {Core.Run}
			 */
			play: function(){
				return Core.Run.play();
			},

			/**
			 * Pause autoplay
			 * @return {Core.Run}
			 */
			pause: function() {
				return Core.Run.pause();
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
	 * Hide arrow
	 */
	Module.prototype.hide = function (type) {

		return this.items.filter('.' + Glide.options.classes['arrow' + Core.Helper.capitalise(type)])
			.css({ opacity: 0, visibility: 'hidden' })
			.siblings().css({ opacity: 1, visibility: 'visible' })
			.end();

	};


	/**
	 * Show arrows
	 */
	Module.prototype.show = function () {

		return this.items.css({ opacity: 1, visibility: 'visible' });

	};


	/**
	 * Bind
	 * arrows events
	 */
	Module.prototype.bind = function () {

		return this.items.on('click touchstart', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.run($(this).data('glide-dir'));
			}
		});

	};

	return new Module();

};
;/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @param {Glide} Glide
 * @param {Core} Core
 * @return {Module}
 */

var Build = function (Glide, Core) {

	function Module() {

		this.clones = {};

		this[Glide.options.type]();
		this.active();
		Core.Bullets.active();

	}

	Module.prototype.slider = function() {

		Glide.wrapper.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.options.startAt - 1)),
			'transition': Core.Transition.get('translate')
		});

		Glide.slides.width(Glide.width);

	};

	Module.prototype.carousel = function() {

		this.clones.first = Glide.slides.filter(':first-child')
			.clone().addClass('clone').width(Glide.width);

		this.clones.last = Glide.slides.filter(':last-child')
			.clone().addClass('clone').width(Glide.width);

		Glide.wrapper
			.append(this.clones.first)
			.prepend(this.clones.last)
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.options.startAt),
				'transition': Core.Transition.get('translate')
			});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.slideshow = function () {

		Glide.slides.eq(Glide.options.startAt - 1)
			.css({
				'transition': Core.Transition.get('translate'),
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	Module.prototype.active = function () {

		Glide.slides
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


	Module.prototype.active = function () {

		Core.Bullets.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};


	/**
	 * Bind
	 * bullets events
	 */
	Module.prototype.bind = function () {

		this.items.on('click touchstart', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.run($(this).data('glide-dir'));
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
				if (event.keyCode === 39) Core.Run.run('>');
				if (event.keyCode === 37) Core.Run.run('<');
			});
		}
	};


	Module.prototype.hoverpause = function() {

		if (Glide.options.hoverpause) {

			Glide.slider
				.on('mouseover.glide', function(){
					Core.Run.pause();
				})
				.on('mouseout.glide', function(){
					Core.Run.play();
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
;/**
 * --------------------------------
 * Glide Run
 * --------------------------------
 * Run logic module
 * @return {Module}
 */

var Run = function (Glide, Core) {


	function Module() {
		this.stared = false;
		this.flag = false;
		this.play();
	}


	/**
	 * Start autoplay animation
	 * Setup interval
	 */
	Module.prototype.play = function() {

		var that = this;

		if (Glide.options.autoplay || this.started) {

			if (typeof this.interval === 'undefined') {
				this.interval = setInterval(function() {
					that.run('>');
				}, Glide.options.autoplay);
			}

		}

		return this.interval;

	};


	/**
	 * Pasue autoplay animation
	 * Clear interval
	 */
	Module.prototype.pause = function() {

		if (Glide.options.autoplay  || this.started) {
			if (this.interval >= 0) this.interval = clearInterval(this.interval);
		}

		return this.interval;

	};


	/**
	 * Run move animation
	 * @param  {string} move Code in pattern {direction}{steps} eq. ">3"
	 */
	Module.prototype.run = function (move, callback) {

		var that = this;
		// Extract move direction
		this.direction = move.substr(0, 1);
		// Extract move steps
		this.steps = (move.substr(1)) ? move.substr(1) : 0;

		// Stop autoplay until hoverpause is not set
		if(!Glide.options.hoverpause) this.pause();
		// Disable events and call before transition callback
		Core.Events.disable().call(Glide.options.beforeTransition);

		// Based on direction
		switch(this.direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (Glide.current == Glide.length) Glide.current = 1, this.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (this.steps === '>') Glide.current = Glide.length;
				// Otherwise change normally
				else Glide.current = Glide.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(Glide.current == 1) Glide.current = Glide.length, this.flag = true;
				// When steps is not number, but '<'
				// scroll slider to start
				else if (this.steps === '<') Glide.current = 1;
				// Otherwise change normally
				else Glide.current = Glide.current - 1;
				break;

			case '=':
				// Jump to specifed slide
				Glide.current = parseInt(this.steps);
				break;

		}

		// Set active bullet
		Core.Bullets.active();

		// Run actual translate animation
		Core.Animation.make().after(function(){
			// Set active flags
			Core.Build.active();
			// Enable events and call callbacks
			Core.Events.enable().call(callback).call(Glide.options.afterTransition);
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) that.play();
		});

	};


	return new Module();

};
;var Touch = function (Glide, Core) {


	function Module() {

		if (Glide.options.touchDistance) {
			Glide.slider.on({
				'touchstart.glide': this.start,
				'touchmove.glide': this.move,
				'touchend.glide': this.end
			});
		}

	}

	Module.prototype.start = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.translate = Core.Translate.get();

		}

	};


	Module.prototype.move = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			if(Glide.options.autoplay) Core.Run.pause();

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate start, end points
			var subExSx = parseInt(touch.pageX) - this.touchStartX;
			var subEySy = parseInt(touch.pageY) - this.touchStartY;
			// Bitwise subExSx pow
			var powEX = Math.abs( subExSx << 2 );
			// Bitwise subEySy pow
			var powEY = Math.abs( subEySy << 2 );
			// Calculate the length of the hypotenuse segment
			var touchHypotenuse = Math.sqrt( powEX + powEY );
			// Calculate the length of the cathetus segment
			var touchCathetus = Math.sqrt( powEY );

			// Calculate the sine of the angle
			this.touchSin = Math.asin( touchCathetus/touchHypotenuse );

			if ( (this.touchSin * (180 / Math.PI)) < 45 ) event.preventDefault();

		}

	};


	Module.prototype.end = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			Core.Events.disable();

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
			// Calculate touch distance
			var touchDistance = touch.pageX - this.touchStartX;
			// Calculate degree
			var touchDeg = this.touchSin * (180 / Math.PI);

			// While touch is positive and greater than distance set in options
			if (touchDistance > Glide.options.touchDistance && touchDeg < 45) Core.Run.run('<');
			// While touch is negative and lower than negative distance set in options
			else if (touchDistance < -Glide.options.touchDistance && touchDeg < 45) Core.Run.run('>');

			Core.Animation.after(function(){
				Core.Events.enable();
				if(Glide.options.autoplay) Core.Run.play();
			});

		}

	};


	// @return Module
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
	 * @return {string}
	 */
	Module.prototype.get = function() {
		var matrix = Glide.wrapper.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
		return parseInt(matrix[12] || matrix[4]);
	};


	/**
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
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
		type: 'carousel',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		touchDistance: 60,
		animationDuration: 750,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
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
		Touch: Touch,
		Arrows: Arrows,
		Bullets: Bullets,
		Build: Build,
		Run: Run,
		Animation: Animation,
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