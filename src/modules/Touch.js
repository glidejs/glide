var Touch = function (Glide, Core) {


	/**
	 * Touch Module Constructor
	 */
	function Module() {

		this.dragging = false;

		if (Glide.options.touchDistance) {
			$(document).on({
				'touchstart.glide mousedown.glide': $.proxy(this.start, this),
				'touchmove.glide mousemove.glide': $.proxy(this.move, this),
				'touchend.glide mouseup.glide': $.proxy(this.end, this)
			});
		}

	}


	/**
	 * Unbind touch events
	 */
	Module.prototype.unbind = function() {
		Glide.slider
			.unbind('touchstart.glide mousedown.glide')
			.unbind('touchmove.glide mousemove.glide')
			.unbind('touchend.glide mouseup.glide');
	};


	/**
	 * Start touch event
	 * @param  {Object} event
	 */
	Module.prototype.start = function(event) {

		// target is slider wrapper?
		var target = $(event.target).parents('.' + Glide.options.classes.wrapper).attr('class') == Glide.wrapper.attr('class');

		// Escape if events disabled
		// and event target is slider wrapper
		if (!Core.Events.disabled && !this.dragging && target) {

			// Pause if autoplay
			Core.Run.pause();
			// Turn on jumping flag
			Core.Transition.jumping = true;

			var touch;

			// Cache event
			if (event.type === 'mousedown') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.dragging = true;

		}

	};


	/**
	 * Touch move event
	 * @param  {Object} event
	 */
	Module.prototype.move = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled && this.dragging) {

			// Add dragging class
			Glide.wrapper.addClass(Glide.options.classes.dragging);

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

			// While angle is lower than 45 degree, prevent scrolling
			if ( (this.touchSin * 180 / Math.PI) < 45 ) {
				event.preventDefault();
			// Else escape from event, we don't want move slider
			} else {
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

		// If events not disabled and still dragging
		if (!Core.Events.disabled && this.dragging) {

			// Unset dragging
			this.dragging = false;
			// Disable other events
			Core.Events.disable();
			// Remove dragging class
			Glide.wrapper.removeClass(Glide.options.classes.dragging);
			// Turn off jumping flag
			Core.Transition.jumping = false;

			var touch;

			// Cache event
			if (event.type === 'mouseup' || event.type === 'mouseleave') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate touch distance
			var touchDistance = touch.pageX - this.touchStartX;
			// Calculate degree
			var touchDeg = this.touchSin * 180 / Math.PI;

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

		}

	};


	// @return Module
	return new Module();

};
