var Translate = function(Glide, Core) {

	var axes = {
		x: 0,
		y: 0,
		z: 0
	};

	/**
	 * Translate Module Constructor
	 */
	function Module() {}


	/**
	 * Get translate
	 * @return {string}
	 */
	Module.prototype.get = function() {
		var matrix = Glide.track[0].styles.transform.replace(/[^0-9\-.,]/g, '').split(',');
		return parseInt(matrix[12] || matrix[4]);
	};


	/**
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
		axes[axis] = parseInt(value);
		return 'translate3d(' + -1 * axes.x + 'px, ' + axes.y + 'px, ' + axes.z + 'px)';
	};


	// @return Module
	return new Module();


};
