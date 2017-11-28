/**
 * Animation module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Animation}
 */
var Animation = function(Glide, Core) {

    /**
     * Animation offset value.
     *
     * @var {Number}
     */
    var offset;

    /**
     * Animation constructor.
     */
    function Animation() {

    }

    /**
     * Make configured animation type.
     *
     * @param  {Number} displacement
     * @return {self}
     */
    Animation.prototype.make = function(displacement) {
        // Do not run if we have only one slide.
        if (! Core.Run.canProcess()) {
            return Core.Arrows.disable();
        }

        // Parse displacement to integer before use.
        offset = (typeof displacement !== 'undefined') ? parseInt(displacement) : 0;

        // Animation actual translate animation
        this[Glide.options.type]();

        return this;
    };


    /**
     * After animation callback.
     *
     * @param  {Function} callback
     * @return {Integer}
     */
    Animation.prototype.after = function(callback) {
        return setTimeout(function() {
            callback();
        }, Glide.options.animationDuration + 20);
    };


    /**
     * Slider animation type.
     *
     * @return {Void}
     */
    Animation.prototype.slider = function() {

        var translate = Glide[Glide.size] * (Glide.current - 1);
        var shift = Core.Clones.shift - Glide.paddings;

        // If we are on the first slide.
        if (Core.Run.isStart()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Shift is zero.
            else {
                shift = 0;
            }
            // Hide previous arrow.
            Core.Arrows.disable('prev');
        }

        // If we are on the last slide.
        else if (Core.Run.isEnd()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Double and absolute shift.
            else {
                shift = Math.abs(shift * 2);
            }
            // Hide next arrow.
            Core.Arrows.disable('next');
        }

        // We are not on the edge cases.
        else {
            // Absolute shift
            shift = Math.abs(shift);
            // Show arrows.
            Core.Arrows.enable();
        }

        // Apply translate to
        // the slider track.
        Glide.track.css({
            'transition': Core.Transition.get('all'),
            'transform': Core.Translate.set(Glide.axis, translate - shift - offset)
        });

    };


    /**
     * Carousel animation type
     *
     * @return {Void}
     */
    Animation.prototype.carousel = function() {

        // Get translate value by multiplying two
        // slider size and current slide number.
        var translate = Glide[Glide.size] * Glide.current;

        // Get animation shift.
        var shift;

        // Calculate animation shift.
        if (Glide.options.centered) {
            // Decrease clones shift with slider
            // paddings, because slider is centered.
            shift = Core.Clones.shift - Glide.paddings;
        } else {
            // Shif is only clones shift.
            shift = Core.Clones.shift;
        }

        // The flag is set and direction is previous,
        // so we are on the first slide and need
        // to make offset translate.
        if (Core.Run.isOffset('<')) {

            // Translate is 0 (left edge of the track).
            translate = 0;

            // Take off flag.
            Core.Run.flag = false;

            // Clear transition and jump to last slide,
            // after offset animation is done.
            this.after(function() {
                Glide.track.css({
                    'transition': Core.Transition.clear('all'),
                    'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] * Glide.length + shift)
                });
            });

        }


        // The flag is set and direction is next,
        // so we're on the last slide and need
        // to make offset translate.
        if (Core.Run.isOffset('>')) {

            // Translate is slides width * length with addtional
            // offset (right edge of the track).
            translate = (Glide[Glide.size] * Glide.length) + Glide[Glide.size];

            // Reset flag
            Core.Run.flag = false;

            // Clear transition and jump to the first slide,
            // after offset animation is done.
            this.after(function() {
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
     * Slideshow animation type.
     *
     * @return {Void}
     */
    Animation.prototype.slideshow = function() {

        Glide.slides.css('transition', Core.Transition.get('opacity'))
            .eq(Glide.current - 1).css('opacity', 1)
            .siblings().css('opacity', 0);

    };

    // Return class.
    return new Animation();

};
