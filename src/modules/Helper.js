/**
 * --------------------------------
 * Glide Helper
 * --------------------------------
 * Helper functions
 * @return {Helper}
 */

var Helper = function(Glide, Core) {


	/**
	 * Helper Module Constructor
	 */
	function Module() {}


	/**
	 * Capitalise string
	 * @param  {string} s
	 * @return {string}
	 */
	Module.prototype.capitalise = function (s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};


	/**
	 * Get time
	 * @source http://underscorejs.org/
	 */
	Module.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	/**
	 * Remove transition
	 */
	Module.prototype.removeStyles = function(elements) {

		for (var el in elements) {
			elements[el].removeAttr('style');
		}

	};


	// @return Module
	return new Module();


};
