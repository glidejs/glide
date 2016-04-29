/**
 * Transition module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Transition}
 */
var Transition = function(Glide, Core) {

    /**
     * Transition constructor.
     */
    function Transition() {
        this.jumping = false;
    }

    /**
     * Get transition settings.
     *
     * @param {String} property
     * @return {String}
     */
    Transition.prototype.get = function(property) {
        if (!this.jumping) {
            return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
        }

        return this.clear('all');
    };

    /**
     * Clear transition settings.
     *
     * @param {String} property
     * @return {String}
     */
    Transition.prototype.clear = function(property) {
        return property + ' 0ms ' + Glide.options.animationTimingFunc;
    };

    // Return class.
    return new Transition();

};
