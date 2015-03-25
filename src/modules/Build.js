/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @param {Glide} Glide
 * @param {Core} Core
 * @return {Module}
 */

var Build = function (Glide, Core) {

	function Module() {
		this.clones = [];
		this.init();
	}


	Module.prototype.init = function() {
		this[Glide.options.type]();
		this.active();
		Core.Bullets.active();
	};


	Module.prototype.removeClones = function() {
		return Glide.wrapper.find('.clone').remove();
	};


	Module.prototype.slider = function() {

		if (Glide.current === Glide.length) Core.Arrows.hide('next');
		if (Glide.current === 1) Core.Arrows.hide('prev');

		Glide.wrapper.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.current - 1)),
		});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.carousel = function() {

		var firstClone = Glide.slides.filter(':first-child')
			.clone().addClass('clone');
		var lastClone = Glide.slides.filter(':last-child')
			.clone().addClass('clone');

		Glide.wrapper
			.append(firstClone.width(Glide.width))
			.prepend(lastClone.width(Glide.width))
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.current),
			});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.slideshow = function () {

		Glide.slides.eq(Glide.current - 1)
			.css({
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};

	return new Module();

};
