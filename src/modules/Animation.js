/**
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
