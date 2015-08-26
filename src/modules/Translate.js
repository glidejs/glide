/**
 * --------------------------------
 * Glide Translate
 * --------------------------------
 * Translate module
 * @return {Translate}
 */

var Translate = function(Glide, Core) {

	// Translate axes map
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
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
		axes[axis] = parseInt(value);
		return 'translate3d(' + (-1 * axes.x) + 'px, ' + (-1 * axes.y) + 'px, ' + (-1 * axes.z) + 'px)';
	};


	// @return Module
	return new Module();


};
