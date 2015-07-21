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
	 * @param {Number} offset Offset from current position
	 * @return {Module}
	 */
	Module.prototype.make = function(offset) {

		this.offset = (typeof offset !== 'undefined') ? offset : 0;
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

		var translate;
		var shift = (Glide.current * Glide.width) - (Glide.width + this.offset);

		// If on start
		// Set translate to shift
		// Hide prev arrow
		if (Core.Run.isStart()) {
			translate = shift;
			Core.Arrows.disable('prev');

		}
		// If on end
		// Set translate to shift reduced by double paddings
		// Hide next arrow
		else if (Core.Run.isEnd()) {
			translate = shift - Glide.options.paddings * 2;
			Core.Arrows.disable('next');
		}
		// Otherwise
		// Set translate to shift reduced by paddings
		// Show arrows
		else {
			translate = shift - Glide.options.paddings;
			Core.Arrows.enable();
		}

		// Apply translate
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate)
		});

	};


	/**
	 * Animation carousel animation type
	 * @param {string} direction
	 */
	Module.prototype.carousel = function () {

		// Translate container
		var translate = 0;
		// Displacement container
		var displacement = 0;
		// Calculate addtional shift
		var shift = (Core.Clones.shift - Glide.options.paddings);

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (Core.Run.isOffset('<')) {

			// Translate is 0 (left edge of wrapper)
			translate = 0;
			// Displacement is shift reduced by local offset
			displacement = shift - this.offset;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// clear transition and jump to last slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set('x', Glide.width * Glide.length + shift)
				});

			});

		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		else if (Core.Run.isOffset('>')) {

			// Translate is euqal slide width * slides length
			translate = Glide.width * Glide.length;
			// Displacement is shift and slider width reduced by local offset
			displacement = (shift + Glide.width) - this.offset;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// Clear transition and jump to first slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set('x', Glide.width + shift)
				});

			});

		}


		/**
		 * While flag is not set
		 * make normal translate
		 */
		else {
			// Translate is slide width * current slide
			translate = (Glide.width * Glide.current);
			// Displacement is shift reduced by local offset
			displacement = shift - this.offset;
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate + displacement)
		});

	};


	/**
	 * Animation slideshow animation type
	 * @param {string} direction
	 */
	Module.prototype.slideshow = function (direction) {

		Glide.slides.css('transition', Core.Transition.get('opacity'))
			.eq(Glide.current - 1).css('opacity', '1')
			.siblings().css('opacity', 0);

	};

	return new Module();

};
