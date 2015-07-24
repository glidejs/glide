/**
 * --------------------------------
 * Glide Clones
 * --------------------------------
 * Clones module
 * @return {Glide.Clones}
 */

var Clones = function(Glide, Core) {


	/**
	 * Clones Module Constructor
	 */
	function Module() {

		this.shift = 0;
		this.growth = Glide.width * Glide.clones.length;

		this.pointer = Glide.clones.length / 2;
		this.appendClones = Glide.clones.slice(0, this.pointer);
		this.prependClones = Glide.clones.slice(this.pointer);

	}


	/**
	 * Append cloned slides before
	 * and after real slides
	 */
	Module.prototype.append = function() {

		var clone;

		for(clone in this.appendClones) {
			this.appendClones[clone]
				.width(Glide.width)
				.appendTo(Glide.track);
		}

		for(clone in this.prependClones) {
			this.prependClones[clone]
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
