/**
 * Translate module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Translate}
 */
var Translate = function(Glide, Core) {

    /**
     * Translate axes map.
     *
     * @type {Object}
     */
    var axes = {
        x: 0,
        y: 0,
        z: 0
    };

    /**
     * Translate Translate Constructor
     */
    function Translate() {
    }

    /**
     * Set translate.
     *
     * @param  {String} axis
     * @param  {Integer} value
     * @return {String}
     */
    Translate.prototype.set = function(axis, value) {
        axes[axis] = parseInt(value);

        return 'translate3d(' + (-1 * axes.x) + 'px, ' + (-1 * axes.y) + 'px, ' + (-1 * axes.z) + 'px)';
    };

    // Return class.
    return new Translate();

};
