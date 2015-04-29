var Translate = function (Glide, Core) {


	/**
	 * Translate Module Constructor
	 */
	function Module() {

		this.axes = {
			x: 0,
			y: 0,
			z: 0
		};

	}


	/**
	 * Get translate
	 * @return {string}
	 */
	Module.prototype.get = function() {
		var matrix = Glide.wrapper[0].styles.transform.replace(/[^0-9\-.,]/g, '').split(',');
		return parseInt(matrix[12] || matrix[4]);
	};


	/**
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
		this.axes[axis] = parseInt(value);
		return 'translate3d(' + -1 * this.axes.x + 'px, ' + this.axes.y + 'px, ' + this.axes.z + 'px)';
	};


	// @return Module
	return new Module();


};
