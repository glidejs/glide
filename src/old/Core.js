/**
 * Glide core.
 *
 * @param {Object} Glide
 * @param {Object} Modules
 * @return {Core}
 */
var Core = function(Glide, Modules) {

    /**
     * Core constructor. Construct modules and
     * inject Glide and Core as dependency.
     *
     * @return {Void}
     */
    function Core() {

        for (var module in Modules) {
            this[module] = new Modules[module](Glide, this);
        }

    }

    // Return class.
    return new Core();

};
