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

		var translate = (Glide.current * Glide.width) - (Glide.width + this.offset);

		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate)
		});

		// If on start hide prev arrow
		if (Glide.current === 1) Core.Arrows.disable('prev');
		// If on end hide next arrow
		else if (Glide.current === Glide.length) Core.Arrows.disable('next');
		// Show arrows
		else Core.Arrows.enable();

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
			translate = 0 - this.offset;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// clear transition and jump to last slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
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
			translate = (Glide.length * Glide.width) + (Glide.width - this.offset);
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// Clear transition and jump to first slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set('x', Glide.width)
				});

			});

		}


		/**
		 * While flag is not set
		 * make normal translate
		 */
		else {
			translate = (Glide.current * Glide.width) - this.offset;
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate)
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
