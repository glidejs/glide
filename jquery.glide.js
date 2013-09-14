/*
 * Glide.js
 * Ver: 1.0.1
 * Simple & efficient jQuery slider
 * Autor: @JedrzejChalubek
 * url: http://jedrzejchalubek.com
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {
	var name = 'glide',
		defaults = {
			// {Int or Bool} False for turning off autoplay
			autoplay: 4000,
			/**
			 * Animation time 
			 * !!! IMPORTANT !!!
			 * That option will be use only, when css3 are not suported
			 * If css3 are supported animation time is set in css declaration inside .css file
			 * @type {Int}
			 */
			animationTime: 500,

			/**
			 * {Bool or String} Show/hide/appendTo arrows
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			arrows: true,
			// {String} Arrows wrapper class
			arrowsWrapperClass: 'slider-arrows',
			// {String} Main class for both arrows
			arrowMainClass: 'slider-arrow',
			// {String} Right arrow
			arrowRightClass: 'slider-arrow--right',
			// {String} Right arrow text
			arrowRightText: 'next',
			// {String} Left arrow
			arrowLeftClass: 'slider-arrow--left',
			// {String} Left arrow text
			arrowLeftText: 'prev',

			/**
			 * {Bool or String} Show/hide/appendTo bullets navigation
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			nav: true,
			// {Bool} Center bullet navigation
			navCenter: true,
			// {String} Navigation class
			navClass: 'slider-nav',
			// {String} Navigation item class
			navItemClass: 'slider-nav__item',
			// {String} Current navigation item class
			navCurrentItemClass: 'slider-nav__item--current',

			// {Int or Bool} Touch settings
			touchDistance: 60
		};

	/**
	 * Slider Constructor
	 * @param {Object} parent
	 * @param {Object} options
	 */
	function Glide(parent, options) {
		var _ = this;
		_.options = $.extend({}, defaults, options);

		// Sidebar
		_.parent = parent;
		// Slides Wrapper
		_.wrapper = _.parent.children();
		// Slides
		_.slides = _.wrapper.children();
		// Current slide id
		_.currentSlide = 0;
		// Animation type
		_.animationType = 'css';

		// Initialize
		_.init();
		// Build DOM
		_.build();
		// Start autoplay
		_.play();

		/**
		 * Controller
		 * Keyboard left and right arrow keys
		 */
		$(document).on('keyup', function(k) {

				// Next
				if (k.keyCode === 39) _.slide(1);
				// Prev
				if (k.keyCode === 37) _.slide(-1);

		});

		/**
		 * Controller
		 * Mouse over slider
		 * When mouse is over slider, pause autoplay
		 * On out, start autoplay again
		 */
		_.parent.add(_.arrows).add(_.nav).on('mouseover mouseout', function (e) {
			// Pasue autoplay
			_.pause();
			// When mouse left slider or touch end, start autoplay anew
			if (e.type === 'mouseout') _.play();
		});

		/**
		 * Controller
		 * Touch events
		 */
		if (_.options.touchDistance) {
			// Init swipe
			_.swipe();
		}

		/**
		 * Controller
		 * When resize browser window
		 * Pause autoplay in fear of escalation
		 * Reinit plugin for new slider dimensions
		 * Correct crop to current slide
		 * Start autoplay from beginning
		 */
		$(window).on('resize', function() {
			// Reinit plugin (set new slider dimensions)
			_.init();
			// Crop to current slide
			_.slide(0);
		});

		/**
		 * Returning API
		 */
		return {
			current: function() {
				return -(_.currentSlide) + 1;
			},
			play: function() {
				_.play();
			},
			pause: function() {
				_.pause();
			},
			next: function(callback) {
				_.slide(1, false, callback);
			},
			prev: function(callback) {
				_.slide(-1, false, callback);
			},
			jump: function(distance, callback) {
				_.slide(distance-1, true, callback);
			},
			nav: function(target) {
				/**
				 * If navigation wrapper already exist
				 * Remove it, protection before doubled navigation
				 */
				if (_.navWrapper) {
					_.navWrapper.remove();
				}
				_.options.nav = (target) ? target : _.options.nav;
				// Build
				_.navigation();
			},
			arrows: function(target) {
				/**
				 * If arrows wrapper already exist
				 * Remove it, protection before doubled arrows
				 */
				if (_.arrowsWrapper) {
					_.arrowsWrapper.remove();
				}
				_.options.arrows = (target) ? target : _.options.arrows;
				// Build
				_.arrows();
			}
		};
	}

	/**
	 * Building slider DOM
	 */
	Glide.prototype.build = function() {
		var _ = this;
		
		/**
		 * Arrows
		 * If option is true and there is more than one slide
		 * Append left and right arrow
		 */
		if (_.options.arrows) _.arrows();

		/**
		 * Navigation
		 * If option is true and there is more than one slide
		 * Append navigation item for each slide
		 */
		if (_.options.nav) _.navigation();
	};

	/**
	 * Building navigation DOM
	 */
	Glide.prototype.navigation = function() {
		var _ = this;

		if (_.slides.length > 1) {
			// Cache
			var o = _.options,
				/**
				 * Setting append target
				 * If option is true set default target, that is slider wrapper
				 * Else get target set in options
				 * @type {Bool or String}
				 */
				target = (_.options.nav === true) ? _.parent : _.options.nav;

			// Navigation wrapper
			_.navWrapper = $('<div />', {
				'class': o.navClass
			}).appendTo(target);

			// Cache
			var nav = _.navWrapper,
				item;

			// Generate navigation items
			for (var i = 0; i < _.slides.length; i++) {
				item = $('<a />', {
					'href': '#',
					'class': o.navItemClass,
					// Direction and distance -> Item index forward
					'data-distance': i
				}).appendTo(nav);

				nav[i+1] = item;
			}

			// Cache
			var navChildren = nav.children();
			
			// Add navCurrentItemClass to the first navigation item
			navChildren.eq(0).addClass(o.navCurrentItemClass);
			
			// If centered option is true
			if (o.navCenter) {
				// Center bullet navigation
				nav.css({
					'left': '50%',
					'width': navChildren.outerWidth(true) * navChildren.length,
					'margin-left': -nav.outerWidth(true)/2
				});
			}

			/**
			 * Controller
			 * On click in arrows or navigation, get direction and distance
			 * Then slide specified distance
			 */
			navChildren.on('click touchstart', function(e) {
				// prevent normal behaviour
				e.preventDefault();
				// Slide distance specified in data attribute
				_.slide( $(this).data('distance'), true );
			});
		}
	};

	/**
	 * Building arrows DOM
	 */
	Glide.prototype.arrows = function() {
		var _ = this;
		
		if (_.slides.length > 1) {
			var o = _.options,
				/**
				 * Setting append target
				 * If option is true set default target, that is slider wrapper
				 * Else get target set in options
				 * @type {Bool or String}
				 */
				target = (_.options.arrows === true) ? _.parent : _.options.arrows;

			// Arrows wrapper
			_.arrowsWrapper = $('<div />', {
				'class': o.arrowsWrapperClass
			}).appendTo(target);

			// Cache
			var arrows = _.arrowsWrapper;

			// Right arrow
			arrows.right = $('<a />', {
				'href': '#',
				'class': o.arrowMainClass + ' ' + o.arrowRightClass,
				// Direction and distance -> One forward
				'data-distance': '1',
				'html': o.arrowRightText
			}).appendTo(arrows);

			// Left arrow
			arrows.left = $('<a />', {
				'href': '#',
				'class': o.arrowMainClass + ' ' + o.arrowLeftClass,
				// Direction and distance -> One backward
				'data-distance': '-1',
				'html': o.arrowLeftText
			}).appendTo(arrows);

			/**
			 * Controller
			 * On click in arrows or navigation, get direction and distance
			 * Then slide specified distance
			 */
			arrows.children().on('click touchstart', function(e) {
				// prevent normal behaviour
				e.preventDefault();
				// Slide distance specified in data attribute
				_.slide( $(this).data('distance'), false );
			});
		}
	};


	/**
	 * Slides change & animate logic
	 * @param  {int} distance
	 * @param  {bool} jump
	 * @param  {function} callback
	 */
	Glide.prototype.slide = function(distance, jump, callback) {
		// Cache elements 
		var _ = this,
			currentSlide = (jump) ? 0 : _.currentSlide,
			slidesLength = -(_.slides.length-1),
			navCurrentClass = _.options.navCurrentItemClass,
			slidesSpread = _.slides.spread;

		// Before animating clear autoplay
		_.clearAutoplay(function(){		
			/**
			 * Check if current slide is first and direction is previous, then go to last slide
			 * or current slide is last and direction is next, then go to the first slide
			 * else change current slide normally
			 */
			if ( currentSlide === 0 && distance === -1 ) {
				currentSlide = slidesLength;
			} else if ( currentSlide === slidesLength && distance === 1 ) {
				currentSlide = 0;
			} else {
				currentSlide = currentSlide + (-distance);
			}

			/**
			 * Crop to current slide.
			 * Mul slide width by current slide number.
			 */
			var translate = slidesSpread * currentSlide + 'px';

			// While CSS translate is supported
			if (_.animationType === 'css') {
				// Croping by increasing/decreasing slider wrapper translate
				_.wrapper.css({
					'-webkit-transform': 'translate3d('+ translate +', 0px, 0px)', 
					'-moz-transform': 'translate3d('+ translate +', 0px, 0px)', 
					'-ms-transform': 'translate3d('+ translate +', 0px, 0px)', 
					'-o-transform': 'translate3d('+ translate +', 0px, 0px)', 
					'transform': 'translate3d('+ translate +', 0px, 0px)' 
				});
			// Else use $.animate()
			} else {
				// Croping by increasing/decreasing slider wrapper margin
				_.wrapper.stop()[_.animationType]({ 'margin-left': translate }, _.options.animationTime);
			}

			// Set to navigation item current class
			if (_.options.nav) {
				_.navWrapper.children()
					.eq(-currentSlide)
						.addClass(navCurrentClass)
							.siblings()
								.removeClass(navCurrentClass);
			}

			// Update current slide globaly
			_.currentSlide = currentSlide;

			// Callback
			if ( (callback !== 'undefined') && (typeof callback === 'function') ) callback();
		});
	};

	/**
	 * Autoplay logic
	 * Setup counting
	 */
	Glide.prototype.play = function() {
		var _ = this;

		if (_.options.autoplay) {
			_.auto = setInterval(function() {
				_.slide(1, false);
			}, _.options.autoplay);
		}
	};

	/**
	 * Autoplay pause
	 * Clear counting
	 */
	Glide.prototype.pause = function() {
		if (this.options.autoplay) {
			this.auto = clearInterval(this.auto);
		}
	};

	/**
	 * Reset autoplay timer
	 * @param  {Function} callback
	 */
	Glide.prototype.clearAutoplay = function(callback) {
		this.pause();
		(typeof callback === 'function') ? callback() : callback;
		this.play();
	};

	/**
	 * Change sildes on swipe event
	 */
	Glide.prototype.swipe = function() {
		// Cache
		var _ = this,
			touch,
			touchDistance,
			touchStartX;

		/**
		 * Touch start
		 * @param  {Object} e event
		 */
		_.parent.on('touchstart', function(e) {
			// Cache event
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			
			// Get touch points
			touchStartX = touch.pageX;
		});

		/**
		 * Touch end
		 * @param  {Object} e event
		 */
		_.parent.on('touchend', function(e) {
			// Cache event
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			
			// Calculate touch distance
			touchDistance = touch.pageX - touchStartX;


				// While touch is positive and greater than distance set in options
				if ( touchDistance > _.options.touchDistance ) {
					// Slide one backward
					_.slide(-1);
				// While touch is negative and lower than negative distance set in options
				} else if ( touchDistance < -_.options.touchDistance) {
					// Slide one forward
					_.slide(1);
				}

		});
	};

	/**
	 * Initialize
	 * Get & set dimensions
	 * Set animation type
	 */
	Glide.prototype.init = function() {
		var _ = this,	
		// Get sidebar width
		sliderWidth = _.parent.width();
		// Get slide width
		_.slides.spread = sliderWidth;

		// Set wrapper width
		_.wrapper.width(sliderWidth * _.slides.length);
		// Set slide width
		_.slides.width(_.slides.spread);

		// If CSS3 Transition isn't supported set animation to $.animate()
		if ( !isCssSupported("transition") || !isCssSupported("transform") ) _.animationType = 'animate';
	};

	/**
	 * Function to check css3 support
	 * @param  {String}  declaration name
	 * @return {Boolean}
	 */
	function isCssSupported(declaration) {
		var supported = false,
			prefixes = 'Khtml Ms O Moz Webkit'.split(' '),
			clone = document.createElement('div'),
			declarationCapital = null;

		declaration = declaration.toLowerCase();

		if (clone.style[declaration]) supported = true;
		if (supported === false) {
			declarationCapital = declaration.charAt(0).toUpperCase() + declaration.substr(1);
			for( var i = 0; i < prefixes.length; i++ ) {
				if( clone.style[prefixes[i] + declarationCapital ] !== undefined ) {
					supported = true;
					break;
				}
			}
		}

		return supported;
	}

	$.fn[name] = function (options) {
		return this.each(function () {
			if ( !$.data(this, 'api_' + name) ) {
				$.data(this, 'api_' + name,
					new Glide($(this), options)
				);
			}
		});
	};

})(jQuery, window, document);