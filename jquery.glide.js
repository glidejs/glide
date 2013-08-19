/*
 * Glide.js
 * Simple & efficient jQuery slider
 * Autor: @JedrzejChalubek
 * url: http://jedrzejchalubek.com
 */
;(function ($, window, document, undefined) {
	var name = 'glide',
		defaults = {
			// {Int or Bool} False for turning off autoplay
			autoplay: 4000,
			/**
			 * Animation time 
			 * !!! IMPORTANT !!!
			 * That option will be use only, when css3 are not suported.
			 * If css3 are supported animation time is set in css declaration inside .css file
			 * @type {Int}
			 */
			animationTime: 500,

			// {Bool} Show/hide arrows
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

			// {Bool} Show/hide bullets navigation
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
		_.options = $.extend( {}, defaults, options);

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
			// Pause autoplay counting
			_.pause();
			// Next
			if (k.keyCode === 39) _.slide(1);
			// Prev
			if (k.keyCode === 37) _.slide(-1);
			// Start autoplay counting
			_.play();
		});

		/**
		 * Controller
		 * Mouse over slider
		 * When mouse is over slider, pause autoplay
		 * On out, start autoplay again
		 */
		_.parent.on('mouseover mouseout', function (e) {
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
			// Pasue autoplay
			_.pause();
			// Reinit plugin (set new slider dimensions)
			_.init();
			// Crop to current slide
			_.slide(0);
			// Start autoplay anew
			_.play();
		});

		/**
		 * Returning API
		 */
		return {
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
			}
		};
	}

	/**
	 * Change sildes on swipe event
	 */
	Glide.prototype.swipe = function() {
		// Cache
		var _ = this,
			touchStartX;

		/**
		 * Touch start
		 * @param  {Object} e event
		 */
		_.parent.on('touchstart', function(e) {
			// Cache event
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			
			// Prevent default reaction
			e.preventDefault();
			// Cache touch point
			touchStartX = touch.pageX;
		});

		/**
		 * Touch end
		 * @param  {Object} e event
		 */
		_.parent.on('touchend', function(e) {
			// Cache event
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			
			// Stop autoplay
			_.pause();
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
			// Start autoplay
			_.play();
		});

		
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
		 * Croping by increasing/decreasing slider wrapper margin.
		 * Mul slide width by current slide number.
		 */
		_.wrapper.stop()[_.animationType]({ 'margin-left': slidesSpread * currentSlide }, _.options.animationTime);

		// Set to navigation item current class
		if (_.options.nav) {
			_.nav.children()
				.eq(-currentSlide)
					.addClass(navCurrentClass)
						.siblings()
							.removeClass(navCurrentClass);
		}

		// Update current slide globaly
		_.currentSlide = currentSlide;

		// Callback
		if ( (callback !== 'undefined') && (typeof callback === 'function') ) callback();
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
	 * Building navigation DOM.
	 */
	Glide.prototype.build = function() {
		var _ = this;
		
		/**
		 * Arrows
		 * Append arrows wrapper
		 * Into wrapper append left and right arrow
		 */
		if (_.options.arrows && _.slides.length > 1) {

			_.arrows = $('<div />', {
				'class': _.options.arrowsWrapperClass
			}).appendTo(_.parent);

			// Cache
			var arrows = _.arrows;

			// Right arrow
			arrows.right = $('<a />', {
				'href': '#',
				'class': _.options.arrowMainClass + ' ' + _.options.arrowRightClass,
				// Direction and distance -> One forward
				'data-distance': '1',
				'html': _.options.arrowRightText
			}).appendTo(arrows);

			// Left arrow
			arrows.left = $('<a />', {
				'href': '#',
				'class': _.options.arrowMainClass + ' ' + _.options.arrowLeftClass,
				// Direction and distance -> One backward
				'data-distance': '-1',
				'html': _.options.arrowLeftText
			}).appendTo(arrows);

			/**
			 * Controller.
			 * On click in arrows or navigation, get distanceection and distance.
			 * Then slide specified distance. 
			 */
			arrows.children().on('click touchstart', function(e) {
				// prevent normal behaviour
				e.preventDefault();

				// Slide distance specified in data attribute
				_.slide( $(this).data('distance'), false );
			});
		}

		/**
		 * Bullet navigation
		 * Append navigation wrapper
		 * Into wrapper, append navigation item for each slide
		 */
		if (_.options.nav && _.slides.length > 1) {
			_.nav = $('<div />', {
				'class': _.options.navClass
			}).appendTo(_.parent);

			// Cache
			var nav = _.nav;

			// Generate navigation items
			for (var i = 0; i < _.slides.length; i++) {
				var item = $('<a />', {
					'href': '#',
					'class': _.options.navItemClass,
					// Direction and distance -> Item index forward
					'data-distance': i
				}).appendTo(nav);

				nav[i+1] = item;
			}

			// Cache
			var navChildren = nav.children();

			// If centered option is true
			if (_.options.navCenter) {
				// Center bullet navigation
				nav.css({
					'left': '50%',
					'width': navChildren.outerWidth(true) * navChildren.length,
					'margin-left': -nav.outerWidth(true)/2
				}).children().eq(0).addClass(_.options.navCurrentItemClass);
			}

			/**
			 * Controller.
			 * On click in arrows or navigation, get distanceection and distance.
			 * Then slide specified distance. 
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
	 * Initialize
	 * Get & set dimensions
	 * Set animation type
	 */
	Glide.prototype.init = function() {
		// Get sidebar width
		var sliderWidth = this.parent.width();
		// Get slide width
		this.slides.spread = sliderWidth;

		// Set wrapper width
		this.wrapper.width(sliderWidth * this.slides.length);
		// Set slide width
		this.slides.width(this.slides.spread);

		// If CSS3 Transition isn't supported set animation to $.animate()
		if ( !isCssSupported("transition") ) this.animationType = 'animate';
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