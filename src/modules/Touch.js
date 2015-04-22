var Touch = function (Glide, Core) {


	/**
	 * Touch Module Constructor
	 */
	function Module() {

		this.dragging = false;

		if (Glide.options.touchDistance) {
			Glide.wrapper.on({
				'touchstart.glide mousedown.glide': Core.Events.throttle(this.start, Glide.options.throttle),
				'touchmove.glide mousemove.glide': Core.Events.throttle(this.move, Glide.options.throttle),
				'touchend.glide mouseup.glide mouseleave.gilde': Core.Events.throttle(this.end, Glide.options.throttle)
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

		// Escape if events disabled
		if (!Core.Events.disabled && !this.dragging) {

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

			// Pause if autoplay
			if(Glide.options.autoplay) Core.Run.pause();
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

			if ( (this.touchSin * (180 / Math.PI)) < 45 ) event.preventDefault();
			else return;

			if (Glide.options.type !== 'slideshow') {
				Glide.wrapper[0].style.transition = '';
				Glide.wrapper[0].style.transform = Core.Translate.set('x', (Glide.width * (Glide.current - 1 + Glide.clones.length/2)) - subExSx/2);
			}

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

			var touch;

			// Cache event
			if (event.type === 'mouseup' || event.type === 'mouseleave') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate touch distance
			var touchDistance = touch.pageX - this.touchStartX;
			// Calculate degree
			var touchDeg = this.touchSin * (180 / Math.PI);

			// While touch is positive and greater than distance set in options
			if (touchDistance > Glide.options.touchDistance && touchDeg < 45) Core.Run.make('<');
			// While touch is negative and lower than negative distance set in options
			else if (touchDistance < -Glide.options.touchDistance && touchDeg < 45) Core.Run.make('>');
			// While swipe don't reach distance appy previous transform
			else {

				// If slider type is not slideshow
				if (Glide.options.type !== 'slideshow') {
					// Restore the starting position
					Glide.wrapper[0].style.transition = Core.Transition.get('all');
					Glide.wrapper[0].style.transform = Core.Translate.set('x', (Glide.width * (Glide.current - 1 + Glide.clones.length/2)));
				}

			}

			// After animation
			Core.Animation.after(function(){
				// Enable events
				Core.Events.enable();
				// If autoplay start auto run
				if(Glide.options.autoplay) Core.Run.play();
			});

		}

	};


	// @return Module
	return new Module();

};
