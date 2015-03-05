var Transition = function (Glide, Core) {

	function Module() {
		this.jumping = false;
	}

	/**
	 * Get transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	Module.prototype.get = function(property) {
		if (!this.jumping) {
			return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
		} else {
			return this.clear();
		}
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
