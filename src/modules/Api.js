/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

Glide.Api = (function (self) {


	/**
	 * Api instance
	 * @return {object}
	 */
	self.instance = function () {
		return {
			reinit: Glide.Core.init,
			current: Glide.Api.current,
			go: Glide.Animation.run,
			play: Glide.Animation.play,
			pause: Glide.Animation.pause
		};
	};


	/**
	 * Get current slide index
	 * @return {int}
	 */
	self.current = function () {
		return Glide.Core.current;
	};


	// @return module
	return self;


}(Glide.Api || {}));
