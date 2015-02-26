var Touch = function (Glide, Core) {


	function Module() {

		if (Glide.options.touchDistance) {
			Glide.slider.on({
				'touchstart': this.start,
				'touchmove': this.move,
				'touchend': this.end
			});
		}

	}

	Module.prototype.start = function(event) {

		// Escape if events disabled
		if (Core.Events.disabled) return;

		// Cache event
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

		// Get touch start points
		this.touchStartX = parseInt(touch.pageX);
		this.touchStartY = parseInt(touch.pageY);
		this.touchSin = null;
		this.translate = Core.Translate.get();

	};


	Module.prototype.move = function(event) {

		// Escape if events disabled
		if (Core.Events.disabled) return;

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

		// var translate = Core.Translate.get() - subExSx/10;

		// console.log(translate);

		// if (translate > 0) {
		// 	Glide.wrapper.css({
		// 		transform: Core.Translate.set('x', Core.Translate.get() - subExSx/10)
		// 	});
		// } else {
		// 	Glide.wrapper.css({
		// 		transform: Core.Translate.set('x', Core.Translate.get() - subExSx/10)
		// 	});
		// }

	};


	Module.prototype.end = function(event) {

		// Escape if events disabled
		if (Core.Events.disabled) return;
		if(Glide.options.autoplay) Core.Animation.pause();
		Core.Events.disable();

		// Cache event
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

		// Calculate touch distance
		var touchDistance = touch.pageX - this.touchStartX;

		// While touch is positive and greater than distance set in options
		if ( (touchDistance > Glide.options.touchDistance) && ( (this.touchSin * (180 / Math.PI)) < 45) ) {
			// Slide one backward
			Core.Animation.run('<');
		// While touch is negative and lower than negative distance set in options
		} else if (
			(touchDistance < -Glide.options.touchDistance) && ( (this.touchSin * (180 / Math.PI)) < 45) ) {
			// Slide one forward
			Core.Animation.run('>');
		}

		Core.Animation.after(function(){
			Core.Events.enable();
			if(Glide.options.autoplay) Core.Animation.play();
		});

	};


	// @return Module
	return new Module();

};
