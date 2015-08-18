/**
 * --------------------------------
 * Glide Clones
 * --------------------------------
 * Clones module
 * @return {Clones}
 */

var Clones = function(Glide, Core) {


	var map = [0,1];
	var pattern;


	/**
	 * Clones Module Constructor
	 */
	function Module() {
		this.init();
	}


	Module.prototype.init = function() {
		this.items = [];

		this.map();
		this.collect();

		this.shift = 0;
		this.growth = Glide.width * this.items.length;

		return this;
	};

	/**
	 * Map clones length
	 * to pattern
	 */
	Module.prototype.map = function() {
		pattern = [];

		for(var i in map) {
			pattern.push(-1-i, i);
		}
	};

	/**
	 * Collect clones
	 * with maped pattern
	 */
	Module.prototype.collect = function() {
		var item;

		for(var i in pattern) {
			item = Glide.slides.eq(pattern[i])
					.clone().addClass(Glide.options.classes.clone);

			this.items.push(item);
		}
	};


	/**
	 * Append cloned slides before
	 * and after real slides
	 */
	Module.prototype.append = function() {
		var item;

		for (var i in this.items) {
			item = this.items[i].width(Glide.width);

			if (pattern[i] >= 0) item.appendTo(Glide.track);
			else item.prependTo(Glide.track);
		}
	};


	/**
	 * Remove cloned slides
	 */
	Module.prototype.remove = function() {
		for (var i in this.items) {
			this.items[i].remove();
		}

		return this;
	};


	// @return Module
	return new Module();


};
