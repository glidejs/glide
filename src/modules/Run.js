/**
 * --------------------------------
 * Glide Run
 * --------------------------------
 * Run logic module
 * @return {Run}
 */

var Run = function(Glide, Core) {


	/**
	 * Run Module
	 * Constructor
	 */
	function Module() {
		// Running flag
		// It's in use when autoplay is disabled via options,
		// but we want start autoplay via api
		this.running = false;
		// Flag for offcanvas animation to cloned slides
		this.flag = false;
		this.play();
	}


	/**
	 * Start autoplay animation
	 * Setup interval
	 * @return {Int/Undefined}
	 */
	Module.prototype.play = function() {

		var that = this;

		if (Glide.options.autoplay || this.running) {

			if (typeof this.interval === 'undefined') {
				this.interval = setInterval(function() {
					that.make('>');
				}, Glide.options.autoplay);
			}

		}

		return this.interval;

	};


	/**
	 * Pasue autoplay animation
	 * Clear interval
	 * @return {Int/Undefined}
	 */
	Module.prototype.pause = function() {

		if (Glide.options.autoplay || this.running) {
			if (this.interval >= 0) this.interval = clearInterval(this.interval);
		}

		return this.interval;

	};


	/**
	 * Check if we are on first slide
	 * @return {boolean}
	 */
	Module.prototype.isStart = function() {
		return Glide.current === 1;
	};


	/**
	 * Check if we are on last slide
	 * @return {boolean}
	 */
	Module.prototype.isEnd = function() {
		return Glide.current === Glide.length;
	};

	/**
	 * Check if we are making offset run
	 * @return {boolean}
	 */
	Module.prototype.isOffset = function(direction) {
		return this.flag && this.direction === direction;
	};

	/**
	 * Run move animation
	 * @param  {string} move Code in pattern {direction}{steps} eq. "=3"
	 */
	Module.prototype.make = function (move, callback) {

		// Cache
		var that = this;
		// Extract move direction
		this.direction = move.substr(0, 1);
		// Extract move steps
		this.steps = (move.substr(1)) ? move.substr(1) : 0;

		// Stop autoplay until hoverpause is not set
		if(!Glide.options.hoverpause) this.pause();
		// Disable events and call before transition callback
		if(callback !== false) {
			Core.Events.disable()
				.call(Glide.options.beforeTransition)
				.trigger('beforeTransition');
		}

		// Based on direction
		switch(this.direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (this.isEnd()) Glide.current = 1, this.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (this.steps === '>') Glide.current = Glide.length;
				// Otherwise change normally
				else Glide.current = Glide.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(this.isStart()) Glide.current = Glide.length, this.flag = true;
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

		// Set slides height
		Core.Height.set();
		// Set active bullet
		Core.Bullets.active();

		// Run actual translate animation
		Core.Animation.make().after(function(){
			// Set active flags
			Core.Build.active();
			// Enable events and call callbacks
			if(callback !== false) {
				Core.Events.enable()
					.call(callback)
					.call(Glide.options.afterTransition)
					.trigger('afterTransition');
			}
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) that.play();
		});

	};


	return new Module();

};
