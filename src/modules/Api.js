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
			 * @return {Core.Animation}
			 */
			go: function(distance, callback) {
				return Core.Animation.run(distance, callback);
			},

			/**
			 * Start autoplay
			 * @return {Core.Animation}
			 */
			start: function(interval){
				Core.Animation.started = true;
				Glide.options.autoplay = parseInt(interval);
				return Core.Animation.play();
			},

			/**
			 * Play autoplay
			 * @return {Core.Animation}
			 */
			play: function(){
				return Core.Animation.play();
			},

			/**
			 * Pause autoplay
			 * @return {Core.Animation}
			 */
			pause: function() {
				return Core.Animation.pause();
			}


		};

	};

	// @return Module
	return new Module();

};
