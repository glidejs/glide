/**
 * --------------------------------
 * Glide Main
 * --------------------------------
 * Responsible for slider initiation,
 * extending defaults, returning public api
 * @return {Glide}
 */

var Glide = (function (self) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		autoplay: 2000,
		type: 'slider',
		startAt: 1,
		hoverpause: true,
		animationDuration: 500,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		classes: {
			base: 'glide',
			wrapper: 'glide__wrapper',
			slide: 'glide__slide',
			arrows: 'glide__arrows',
			arrow: 'glide__arrow',
			bullets: 'glide__bullets',
			bullet: 'glide__bullet'
		},
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
	};


	/**
	 * Init Glide
	 * @param  {jquery} element
	 * @param  {object} options
	 * @return {Glide.Api}
	 */
	self.init = function (element, options) {

		self.element = element;
		self.options = $.extend({}, defaults, options);

		Glide.Core.init();

		// console.log(element.attr('id'));

		// Glide.Arrows.items.each(function(i, el){
		// 	console.log($._data( el[0], 'events' ));
		// });
		// console.log("================");

		return Glide.Api.instance();

	};

	return self;

}(Glide || {}));
