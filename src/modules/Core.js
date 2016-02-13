/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * @param {Glide} Glide	Slider Class
 * @param {array} Modules	Modules list to construct
 * @return {Core}
 */

var Core = function(Glide, Modules) {

    /**
     * Core Module Constructor
     * Construct modules and inject Glide and Core as dependency
     */
    function Module() {

        for (var module in Modules) {
            this[module] = new Modules[module](Glide, this);
        }

    }

    // @return Module
    return new Module();

};
