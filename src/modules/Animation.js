/**
 * --------------------------------
 * Glide Animation
 * --------------------------------
 * Animation logic module
 * @return {Module}
 */

var Animation = function (Glide, Core) {


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
				console.log('play');
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

		// Set active bullet
		Core.Bullets.active();

		// When animation is done
		this.after(function(){
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
	Module.prototype.after = function(callback, steps) {
		return setTimeout(function(){
			callback();
		}, Glide.options.animationDuration + 20);
	};


	/**
	 * Run slider type animation
	 * @param {string} direction
	 */
	Module.prototype.runSlider = function (direction) {

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
		else if (this.flag && direction === '>') {

			// Translate is euqal wrapper width with offset
			translate = (Glide.length * Glide.width) + Glide.width;
			// Reset flag
			this.flag = false;

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
