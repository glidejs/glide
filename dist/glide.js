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
 * Glide Main
 * --------------------------------
 * Responsible for slider initiation,
 * extending defaults, returning public api
 * @return {Glide}
 */

var Glide = (function (self) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		autoplay: 2000,
		type: 'slider',
		startAt: 1,
		hoverpause: true,
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
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
	};


	/**
	 * Init Glide
	 * @param  {jquery} element
	 * @param  {object} options
	 * @return {Glide.Api}
	 */
	self.init = function (element, options) {

		self.element = element;
		self.options = $.extend({}, defaults, options);

		Glide.Core.init();

		// console.log(element.attr('id'));

		// Glide.Arrows.items.each(function(i, el){
		// 	console.log($._data( el[0], 'events' ));
		// });
		// console.log("================");

		return Glide.Api.instance();

	};

	return self;

}(Glide || {}));
;/**
 * Wire Glide to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.glide = function (options) {

	return this.each(function () {
		if ( !$.data(this, 'glide_api') ) {
			$.data(this, 'glide_api',
				Glide.init($(this), options)
			);
		}
	});

};
;/**
 * --------------------------------
 * Glide Animation
 * --------------------------------
 * Animation logic module
 * @return {Glide.Animation}
 */

Glide.Animation = (function (self) {


	/**
	 * Start autoplay animation
	 * Setup interval
	 */
	self.play = function () {

		if (Glide.options.autoplay) {
			self.interval = setInterval(function() {
				self.run('>');
			}, Glide.options.autoplay);
		}

	};


	/**
	 * Pasue autoplay animation
	 * Clear interval
	 */
	self.pause = function() {
		if (Glide.options.autoplay) self.interval = clearInterval(self.interval);
	};


	/**
	 * Run move animation
	 * @param  {string} move Code in pattern {direction}{steps} eq. ">3"
	 */
	self.run = function (move, callback) {

		// Extract move direction
		var direction = move.substr(0, 1);
		// Extract move steps
		var steps = (move.substr(1)) ? move.substr(1) : 0;

		// Stop autoplay until hoverpause is not set
		if(!Glide.options.hoverpause) self.pause();
		// Disable events and call before transition callback
		Glide.Events.disable().call(Glide.options.beforeTransition);

		// Based on direction
		switch(direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (Glide.Core.current == Glide.Core.length) Glide.Core.current = 1, self.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (steps === '>') Glide.Core.current = Glide.Core.length;
				// Otherwise change normally
				else Glide.Core.current = Glide.Core.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(Glide.Core.current == 1) Glide.Core.current = Glide.Core.length, self.flag = true;
				// When steps is not number, but '<'
				// scroll slider to start
				else if (steps === '<') Glide.Core.current = 1;
				// Otherwise change normally
				else Glide.Core.current = Glide.Core.current - 1;
				break;

			case '=':
				// Jump to specifed slide
				Glide.Core.current = parseInt(steps);
				break;

		}

		// Run actual translate animation
		self['run' + Glide.Helper.capitalise(Glide.options.type)](direction);

		// When animation is done
		self.afterAnimation(function(){
			// Set active flags
			Glide.Core.setActive();
			// Enable events and call callbacks
			Glide.Events.enable().call(callback).call(Glide.options.afterTransition);
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) self.play();
		});

	};


	/**
	 * Get translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	self.getTranslate = function(axis, value) {

		var axes = {
			x: 0,
			y: 0,
			z: 0
		};

		axes[axis] = parseInt(value);

		return 'translate3d(-' + axes.x + 'px, ' + axes.y + 'px, ' + axes.z + 'px)';

	};


	/**
	 * Get transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	self.getTransition = function(property) {
		return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
	};


	/**
	 * Clear transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	self.clearTransition = function(property) {
		return property + ' 0ms ' + Glide.options.animationTimingFunc;
	};


	/**
	 * After transition callback
	 * @param  {Function} callback
	 * @return {Int}
	 */
	self.afterAnimation = function(callback, steps) {
		return setTimeout(function(){
			callback();
		}, Glide.options.animationDuration + 10);
	};


	/**
	 * Run slider type animation
	 * @param {string} direction
	 */
	self.runSlider = function (direction) {

		var translate = (Glide.Core.current * Glide.Core.width) - Glide.Core.width;

		Glide.Core.wrapper.css({
			'transition': self.getTransition('transform'),
			'transform': self.getTranslate('x', translate)
		});

	};


	/**
	 * Run carousel type animation
	 * @param {string} direction
	 */
	self.runCarousel = function (direction) {

		// Translate container
		var translate;

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (self.flag && direction === '<') {

			// Translate is 0 (left edge of wrapper)
			translate = 0;
			// Reset flag
			self.flag = false;

			// After offset animation is done,
			// clear transition and jump to last slide
			self.afterAnimation(function() {
				Glide.Core.wrapper.css({
					'transition': self.clearTransition('transform'),
					'transform': self.getTranslate('x', Glide.Core.length * Glide.Core.width)
				});
			});

		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		else if (self.flag && direction === '>') {

			// Translate is euqal wrapper width with offset
			translate = (Glide.Core.length * Glide.Core.width) + Glide.Core.width;
			// Reset flag
			self.flag = false;

			// After offset animation is done,
			// clear transition and jump to first slide
			self.afterAnimation(function() {
				Glide.Core.wrapper.css({
					'transition': self.clearTransition('transform'),
					'transform': self.getTranslate('x', Glide.Core.width)
				});
			});

		}


		/**
		 * While flag is not set
		 * make normal translate
		 */
		else {
			translate = (Glide.Core.current * Glide.Core.width);
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.Core.wrapper.css({
			'transition': self.getTransition('transform'),
			'transform': self.getTranslate('x', translate)
		});

	};


	/**
	 * Run slideshow type animation
	 * @param {string} direction
	 */
	self.runSlideshow = function (direction) {

		Glide.Core.slides.css({
			'transition': self.getTransition('opacity'),
		}).eq(Glide.Core.current - 1).css({
			'opacity': '1'
		}).siblings().css('opacity', 0);

	};


	// @return module
	return self;


}(Glide.Animation || {}));
;/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

Glide.Api = (function (self) {


	/**
	 * Api instance
	 * @return {object}
	 */
	self.instance = function () {
		return {
			reinit: Glide.Core.init,
			current: Glide.Api.current,
			go: Glide.Animation.run,
			play: Glide.Animation.play,
			pause: Glide.Animation.pause
		};
	};


	/**
	 * Get current slide index
	 * @return {int}
	 */
	self.current = function () {
		return Glide.Core.current;
	};


	// @return module
	return self;


}(Glide.Api || {}));
;/**
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
;/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Glide.Bullets}
 */

Glide.Bullets = (function (self) {


	/**
	 * Init bullets
	 * build DOM and bind events
	 */
	self.init = function () {
		self.build();
		self.bind();
	};


	/**
	 * Build
	 * bullets DOM
	 */
	self.build = function () {

		self.wrapper = Glide.Core.slider.children('.' + Glide.options.classes.bullets);

		for(var i = 1; i <= Glide.Core.length; i++) {
			$('<li>', {
				'class': Glide.options.classes.bullet,
				'data-glide-dir': '=' + i
			}).appendTo(self.wrapper);
		}

		self.items = self.wrapper.children();

	};


	/**
	 * Bind
	 * bullets events
	 */
	self.bind = function () {

		self.items.on('click', function(){
			if (!Glide.Events.disabled) {
				Glide.Animation.run($(this).data('glide-dir'));
			}
		});

	};


	// @return module
	return self;


}(Glide.Bullets || {}));
;/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * Core logic module
 * @return {Glide.Core}
 */

Glide.Core = (function (self) {


	self.init = function () {

		self.slider = Glide.element.addClass(Glide.options.classes.base + '--' + Glide.options.type);
		self.wrapper = self.slider.children('.' + Glide.options.classes.wrapper);
		self.slides = self.wrapper.children('.' + Glide.options.classes.slide);

		self.current = parseInt(Glide.options.startAt);
		self.width = self.slider.width();
		self.length = self.slides.length;

		self['build' + Glide.Helper.capitalise(Glide.options.type)]();

		Glide.Arrows.init();
		Glide.Bullets.init();
		Glide.Animation.play();

		self.setActive();
		self.bind();

	};


	self.bind = function () {

		if (Glide.options.hoverpause) {
			self.slider
				.on('mouseover.glideKeyup', function(){
					Glide.Animation.pause();
				})
				.on('mouseout.glideKeyup', function(){
					Glide.Animation.play();
				})
				.on('keyup.glideKeyup', function(event){
					if (event.keyCode === 39) Glide.Animation.run('>');
					if (event.keyCode === 37) Glide.Animation.run('<');
				});

		}

	};


	self.setActive = function () {

		self.slides
			.eq(self.current - 1).addClass('active')
			.siblings().removeClass('active');

		Glide.Bullets.items
			.eq(self.current - 1).addClass('active')
			.siblings().removeClass('active');

	};


	self.buildSlider = function () {

		self.wrapper.css({
			'width': self.width * self.length,
			'transform': Glide.Animation.getTranslate('x', self.width * (Glide.options.startAt - 1))
		});

		self.slides.width(self.width);

	};


	self.buildCarousel = function () {

		var firstClone = self.slides.filter(':first-child')
			.clone().addClass('isCloned').width(Glide.Core.width);

		var lastClone = self.slides.filter(':last-child')
			.clone().addClass('isCloned').width(Glide.Core.width);

		self.wrapper
			.append(firstClone)
			.prepend(lastClone)
			.css({
				'width': (self.width * self.length) + (Glide.Core.width * 2),
				'transform': Glide.Animation.getTranslate('x', Glide.Core.width * Glide.options.startAt)
			});

		self.slides.width(self.width);

	};


	self.buildSlideshow = function () {

		self.slides.eq(Glide.options.startAt - 1)
			.css({
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	return self;


}(Glide.Core || {}));
;/**
 * --------------------------------
 * Glide Events
 * --------------------------------
 * Events functions
 * @return {Glide.Events}
 */

Glide.Events = (function (self) {

	/**
	 * Disable all events
	 * @return {Glide.Events}
	 */
	self.disable = function () {
		self.disabled = true;
		return self;
	};


	/**
	 * Enable all events
	 * @return {Glide.Events}
	 */
	self.enable = function () {
		self.disabled = false;
		return self;
	};


	/**
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	self.call = function (func) {
		if ( (func !== 'undefined') && (typeof func === 'function') ) func(Glide.Core.current, Glide.Core.slides.eq(Glide.Core.current - 1));
		return self;
	};


	// @return module
	return self;

}(Glide.Events || {}));
;/**
 * --------------------------------
 * Glide Helper
 * --------------------------------
 * Helper functions
 * @return {Glide.Helper}
 */

Glide.Helper = (function (self) {


	/**
	 * Capitalise string
	 * @param  {string} s
	 * @return {string}
	 */
	self.capitalise = function (s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};


	self.isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};


	// @return module
	return self;


}(Glide.Helper || {}));

})(jQuery, window, document);