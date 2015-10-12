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
		this.triggers();
		this.activeTrigger();
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
				.on('mouseover.glide', function(){
					Core.Run.pause();
				})
				.on('mouseout.glide', function(){
					Core.Run.play();
				});

		}

	};


	/**
	 * Resize window event
	 */
	Module.prototype.resize = function() {

		$(window).on('resize.glide', this.throttle(function() {
			Core.Transition.jumping = true;
			Core.Run.pause();
			Glide.setup();
			Core.Build.init();
			Core.Run.make('=' + Glide.current, false);
			Core.Run.play();
			Core.Transition.jumping = false;
		}, Glide.options.throttle));

	};


	/**
	 * Triggers event
	 */
	Module.prototype.triggers = function() {

		var that = this;

		if (triggers.length) {

			triggers
				.off('click.glide touchstart.glide')
				.on('click.glide touchstart.glide', function(event) {

					event.preventDefault();
					var targets = $(this).data('glide-trigger').split(" ");

					if (!Core.Events.disabled) {
						for (var el in targets) {
							var target = $(targets[el]).data('glide_api');
							target.pause();
							target.go($(this).data('glide-dir'), that.activeTrigger);
							target.play();
						}
					}

				});

		}

	};


	/**
	 * Set active trigger
	 */
	Module.prototype.activeTrigger = function () {
		return triggers
			.removeClass(Glide.options.classes.active)
			.filter('[data-glide-dir="=' + Glide.current + '"]')
			.addClass(Glide.options.classes.active);
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


	/**
	 * Throttle
	 * @source http://underscorejs.org/
	 */
	Module.prototype.throttle = function(func, wait, options) {
		var that = this;
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : Core.Helper.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = Core.Helper.now();
			if (!previous && options.leading === false) previous = now;
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
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};


	// @return Module
	return new Module();

};
