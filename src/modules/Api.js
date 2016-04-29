/**
 * Api module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Api}
 */
var Api = function(Glide, Core) {

    /**
     * Api constructor.
     */
    function Api() {
    }

    /**
     * Api instance.
     *
     * @return {Object}
     */
    Api.prototype.instance = function() {

        return {

            /**
             * Get current slide index.
             *
             * @return {Integer}
             */
            current: function() {
                return Glide.current;
            },


            /**
             * Go to specifed slide.
             *
             * @param  {String} distance
             * @param  {Function} callback
             * @return {Void}
             */
            go: function(distance, callback) {
                Core.Run.pause();
                Core.Run.make(distance, callback);
                Core.Run.play();
            },


            /**
             * Jump without animation to specifed slide
             *
             * @param  {String} distance
             * @param  {Function} callback
             * @return {Void}
             */
            jump: function(distance, callback) {

                // Let know that we want jumping.
                Core.Transition.jumping = true;

                // Take off jumping flag,
                // after animation.
                Core.Animation.after(function() {

                    Core.Transition.jumping = false;
                });

                // Move slider.
                Core.Run.make(distance, callback);

            },


            /**
             * Move slider by passed distance.
             *
             * @param  {Integer} distance
             * @return {Void}
             */
            move: function(distance) {
                Core.Transition.jumping = true;
                Core.Animation.make(distance);
                Core.Transition.jumping = false;
            },


            /**
             * Start autoplay.
             *
             * @return {Void}
             */
            start: function(interval) {

                // We want running, turn on flag.
                Core.Run.running = true;

                // Set autoplay duration.
                Glide.options.autoplay = parseInt(interval);

                // Run autoplay.
                Core.Run.play();

            },


            /**
             * Run autoplay.
             *
             * @return {Boolean}
             */
            play: function() {
                return Core.Run.play();
            },


            /**
             * Pause autoplay.
             *
             * @return {Integer}
             */
            pause: function() {
                return Core.Run.pause();
            },


            /**
             * Destroy slider.
             *
             * @return {Void}
             */
            destroy: function() {

                Core.Run.pause();
                Core.Clones.remove();
                Core.Helper.removeStyles([Glide.track, Glide.slides]);
                Core.Bullets.remove();
                Glide.slider.removeData('glide_api');

                Core.Events.unbind();
                Core.Touch.unbind();
                Core.Arrows.unbind();
                Core.Bullets.unbind();

                delete Glide.slider;
                delete Glide.track;
                delete Glide.slides;
                delete Glide.width;
                delete Glide.length;

            },


            /**
             * Refresh slider.
             *
             * @return {Void}
             */
            refresh: function() {
                Core.Run.pause();
                Glide.collect();
                Glide.setup();
                Core.Clones.remove().init();
                Core.Bullets.remove().init();
                Core.Build.init();
                Core.Run.make('=' + parseInt(Glide.options.startAt), Core.Run.play());
            },

        };

    };


    // Return class.
    return new Api();


};
