/**
 * --------------------------------
 * Glide Events
 * --------------------------------
 * Events functions
 * @return {Events}
 */

var Events = function(Glide, Core) {

	var triggers = $('[data-glide-trigger]');

	/**
	 * Events Module Constructor
	 */
	function Module() {
		this.disabled = false;
		this.keyboard();
		this.hoverpause();
		this.resize();
		this.bindTriggers();
	}


	/**
	 * Keyboard events
	 */
	Module.prototype.keyboard = function() {
		if (Glide.options.keyboard) {
			$(window).on('keyup.glide', function(event){
				if (event.keyCode === 39) Core.Run.make('>');
				if (event.keyCode === 37) Core.Run.make('<');
			});
		}
	};

	/**
	 * Hover pause event
	 */
	Module.prototype.hoverpause = function() {

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
	 * Resize window event
	 */
	Module.prototype.resize = function() {

		$(window).on('resize.glide', Core.Helper.throttle(function() {
			Core.Transition.jumping = true;
			Glide.setup();
			Core.Build.init();
			Core.Run.make('=' + Glide.current, false);
			Core.Run.play();
			Core.Transition.jumping = false;
		}, Glide.options.throttle));

	};


	/**
	 * Bind triggers events
	 */
	Module.prototype.bindTriggers = function() {
		if (triggers.length) {
			triggers
				.off('click.glide touchstart.glide')
				.on('click.glide touchstart.glide', this.handleTrigger);
		}
	};


	/**
	 * Hande trigger event
	 * @param  {Object} event
	 */
	Module.prototype.handleTrigger = function(event) {
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
	 * Disable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.disable = function() {
		this.disabled = true;

		return this;
	};


	/**
	 * Enable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.enable = function() {
		this.disabled = false;

		return this;
	};


	/**
	 * Detach anchors clicks
	 * inside slider track
	 */
	Module.prototype.detachClicks = function() {
		Glide.track.off('click', 'a');

		return this;
	};


	/**
	 * Prevent anchors clicks
	 * inside slider track
	 */
	Module.prototype.preventClicks = function(status) {
		Glide.track.one('click', 'a', function(event){ event.preventDefault(); });

		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.call = function (func) {
		if ( (func !== 'undefined') && (typeof func === 'function') ) func(this.getParams());

		return this;
	};

	Module.prototype.trigger = function(name) {
		Glide.slider.trigger(name + ".glide", [this.getParams()]);

		return this;
	};


	/**
	 * Get events params
	 * @return {Object}
	 */
	Module.prototype.getParams = function() {
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
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.unbind = function() {

		Glide.track
			.off('keyup.glide')
			.off('mouseover.glide')
			.off('mouseout.glide');

		triggers
			.off('click.glide touchstart.glide');

		$(window)
			.off('keyup.glide')
			.off('resize.glide');

	};


	// @return Module
	return new Module();

};
