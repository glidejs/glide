/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * Core logic module
 * @param {Glide} Glide
 * @param {Animation} Animation
 * @return {Module}
 */

var Build = function (Glide, Core) {

	function Module() {

		this.clones = {};

		this[Glide.options.type]();
		this.active();

	}

	Module.prototype.slider = function() {

		Glide.wrapper.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.options.startAt - 1)),
			'transition': Core.Transition.get('translate')
		});

		Glide.slides.width(Glide.width);

	};

	Module.prototype.carousel = function() {

		this.clones.first = Glide.slides.filter(':first-child')
			.clone().addClass('clone').width(Glide.width);

		this.clones.last = Glide.slides.filter(':last-child')
			.clone().addClass('clone').width(Glide.width);

		Glide.wrapper
			.append(this.clones.first)
			.prepend(this.clones.last)
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.options.startAt),
				'transition': Core.Transition.get('translate')
			});

		Glide.slides.width(Glide.width);

	};


	Module.prototype.slideshow = function () {

		Glide.slides.eq(Glide.options.startAt - 1)
			.css({
				'transition': Core.Transition.get('translate'),
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

		Core.Bullets.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};

	return new Module();

};
