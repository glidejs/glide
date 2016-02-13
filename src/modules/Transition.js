/**
 * --------------------------------
 * Glide Transition
 * --------------------------------
 * Transition module
 * @return {Transition}
 */

var Transition = function(Glide, Core) {


    /**
     * Transition Module Constructor
     */
    function Module() {
        this.jumping = false;
    }


    /**
     * Get transition settings
     * @param  {string} property
     * @return {string}
     */
    Module.prototype.get = function(property) {

        if (!this.jumping) {
            return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
        } else {
            return this.clear('all');
        }

    };


    /**
     * Clear transition settings
     * @param  {string} property
     * @return {string}
     */
    Module.prototype.clear = function(property) {
        return property + ' 0ms ' + Glide.options.animationTimingFunc;
    };


    // @return Module
    return new Module();


};
