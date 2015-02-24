/**
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
