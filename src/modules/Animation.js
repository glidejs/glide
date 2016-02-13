/**
 * --------------------------------
 * Glide Animation
 * --------------------------------
 * Animation functions
 * @return {Animation}
 */

var Animation = function(Glide, Core) {

    var offset;

    function Module() {
    }

    /**
     * Make specifed animation type
     * @param {Number} offset Offset from current position
     * @return {Module}
     */
    Module.prototype.make = function(displacement) {
        offset = (typeof displacement !== 'undefined') ? parseInt(displacement) : 0;
        // Animation actual translate animation
        this[Glide.options.type]();
        return this;
    };


    /**
     * After transition callback
     * @param  {Function} callback
     * @return {Int}
     */
    Module.prototype.after = function(callback) {
        return setTimeout(function() {
            callback();
        }, Glide.options.animationDuration + 20);
    };


    /**
     * Animation slider animation type
     * @param {string} direction
     */
    Module.prototype.slider = function() {

        var translate = Glide[Glide.size] * (Glide.current - 1);
        var shift = Core.Clones.shift - Glide.paddings;

        // If on first slide
        if (Core.Run.isStart()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Shift is zero
            else {
                shift = 0;
            }
            // Hide prev arrow
            Core.Arrows.disable('prev');
        }
        // If on last slide
        else if (Core.Run.isEnd()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Double and absolute shift
            else {
                shift = Math.abs(shift * 2);
            }
            // Hide next arrow
            Core.Arrows.disable('next');
        }
        // Otherwise
        else {
            // Absolute shift
            shift = Math.abs(shift);
            // Show arrows
            Core.Arrows.enable();
        }

        // Apply translate
        Glide.track.css({
            'transition': Core.Transition.get('all'),
            'transform': Core.Translate.set(Glide.axis, translate - shift - offset)
        });

    };


    /**
     * Animation carousel animation type
     * @param {string} direction
     */
    Module.prototype.carousel = function() {

        // Translate container
        var translate = Glide[Glide.size] * Glide.current;
        // Calculate addtional shift
        var shift;

        if (Glide.options.centered) {
            shift = Core.Clones.shift - Glide.paddings;
        } else {
            shift = Core.Clones.shift;
        }

        /**
         * The flag is set and direction is prev,
         * so we're on the first slide
         * and need to make offset translate
         */
        if (Core.Run.isOffset('<')) {
            // Translate is 0 (left edge of wrapper)
            translate = 0;
            // Reset flag
            Core.Run.flag = false;
            // After offset animation is done
            this.after(function() {
                // clear transition and jump to last slide
                Glide.track.css({
                    'transition': Core.Transition.clear('all'),
                    'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] * Glide.length + shift)
                });
            });
        }


        /**
         * The flag is set and direction is next,
         * so we're on the last slide
         * and need to make offset translate
         */
        if (Core.Run.isOffset('>')) {
            // Translate is slides width * length with addtional offset (right edge of wrapper)
            translate = (Glide[Glide.size] * Glide.length) + Glide[Glide.size];
            // Reset flag
            Core.Run.flag = false;
            // After offset animation is done
            this.after(function() {
                // Clear transition and jump to first slide
                Glide.track.css({
                    'transition': Core.Transition.clear('all'),
                    'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] + shift)
                });
            });
        }

        /**
         * Actual translate apply to wrapper
         * overwrite transition (can be pre-cleared)
         */
        Glide.track.css({
            'transition': Core.Transition.get('all'),
            'transform': Core.Translate.set(Glide.axis, translate + shift - offset)
        });

    };


    /**
     * Animation slideshow animation type
     * @param {string} direction
     */
    Module.prototype.slideshow = function() {

        Glide.slides.css('transition', Core.Transition.get('opacity'))
            .eq(Glide.current - 1).css('opacity', 1)
            .siblings().css('opacity', 0);

    };

    return new Module();

};
