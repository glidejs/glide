/**
 * --------------------------------
 * Glide Touch
 * --------------------------------
 * Touch module
 * @return {Glide.Touch}
 */

var Touch = function (Glide, Core) {


	/**
	 * Touch Module Constructor
	 */
	function Module() {

		this.dragging = false;

		if (Glide.options.touchDistance) {
			Glide.track.on({ 'touchstart.glide': $.proxy(this.start, this) });
		}

		if (Glide.options.dragDistance) {
			Glide.track.on({ 'mousedown.glide': $.proxy(this.start, this) });
		}

	}


	/**
	 * Unbind touch events
	 */
	Module.prototype.unbind = function() {
		Glide.track
			.off('touchstart.glide mousedown.glide')
			.off('touchmove.glide mousemove.glide')
			.off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');
	};


	/**
	 * Start touch event
	 * @param  {Object} event
	 */
	Module.prototype.start = function(event) {

		event.preventDefault();
		event.stopPropagation();

		// Escape if events disabled
		// or already dragging
		if (!Core.Events.disabled && !this.dragging) {

			// Turn off jumping flag
			Core.Transition.jumping = true;
			// Detach clicks inside track
			Core.Events.detachClicks();
			// Pause if autoplay
			Core.Run.pause();

			var touch;

			// Cache event
			if (event.type === 'mousedown') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.dragging = true;

			Glide.track.on({
				'touchmove.glide mousemove.glide': Core.Events.throttle($.proxy(this.move, this), Glide.options.throttle),
				'touchend.glide touchcancel.glide mouseup.glide mouseleave.glide': $.proxy(this.end, this)
			});

		}

	};


	/**
	 * Touch move event
	 * @param  {Object} event
	 */
	Module.prototype.move = function(event) {

		// Escape if events not disabled
		// or not dragging
		if (!Core.Events.disabled && this.dragging) {

			// Prevent clicks inside track
			Core.Events.preventClicks();

			var touch;

			// Cache event
			if (event.type === 'mousemove') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate start, end points
			var subExSx = parseInt(touch.pageX) - this.touchStartX;
			var subEySy = parseInt(touch.pageY) - this.touchStartY;
			// Bitwise subExSx pow
			var powEX = Math.abs( subExSx << 2 );
			// Bitwise subEySy pow
			var powEY = Math.abs( subEySy << 2 );
			// Calculate the length of the hypotenuse segment
			var touchHypotenuse = Math.sqrt( powEX + powEY );
			// Calculate the length of the cathetus segment
			var touchCathetus = Math.sqrt( powEY );

			// Calculate the sine of the angle
			this.touchSin = Math.asin( touchCathetus/touchHypotenuse );

			// While angle is lower than 45 degree
			if ( (this.touchSin * 180 / Math.PI) < 45 ) {
				// Prevent propagation
				event.stopPropagation();
				// Prevent scrolling
				event.preventDefault();
				// Add dragging class
				Glide.track.addClass(Glide.options.classes.dragging);
			// Else escape from event, we don't want move slider
			} else {
				// Clear dragging flag
				this.dragging = false;
				return;
			}

			// Make offset animation
			Core.Animation.make(subExSx);

		}

	};


	/**
	 * Touch end event
	 * @param  {Onject} event
	 */
	Module.prototype.end = function(event) {

		// Escape if events not disabled
		// or not dragging
		if (!Core.Events.disabled && this.dragging) {

			// Turn off jumping flag
			Core.Transition.jumping = false;
			// Unset dragging flag
			this.dragging = false;
			// Disable other events
			Core.Events.disable();
			// Remove dragging class
			Glide.track.removeClass(Glide.options.classes.dragging);

			var touch;

			// Cache event
			if (event.type === 'mouseup' || event.type === 'mouseleave') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate touch distance
			var touchDistance = touch.pageX - this.touchStartX;
			// Calculate degree
			var touchDeg = this.touchSin * 180 / Math.PI;

			// If slider type is slider
			if (Core.Build.isType('slider')) {

				// Prevent slide to right on first item (prev)
				if (Core.Run.isStart()) {
					if ( touchDistance > 0 ) touchDistance = 0;
				}

				// Prevent slide to left on last item (next)
				if (Core.Run.isEnd()) {
					if ( touchDistance < 0 ) touchDistance = 0;
				}

			}

			// While touch is positive and greater than distance set in options
			// move backward
			if (touchDistance > Glide.options.touchDistance && touchDeg < 45) Core.Run.make('<');
			// While touch is negative and lower than negative distance set in options
			// move forward
			else if (touchDistance < -Glide.options.touchDistance && touchDeg < 45) Core.Run.make('>');
			// While swipe don't reach distance apply previous transform
			else Core.Animation.make();

			// After animation
			Core.Animation.after(function(){
				// Enable events
				Core.Events.enable();
				// If autoplay start auto run
				Core.Run.play();
			});

			Glide.track
				.off('touchmove.glide mousemove.glide')
				.off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');

		}

	};


	// @return Module
	return new Module();

};
