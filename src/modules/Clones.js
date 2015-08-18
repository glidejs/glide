/**
 * --------------------------------
 * Glide Clones
 * --------------------------------
 * Clones module
 * @return {Glide.Clones}
 */

var Clones = function(Glide, Core) {

	var pointer;
	var appendClones;
	var prependClones;

	/**
	 * Clones Module Constructor
	 */
	function Module() {
		this.init();
	}


	Module.prototype.init = function() {
		this.shift = 0;
		this.growth = Glide.width * Glide.clones.length;

		pointer = Glide.clones.length / 2;
		appendClones = Glide.clones.slice(0, pointer);
		prependClones = Glide.clones.slice(pointer);

		return this;
	};


	/**
	 * Append cloned slides before
	 * and after real slides
	 */
	Module.prototype.append = function() {

		var clone;

		for(clone in appendClones) {
			appendClones[clone]
				.width(Glide.width)
				.appendTo(Glide.track);
		}

		for(clone in prependClones) {
			prependClones[clone]
				.width(Glide.width)
				.prependTo(Glide.track);
		}

	};


	/**
	 * Remove cloned slides
	 */
	Module.prototype.remove = function() {
		return Glide.track.find('.' + Glide.options.classes.clone).remove();
	};


	// @return Module
	return new Module();


};
