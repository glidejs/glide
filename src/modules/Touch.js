var Touch = function (Glide, Core) {


	function Module() {

		if (Glide.options.touchDistance) {
			Glide.slider.on({
				'touchstart.glide': Core.Events.throttle(this.start, Glide.options.throttle),
				'touchmove.glide': Core.Events.throttle(this.move, Glide.options.throttle),
				'touchend.glide': Core.Events.throttle(this.end, Glide.options.throttle)
			});
		}

	}

	Module.prototype.start = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.translate = Core.Translate.get();

		}

	};


	Module.prototype.move = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			if(Glide.options.autoplay) Core.Run.pause();

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

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
				// Move slider with swipe distance
				Glide.wrapper.css({
					transform: Core.Translate.set('x',
						(Glide.width * (Glide.current - 1 + Core.Build.clones.length/2)) - subExSx
					)
				});
			}

		}

	};


	Module.prototype.end = function(event) {

		// Escape if events disabled
		if (!Core.Events.disabled) {

			Core.Events.disable();

			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
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

				if (Glide.options.type !== 'slideshow') {
					Glide.wrapper.css({
						transition: Core.Transition.get('all'),
						transform: Core.Translate.set('x',
							(Glide.width * (Glide.current - 1 + Core.Build.clones.length/2)))
					});
				}

			}

			Core.Animation.after(function(){
				Core.Events.enable();
				if(Glide.options.autoplay) Core.Run.play();
			});

		}

	};


	// @return Module
	return new Module();

};
