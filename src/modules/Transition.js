var Transition = function (Glide, Core) {

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
