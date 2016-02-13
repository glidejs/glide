/**
 * --------------------------------
 * Glide Height
 * --------------------------------
 * Height module
 * @return {Height}
 */

var Height = function(Glide, Core) {


    /**
     * Height Module Constructor
     */
    function Module() {

        if (Glide.options.autoheight) {
            Glide.wrapper.css({
                'transition': Core.Transition.get('height'),
            });
        }

    }

    /**
     * Get current slide height
     * @return {Number}
     */
    Module.prototype.get = function() {
        var offset = (Glide.axis === 'y') ? Glide.paddings * 2 : 0;
        return Glide.slides.eq(Glide.current - 1).height() + offset;
    };

    /**
     * Set slider height
     * @param {Boolean} force Force height setting even if option is turn off
     * @return {Boolean}
     */
    Module.prototype.set = function(force) {
        return (Glide.options.autoheight || force) ? Glide.wrapper.height(this.get()) : false;
    };


    // @return Module
    return new Module();


};
