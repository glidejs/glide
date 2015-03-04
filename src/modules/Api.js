/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

var Api = function (Glide, Core) {

	/**
	 * Construnct modules
	 * and inject Glide and Core as dependency
	 */
	function Module() {}

	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function () {

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
				return Core.Run.run(distance, callback);
			},

			/**
			 * Start autoplay
			 * @return {Core.Run}
			 */
			start: function(interval){
				Core.Run.started = true;
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
			}


		};

	};

	// @return Module
	return new Module();

};
