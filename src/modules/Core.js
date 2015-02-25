/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * @param {Glide} Glide	Slider Class
 * @param {array} Modules	Modules list to construct
 * @return {Module}
 */

var Core = function (Glide, Modules) {

	/**
	 * Construnct modules
	 * and inject Glide and Core as dependency
	 */
	function Module() {

		for(var module in Modules) {
			this[module] = new Modules[module](Glide, this);
		}

	}

	// @return Module
	return new Module();

};
