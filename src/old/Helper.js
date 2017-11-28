/**
 * helper module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Helper}
 */
var Helper = function(Glide, Core) {

    /**
     * Helper constructor.
     */
    function Helper() {
    }

    /**
     * If slider axis is vertical (y axis) return vertical value
     * else axis is horizontal (x axis) so return horizontal value.
     *
     * @param  {Mixed} hValue
     * @param  {Mixed} vValue
     * @return {Mixed}
     */
    Helper.prototype.byAxis = function(hValue, vValue) {
        if (Glide.axis === 'y') {
            return vValue;
        }

        return hValue;
    };

    /**
     * Capitalise string.
     *
     * @param  {String} s
     * @return {String}
     */
    Helper.prototype.capitalise = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Get time.
     *
     * @version Underscore.js 1.8.3
     * @source http://underscorejs.org/
     * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
     * @return {String}
     */
    Helper.prototype.now = Date.now || function() {
        return new Date().getTime();
    };

    /**
     * Throttle.
     *
     * @version Underscore.js 1.8.3
     * @source http://underscorejs.org/
     * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
     */
    Helper.prototype.throttle = function(func, wait, options) {
        var that = this;
        var context;
        var args;
        var result;
        var timeout = null;
        var previous = 0;
        if (!options) {
            options = {};
        }
        var later = function() {
            previous = options.leading === false ? 0 : that.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        };
        return function() {
            var now = that.now();
            if (!previous && options.leading === false) {
                previous = now;
            }
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
                if (!timeout) {
                    context = args = null;
                }
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    /**
     * Remove transition.
     *
     * @return {Void}
     */
    Helper.prototype.removeStyles = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeAttr('style');
        }
    };

    // Return class.
    return new Helper();

};
