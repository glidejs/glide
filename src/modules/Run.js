/**
 * Run module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Run}
 */
var Run = function(Glide, Core) {

    /**
     * Run constructor.
     */
    function Run() {

        // Running flag. It's in use when autoplay is disabled
        // via options, but we want start autoplay via api.
        this.running = false;

        // Flag for offcanvas animation to cloned slides
        this.flag = false;

        // Start running.
        this.play();
    }

    /**
     * Setup and start autoplay run.
     *
     * @return {Integer/Undefined}
     */
    Run.prototype.play = function() {

        var that = this;

        if (! this.canProcess()) {
            return;
        }

        if (Glide.options.autoplay || this.running) {

            if (typeof this.interval === 'undefined') {
                this.interval = setInterval(function() {
                    that.pause();
                    that.make('>');
                    that.play();
                }, this.getInterval());
            }

        }

        return this.interval;

    };

    /**
     * Get autoplay interval cunfigured on each slide.
     *
     * @return {Number}
     */
    Run.prototype.getInterval = function() {
        return parseInt(Glide.slides.eq(Glide.current - 1).data('glide-autoplay')) || Glide.options.autoplay;
    };

    /**
     * Pasue autoplay animation and clear interval.
     *
     * @return {Integer/Undefined}
     */
    Run.prototype.pause = function() {

        if (Glide.options.autoplay || this.running) {
            if (this.interval >= 0) {
                this.interval = clearInterval(this.interval);
            }
        }

        return this.interval;

    };

    /**
     * Check if we are on the first slide.
     *
     * @return {Boolean}
     */
    Run.prototype.isStart = function() {
        return Glide.current === 1;
    };

    /**
     * Check if we are on the last slide.
     *
     * @return {Boolean}
     */
    Run.prototype.isEnd = function() {
        return Glide.current === Glide.length;
    };

    /**
     * Check if we are making offset run.
     *
     * @return {Boolean}
     */
    Run.prototype.isOffset = function(direction) {
        return this.flag && this.direction === direction;
    };

    /**
     * Run move animation.
     *
     * @param {String} move Code in pattern {direction}{steps} eq. "=3"
     * @param {Function} callback
     * @return {Void}
     */
    Run.prototype.make = function(move, callback) {

        // Store scope.
        var that = this;

        // Extract move direction.
        this.direction = move.substr(0, 1);

        // Extract move steps.
        this.steps = (move.substr(1)) ? move.substr(1) : 0;

        // Do not run if we have only one slide.
        if (! this.canProcess()) {
            return this.stop();
        }

        // Stop autoplay until hoverpause is not set.
        if (!Glide.options.hoverpause) {
            this.pause();
        }

        // Disable events and call before transition callback.
        if (callback !== false) {
            Core.Events.disable()
                .call(Glide.options.beforeTransition)
                .trigger('beforeTransition');
        }

        // Based on direction.
        switch (this.direction) {

            case '>':
                // When we at last slide and move forward and steps are
                // number, set flag and current slide to first.
                if (this.isEnd()) {
                    Glide.current = 1;
                    this.flag = true;
                }
                // When steps is not number, but '>'
                // scroll slider to end.
                else if (this.steps === '>') {
                    Glide.current = Glide.length;
                }
                // Otherwise change normally.
                else {
                    Glide.current = Glide.current + 1;
                }
                break;

            case '<':
                // When we at first slide and move backward and steps
                // are number, set flag and current slide to last.
                if (this.isStart()) {
                    Glide.current = Glide.length;
                    this.flag = true;
                }
                // When steps is not number, but '<'
                // scroll slider to start.
                else if (this.steps === '<') {
                    Glide.current = 1;
                }
                // Otherwise change normally.
                else {
                    Glide.current = Glide.current - 1;
                }
                break;

            case '=':
                // Jump to specifed slide.
                Glide.current = parseInt(this.steps);
                break;

        }

        // Set slides height.
        Core.Height.set();

        // Set active bullet.
        Core.Bullets.active();

        // Run actual translate animation.
        Core.Animation.make().after(function() {

            // Set active flags.
            Core.Build.active();

            // Enable events and call callbacks.
            if (callback !== false) {
                Core.Events.enable()
                    .call(callback)
                    .call(Glide.options.afterTransition)
                    .trigger('afterTransition');
            }

            // Start autoplay until hoverpause is not set.
            if (!Glide.options.hoverpause) {
                that.play();
            }

        });

        // Trigger durning animation event.
        Core.Events
            .call(Glide.options.duringTransition)
            .trigger('duringTransition');

    };

    /**
     * Stop slider from running.
     *
     * @return {void}
     */
    Run.prototype.stop = function() {
        this.pause();
    };

    /**
     * Stop slider from running.
     *
     * @return {void}
     */
    Run.prototype.canProcess = function() {
        return Glide.slides.length > 1;
    };

    // Return class.
    return new Run();

};
