var Translate = function (Glide, Core) {


	function Module() {

		this.axes = {
			x: 0,
			y: 0,
			z: 0
		};

	}


	/**
	 * Get translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.get = function(axis, value) {
		this.axes[axis] = parseInt(value);
		return 'translate3d(-' + this.axes.x + 'px, ' + this.axes.y + 'px, ' + this.axes.z + 'px)';
	};


	return new Module();


};
