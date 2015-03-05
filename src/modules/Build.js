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


	Module.prototype.slider = function() {

		Glide.wrapper.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.options.startAt - 1)),
		});

		Glide.slides.width(Glide.width);

	};

	Module.prototype.carousel = function() {

		this.clones.push(Glide.slides.filter(':first-child')
			.clone().addClass('clone'));

		this.clones.push(Glide.slides.filter(':last-child')
			.clone().addClass('clone'));

		Glide.wrapper
			.append(this.clones[0].width(Glide.width))
			.prepend(this.clones[1].width(Glide.width))
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.options.startAt),
			});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.slideshow = function () {

		Glide.slides.eq(Glide.options.startAt - 1)
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
