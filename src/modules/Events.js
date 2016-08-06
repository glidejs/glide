/**
 * Events module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Events}
 */
var Events = function(Glide, Core) {

    /**
     * Collection of triggers.
     *
     * @type {Object}
     */
    var triggers = $('[data-glide-trigger]');

    /**
     * Events constructor.
     */
    function Events() {
        this.disabled = false;

        this.keyboard();
        this.hoverpause();
        this.resize();
        this.bindTriggers();
    }

    /**
     * Bind keyboard events.
     *
     * @return {Void}
     */
    Events.prototype.keyboard = function() {
        if (Glide.options.keyboard) {
            $(window).on('keyup.glide', function(event) {
                if (event.keyCode === 39) {
                    Core.Run.make('>');
                }
                if (event.keyCode === 37) {
                    Core.Run.make('<');
                }
            });
        }
    };

    /**
     * Bind hoverpause event.
     *
     * @return {Void}
     */
    Events.prototype.hoverpause = function() {

        if (Glide.options.hoverpause) {

            Glide.track
                .on('mouseover.glide', function() {
                    Core.Run.pause();
                    Core.Events.trigger('mouseOver');
                })
                .on('mouseout.glide', function() {
                    Core.Run.play();
                    Core.Events.trigger('mouseOut');
                });

        }

    };

    /**
     * Bind resize window event.
     *
     * @return {Void}
     */
    Events.prototype.resize = function() {

        $(window).on('resize.glide.' + Glide.uuid, Core.Helper.throttle(function() {
            if(!Glide.destroyed) {
                Core.Transition.jumping = true;
                Glide.setup();
                Core.Build.init();
                Core.Run.make('=' + Glide.current, false);
                Core.Run.play();
                Core.Transition.jumping = false;
            }
        }, Glide.options.throttle));

    };

    /**
     * Bind triggers events.
     *
     * @return {Void}
     */
    Events.prototype.bindTriggers = function() {
        if (triggers.length) {
            triggers
                .off('click.glide touchstart.glide')
                .on('click.glide touchstart.glide', this.handleTrigger);
        }
    };

    /**
     * Hande trigger event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Events.prototype.handleTrigger = function(event) {
        event.preventDefault();

        var targets = $(this).data('glide-trigger').split(" ");

        if (!this.disabled) {
            for (var el in targets) {
                var target = $(targets[el]).data('glide_api');
                target.pause();
                target.go($(this).data('glide-dir'), this.activeTrigger);
                target.play();
            }
        }
    };

    /**
     * Disable all events.
     *
     * @return {self}
     */
    Events.prototype.disable = function() {
        this.disabled = true;

        return this;
    };

    /**
     * Enable all events.
     *
     * @return {self}
     */
    Events.prototype.enable = function() {
        this.disabled = false;

        return this;
    };

    /**
     * Detach anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.detachClicks = function() {
        Glide.track.find('a').each(function(i, a) {
            $(a).attr('data-href', $(a).attr('href')).removeAttr('href');
        });

        return this;
    };

    /**
     * Attach anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.attachClicks = function() {
        Glide.track.find('a').each(function(i, a) {
            $(a).attr('href', $(a).attr('data-href'));
        });

        return this;
    };

    /**
     * Prevent anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.preventClicks = function(event) {
        if (event.type === 'mousemove') {
            Glide.track.one('click', 'a', function(e) {
                e.preventDefault();
            });
        }

        return this;
    };

    /*
     * Call event function with parameters.
     *
     * @param {Function} func
     * @return {self}
     */
    Events.prototype.call = function(func) {
        if ((func !== 'undefined') && (typeof func === 'function')) {
            func(this.getParams());
        }

        return this;
    };

    /**
     * Trigger event.
     *
     * @param  {String} name
     * @return {self}
     */
    Events.prototype.trigger = function(name) {
        Glide.slider.trigger(name + ".glide", [this.getParams()]);

        return this;
    };

    /**
     * Get parameters for events callback.
     *
     * @return {Object}
     */
    Events.prototype.getParams = function() {
        return {
            index: Glide.current,
            length: Glide.slides.length,
            current: Glide.slides.eq(Glide.current - 1),
            slider: Glide.slider,
            swipe: {
                distance: (Core.Touch.distance || 0)
            }
        };
    };

    /*
     * Unbind all events.
     *
     * @return {Void}
     */
    Events.prototype.unbind = function() {

        Glide.track
            .off('keyup.glide')
            .off('mouseover.glide')
            .off('mouseout.glide');

        triggers
            .off('click.glide touchstart.glide');

        $(window)
            .off('keyup.glide')
            .off('resize.glide.' + Glide.uuid);

    };

    // Return class.
    return new Events();

};
