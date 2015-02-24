/**
 * --------------------------------
 * Glide Helper
 * --------------------------------
 * Helper functions
 * @return {Glide.Helper}
 */

Glide.Helper = (function (self) {


	/**
	 * Capitalise string
	 * @param  {string} s
	 * @return {string}
	 */
	self.capitalise = function (s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};


	self.isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};


	// @return module
	return self;


}(Glide.Helper || {}));
