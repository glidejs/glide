/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * Core logic module
 * @return {Glide.Core}
 */

Glide.Core = (function (self) {


	self.init = function () {

		self.slider = Glide.element.addClass(Glide.options.classes.base + '--' + Glide.options.type);
		self.wrapper = self.slider.children('.' + Glide.options.classes.wrapper);
		self.slides = self.wrapper.children('.' + Glide.options.classes.slide);

		self.current = parseInt(Glide.options.startAt);
		self.width = self.slider.width();
		self.length = self.slides.length;

		self['build' + Glide.Helper.capitalise(Glide.options.type)]();

		Glide.Arrows.init();
		Glide.Bullets.init();
		Glide.Animation.play();

		self.setActive();
		self.bind();

	};


	self.bind = function () {

		if (Glide.options.hoverpause) {
			self.slider
				.on('mouseover.glideKeyup', function(){
					Glide.Animation.pause();
				})
				.on('mouseout.glideKeyup', function(){
					Glide.Animation.play();
				})
				.on('keyup.glideKeyup', function(event){
					if (event.keyCode === 39) Glide.Animation.run('>');
					if (event.keyCode === 37) Glide.Animation.run('<');
				});

		}

	};


	self.setActive = function () {

		self.slides
			.eq(self.current - 1).addClass('active')
			.siblings().removeClass('active');

		Glide.Bullets.items
			.eq(self.current - 1).addClass('active')
			.siblings().removeClass('active');

	};


	self.buildSlider = function () {

		self.wrapper.css({
			'width': self.width * self.length,
			'transform': Glide.Animation.getTranslate('x', self.width * (Glide.options.startAt - 1))
		});

		self.slides.width(self.width);

	};


	self.buildCarousel = function () {

		var firstClone = self.slides.filter(':first-child')
			.clone().addClass('isCloned').width(Glide.Core.width);

		var lastClone = self.slides.filter(':last-child')
			.clone().addClass('isCloned').width(Glide.Core.width);

		self.wrapper
			.append(firstClone)
			.prepend(lastClone)
			.css({
				'width': (self.width * self.length) + (Glide.Core.width * 2),
				'transform': Glide.Animation.getTranslate('x', Glide.Core.width * Glide.options.startAt)
			});

		self.slides.width(self.width);

	};


	self.buildSlideshow = function () {

		self.slides.eq(Glide.options.startAt - 1)
			.css({
				'opacity': 1,
				'z-index': 1
			})
			.siblings().css('opacity', 0);

	};


	return self;


}(Glide.Core || {}));
