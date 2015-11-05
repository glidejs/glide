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
	 * If slider axis is vertical (y axis) return vertical value
	 * else axis is horizontal (x axis) so return horizontal value
	 * @param  {Mixed} hValue
	 * @param  {Mixed} vValue
	 * @return {Mixed}
	 */
	Module.prototype.byAxis = function(hValue, vValue) {
		if (Glide.axis === 'y') return vValue;
		else return	hValue;
	};


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
	 * @version Underscore.js 1.8.3
	 * @source http://underscorejs.org/
	 * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
	 */
	Module.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	/**
	 * Throttle
	 * @version Underscore.js 1.8.3
	 * @source http://underscorejs.org/
	 * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
	 */
	Module.prototype.throttle = function(func, wait, options) {
		var that = this;
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : that.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = that.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
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
