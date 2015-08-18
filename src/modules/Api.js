/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

var Api = function(Glide, Core) {


	/**
	 * Api Module Constructor
	 */
	function Module() {}


	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function() {

		return {

			/**
			 * Get current slide index
			 * @return {int}
			 */
			current: function() {
				return Glide.current;
			},


			/**
			 * Go to specifed slide
			 * @param  {String}   distance
			 * @param  {Function} callback
			 * @return {Core.Run}
			 */
			go: function(distance, callback) {
				return Core.Run.make(distance, callback);
			},


			/**
			 * Jump without animation to specifed slide
			 * @param  {String}   distance
			 * @param  {Function} callback
			 * @return {Core.Run}
			 */
			jump: function(distance, callback) {
				// Let know that we want jumping
				Core.Transition.jumping = true;
				Core.Animation.after(function() {
					// Jumping done, take down flag
					Core.Transition.jumping = false;
				});
				return Core.Run.make(distance, callback);
			},


			/**
			 * Start autoplay
			 * @return {Core.Run}
			 */
			start: function(interval) {
				// We want running
				Core.Run.running = true;
				Glide.options.autoplay = parseInt(interval);
				return Core.Run.play();
			},


			/**
			 * Play autoplay
			 * @return {Core.Run}
			 */
			play: function(){
				return Core.Run.play();
			},


			/**
			 * Pause autoplay
			 * @return {Core.Run}
			 */
			pause: function() {
				return Core.Run.pause();
			},


			/**
			 * Destroy
			 * @return {Glide.slider}
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
			 * Refresh slider
			 * @return {Core.Run}
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


	// @return Module
	return new Module();


};
