/*!
 * Glide.js v3.0.0
 * (c) 2013-2017 Jędrzej Chałubek <jedrzej.chalubek@gmail.com>
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Glide = factory());
}(this, (function () { 'use strict';

/**
 * Outputs warning message to the boswer console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: " + msg);
}

/**
 * Finds siblings elements of the passed node.
 *
 * @param  {HTMLElement} node
 * @return {Array}
 */
function siblings(node) {
  var n = node.parentNode.firstChild;
  var matched = [];

  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      matched.push(n);
    }
  }

  return matched;
}

/**
 * Checks if precised node exist and is a valid element.
 *
 * @param  {HTMLElement} node
 * @return {Boolean}
 */
function exist(node) {
  if (node && node instanceof HTMLElement) {
    return true;
  }

  return false;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var DOM = function () {
  function DOM() {
    classCallCheck(this, DOM);
  }

  createClass(DOM, [{
    key: 'init',

    /**
     * Setup slider HTML nodes.
     *
     * @param  {String|HTMLElement} element
     */
    value: function init(element) {
      this.element = element;
      this.track = this.element.querySelector('[data-glide="track"]');
    }

    /**
     * Gets node of the slider main element.
     *
     * @return {Object}
     */

  }, {
    key: 'element',
    get: function get$$1() {
      return this.el;
    }

    /**
     * Sets node of the slider main element.
     *
     * @return {Object}
     */
    ,
    set: function set$$1(el) {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      if (exist(el)) {
        this.el = el;
      } else {
        warn('Main element must be a existing HTML node');
      }
    }

    /**
     * Gets node of the slides track.
     *
     * @return {Object}
     */

  }, {
    key: 'track',
    get: function get$$1() {
      return this.tr;
    }

    /**
     * Sets node of the slides track.
     *
     * @return {Void}
     */
    ,
    set: function set$$1(tr) {
      if (exist(tr)) {
        this.tr = tr;
      } else {
        warn('Could not find track element. Please use [' + TRACK_ATTRIBUTE + '] attribute.');
      }
    }

    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */

  }, {
    key: 'wrapper',
    get: function get$$1() {
      return this.track.children[0];
    }

    /**
     * Gets collection of the slide nodes.
     *
     * @return {Array}
     */

  }, {
    key: 'slides',
    get: function get$$1() {
      return this.wrapper.children;
    }
  }]);
  return DOM;
}();

var DOM$1 = new DOM();

/**
 * Generates "unique" identifier number.
 *
 * @return {Number}
 */
function uid() {
  return new Date().valueOf();
}

var Core = function () {
  /**
   * Construct core.
   *
   * @param {Integer} id
   */
  function Core(id) {
    classCallCheck(this, Core);

    this.id = id;
    this.destroyed = false;
  }

  /**
   * Checks if slider is a precised type.
   *
   * @param  {String} name
   * @return {Boolean}
   */


  createClass(Core, [{
    key: 'isType',
    value: function isType(name) {
      return this.settings.type === name;
    }

    /**
     * Checks if slider is in precised mode.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: 'isMode',
    value: function isMode(name) {
      return this.settings.mode === name;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: 'settings',
    get: function get$$1() {
      return this.opt;
    }

    /**
     * Sets value of the core options.
     *
     * @param  {Object} opt
     * @return {Void}
     */
    ,
    set: function set$$1(opt) {
      if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) === 'object') {
        this.opt = opt;
      } else {
        warn('Options must be an `object` instance.');
      }
    }

    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: 'index',
    get: function get$$1() {
      return this.i;
    }

    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set$$1(i) {
      this.i = parseInt(i);
    }
  }]);
  return Core;
}();

var Core$1 = new Core(uid());

var MODE_TO_DIMENSIONS = {
  horizontal: ['width', 'x'],
  vertical: ['height', 'y']
};

var Dimensions = function () {
  function Dimensions() {
    classCallCheck(this, Dimensions);
  }

  createClass(Dimensions, [{
    key: 'apply',
    value: function apply() {
      var dimention = this.dimention.size;

      this.setupSlides(dimention);
      this.setupWrapper(dimention);
    }
  }, {
    key: 'setupSlides',
    value: function setupSlides(dimention) {
      for (var i = 0; i < DOM$1.slides.length; i++) {
        DOM$1.slides[i].style[dimention] = this.slideSize + 'px';
      }
    }
  }, {
    key: 'setupWrapper',
    value: function setupWrapper(dimention) {
      DOM$1.wrapper.style[dimention] = this.slideSize * this.length + 'px';
    }
  }, {
    key: 'dimention',
    get: function get$$1() {
      var settings = Core$1.settings;

      return {
        size: MODE_TO_DIMENSIONS[settings.mode][0],
        axis: MODE_TO_DIMENSIONS[settings.mode][1]
      };
    }
  }, {
    key: 'slideSize',
    get: function get$$1() {
      var dimention = this.dimention;

      if (Core$1.isMode('vertical')) {
        return this.slideHeight;
      }

      return this.slideWidth;
    }
  }, {
    key: 'length',
    get: function get$$1() {
      return DOM$1.slides.length;
    }
  }, {
    key: 'width',
    get: function get$$1() {
      return DOM$1.element.offsetWidth;
    }
  }, {
    key: 'height',
    get: function get$$1() {
      return DOM$1.element.offsetHeight;
    }
  }, {
    key: 'slideWidth',
    get: function get$$1() {
      return DOM$1.element.offsetWidth / Core$1.settings.perView;
    }
  }, {
    key: 'slideHeight',
    get: function get$$1() {
      return DOM$1.element.offsetHeight / Core$1.settings.perView;
    }
  }]);
  return Dimensions;
}();

var Dimensions$1 = new Dimensions();

/**
 * Collection of available translate axes.
 *
 * @type {Object}
 */
var AXES = {
  x: 0,
  y: 0,
  z: 0
};

var Translate = function () {
  function Translate() {
    classCallCheck(this, Translate);
  }

  createClass(Translate, [{
    key: 'get',

    /**
     * Gets value of translate.
     *
     * @param  {Integer} value
     * @return {String}
     */
    value: function get$$1(value) {
      AXES[Dimensions$1.dimention.axis] = parseInt(value);

      return 'translate3d(' + -1 * AXES.x + 'px, ' + -1 * AXES.y + 'px, ' + -1 * AXES.z + 'px)';
    }

    /**
     * Sets value of translate.
     *
     * @param {HTMLElement} el
     * @return {self}
     */

  }, {
    key: 'set',
    value: function set$$1(el, value) {
      el.style.transform = this.get(value);

      return this;
    }
  }]);
  return Translate;
}();

var Translate$1 = new Translate();

var Transition = function () {
    function Transition() {
        classCallCheck(this, Transition);

        this.jumping = false;
    }

    /**
     * Gets value of transition.
     *
     * @param {String} property
     * @return {String}
     */


    createClass(Transition, [{
        key: 'get',
        value: function get$$1() {
            var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

            var settings = Core$1.settings;

            if (!this.jumping) {
                return property + ' ' + settings.animationDuration + 'ms ' + settings.animationTimingFunc;
            }

            return property + ' 0ms ' + settings.animationTimingFunc;
        }

        /**
         * Sets value of transition.
         *
         * @param {HTMLElement} el
         * @return {self}
         */

    }, {
        key: 'set',
        value: function set$$1(el) {
            el.style.transition = this.get();

            return this;
        }
    }]);
    return Transition;
}();

var Transition$1 = new Transition();

var Animation = function () {
  /**
   * Construct animation.
   */
  function Animation() {
    classCallCheck(this, Animation);

    this.displacement = 0;
  }

  /**
   * Make configured animation type.
   *
   * @param  {Number} displacement
   * @return {self}
   */


  createClass(Animation, [{
    key: 'make',
    value: function make(offset) {
      this.offset = offset;

      this[Core$1.settings.type]();

      return this;
    }

    /**
     * Slider animation type.
     *
     * @return {Void}
     */

  }, {
    key: 'slider',
    value: function slider() {
      var translate = Dimensions$1.slideSize * Core$1.index;

      Transition$1.set(DOM$1.wrapper);
      Translate$1.set(DOM$1.wrapper, translate);
    }

    /**
     * Run callback after animation.
     *
     * @param  {Closure} callback
     * @return {Integer}
     */

  }, {
    key: 'after',
    value: function after(callback) {
      return setTimeout(function () {
        callback();
      }, Core$1.settings.animationDuration + 20);
    }
  }, {
    key: 'offset',
    get: function get$$1() {
      return this.displacement;
    },
    set: function set$$1(value) {
      this.displacement = typeof value !== 'undefined' ? parseInt(value) : 0;
    }
  }]);
  return Animation;
}();

var Animation$1 = new Animation();

// /**
//  * Animation module.
//  *
//  * @param {Object} Glide
//  * @param {Object} Core
//  * @return {Animation}
//  */
// var Animation = function(Glide, Core) {

//     /**
//      * Animation offset value.
//      *
//      * @var {Number}
//      */
//     var offset;

//     /**
//      * Animation constructor.
//      */
//     function Animation() {

//     }

//     /**
//      * Make configured animation type.
//      *
//      * @param  {Number} displacement
//      * @return {self}
//      */
//     Animation.prototype.make = function(displacement) {
//         // Do not run if we have only one slide.
//         if (! Core.Run.canProcess()) {
//             return Core.Arrows.disable();
//         }

//         // Parse displacement to integer before use.
//         offset = (typeof displacement !== 'undefined') ? parseInt(displacement) : 0;

//         // Animation actual translate animation
//         this[Glide.options.type]();

//         return this;
//     };


//     /**
//      * After animation callback.
//      *
//      * @param  {Function} callback
//      * @return {Integer}
//      */
//     Animation.prototype.after = function(callback) {
//         return setTimeout(function() {
//             callback();
//         }, Glide.options.animationDuration + 20);
//     };


//     /**
//      * Slider animation type.
//      *
//      * @return {Void}
//      */
//     Animation.prototype.slider = function() {

//         var translate = Glide[Glide.size] * (Glide.current - 1);
//         var shift = Core.Clones.shift - Glide.paddings;

//         // If we are on the first slide.
//         if (Core.Run.isStart()) {
//             if (Glide.options.centered) {
//                 shift = Math.abs(shift);
//             }
//             // Shift is zero.
//             else {
//                 shift = 0;
//             }
//             // Hide previous arrow.
//             Core.Arrows.disable('prev');
//         }

//         // If we are on the last slide.
//         else if (Core.Run.isEnd()) {
//             if (Glide.options.centered) {
//                 shift = Math.abs(shift);
//             }
//             // Double and absolute shift.
//             else {
//                 shift = Math.abs(shift * 2);
//             }
//             // Hide next arrow.
//             Core.Arrows.disable('next');
//         }

//         // We are not on the edge cases.
//         else {
//             // Absolute shift
//             shift = Math.abs(shift);
//             // Show arrows.
//             Core.Arrows.enable();
//         }

//         // Apply translate to
//         // the slider track.
//         Glide.track.css({
//             'transition': Core.Transition.get('all'),
//             'transform': Core.Translate.set(Glide.axis, translate - shift - offset)
//         });

//     };


//     /**
//      * Carousel animation type
//      *
//      * @return {Void}
//      */
//     Animation.prototype.carousel = function() {

//         // Get translate value by multiplying two
//         // slider size and current slide number.
//         var translate = Glide[Glide.size] * Glide.current;

//         // Get animation shift.
//         var shift;

//         // Calculate animation shift.
//         if (Glide.options.centered) {
//             // Decrease clones shift with slider
//             // paddings, because slider is centered.
//             shift = Core.Clones.shift - Glide.paddings;
//         } else {
//             // Shif is only clones shift.
//             shift = Core.Clones.shift;
//         }

//         // The flag is set and direction is previous,
//         // so we are on the first slide and need
//         // to make offset translate.
//         if (Core.Run.isOffset('<')) {

//             // Translate is 0 (left edge of the track).
//             translate = 0;

//             // Take off flag.
//             Core.Run.flag = false;

//             // Clear transition and jump to last slide,
//             // after offset animation is done.
//             this.after(function() {
//                 Glide.track.css({
//                     'transition': Core.Transition.clear('all'),
//                     'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] * Glide.length + shift)
//                 });
//             });

//         }


//         // The flag is set and direction is next,
//         // so we're on the last slide and need
//         // to make offset translate.
//         if (Core.Run.isOffset('>')) {

//             // Translate is slides width * length with addtional
//             // offset (right edge of the track).
//             translate = (Glide[Glide.size] * Glide.length) + Glide[Glide.size];

//             // Reset flag
//             Core.Run.flag = false;

//             // Clear transition and jump to the first slide,
//             // after offset animation is done.
//             this.after(function() {
//                 Glide.track.css({
//                     'transition': Core.Transition.clear('all'),
//                     'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] + shift)
//                 });
//             });

//         }

//         /**
//          * Actual translate apply to wrapper
//          * overwrite transition (can be pre-cleared)
//          */
//         Glide.track.css({
//             'transition': Core.Transition.get('all'),
//             'transform': Core.Translate.set(Glide.axis, translate + shift - offset)
//         });

//     };


//     /**
//      * Slideshow animation type.
//      *
//      * @return {Void}
//      */
//     Animation.prototype.slideshow = function() {

//         Glide.slides.css('transition', Core.Transition.get('opacity'))
//             .eq(Glide.current - 1).css('opacity', 1)
//             .siblings().css('opacity', 0);

//     };

//     // Return class.
//     return new Animation();

// };

var Build = function () {
  function Build() {
    classCallCheck(this, Build);
  }

  createClass(Build, [{
    key: 'init',

    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    value: function init() {
      this[Core$1.settings.type]();

      this.typeClass();
      this.modeClass();
      this.activeClass();
      this.setHeight();
    }

    /**
     * Build glide of `slider` type.
     *
     * @return {Void}
     */

  }, {
    key: 'slider',
    value: function slider() {
      Transition$1.jumping = true;

      Dimensions$1.apply();
      Animation$1.make();

      Transition$1.jumping = false;
    }

    /**
     * Build glide of `carousel` type.
     *
     * @return {Void}
     */

  }, {
    key: 'carousel',
    value: function carousel() {
      Transition$1.jumping = true;

      // // Update shift for carusel type.
      // Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length / 2) - Glide[Glide.size];

      Dimensions$1.apply();

      if (Core$1.isMode('vertical')) {}
      // Core.Height.set(true);


      // // Go to startup position.
      // Core.Animation.make();

      // // Append clones.
      // Core.Clones.append();

      Transition$1.jumping = false;
    }

    /**
     * Build glide of `slideshow` type.
     *
     * @return {Void}
     */

  }, {
    key: 'slideshow',
    value: function slideshow() {}
    // // Turn on jumping flag
    // Core.Transition.jumping = true;

    // // Go to startup position
    // Core.Animation.make();

    // // Turn off jumping flag
    // Core.Transition.jumping = false;


    /**
     * Sets height of the slides track.
     *
     * @return {Void}
     */

  }, {
    key: 'setHeight',
    value: function setHeight() {
      if (Core$1.settings.autoheight) {
        // Core.Height.set();
      }
    }

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */

  }, {
    key: 'typeClass',
    value: function typeClass() {
      var settings = Core$1.settings;

      var type = settings.classes[settings.type];

      DOM$1.element.classList.add(type);
    }

    /**
     * Adds `mode` class to the glide element.
     *
     * @return {Void}
     */

  }, {
    key: 'modeClass',
    value: function modeClass() {
      var settings = Core$1.settings;

      var mode = settings.classes[settings.mode];

      DOM$1.element.classList.add(mode);
    }

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */

  }, {
    key: 'activeClass',
    value: function activeClass() {
      var settings = Core$1.settings;

      var slide = DOM$1.slides[Core$1.index];

      slide.classList.add(settings.classes.activeSlide);

      siblings(slide).forEach(function (sibling) {
        sibling.classList.remove(settings.classes.activeSlide);
      });
    }
  }]);
  return Build;
}();

var Build$1 = new Build();

var Events = function () {
    /**
     * Construct events.
     */
    function Events() {
        classCallCheck(this, Events);

        this.disabled = false;
        this.prevented = false;
    }

    /**
     * Calls callback with attributes.
     *
     * @param {Function} func
     * @return {self}
     */


    createClass(Events, [{
        key: 'call',
        value: function call(func) {
            if (func !== 'undefined' && typeof func === 'function') {
                func(this.attrs());
            }

            return this;
        }

        /**
         * Gets attributes for events callback's parameter.
         *
         * @return {Object}
         */

    }, {
        key: 'attrs',
        value: function attrs() {
            return {
                index: Core$1.index
            };
        }
    }]);
    return Events;
}();

var Events$1 = new Events();

// /**
//  * Events module.
//  *
//  * @param {Object} Glide
//  * @param {Object} Core
//  * @return {Events}
//  */
// var Events = function(Glide, Core) {

//     /**
//      * Collection of triggers.
//      *
//      * @type {Object}
//      */
//     var triggers = $('[data-glide-trigger]');

//     /**
//      * Events constructor.
//      */
//     function Events() {
//         this.disabled = false;
//         this.prevented = false;

//         this.keyboard();
//         this.hoverpause();
//         this.resize();
//         this.bindTriggers();
//         this.bindAnchors();
//         this.bindImages();
//     }

//     /**
//      * Bind keyboard events.
//      *
//      * @return {Void}
//      */
//     Events.prototype.keyboard = function() {
//         if (Glide.options.keyboard) {
//             $(window).on('keyup.glide', function(event) {
//                 if (event.keyCode === 39) {
//                     Core.Run.make('>');
//                 }
//                 if (event.keyCode === 37) {
//                     Core.Run.make('<');
//                 }
//             });
//         }
//     };

//     /**
//      * Bind hoverpause event.
//      *
//      * @return {Void}
//      */
//     Events.prototype.hoverpause = function() {

//         if (Glide.options.hoverpause) {

//             Glide.track
//                 .on('mouseover.glide', function() {
//                     Core.Run.pause();
//                     Core.Events.trigger('mouseOver');
//                 })
//                 .on('mouseout.glide', function() {
//                     Core.Run.play();
//                     Core.Events.trigger('mouseOut');
//                 });

//         }

//     };

//     /**
//      * Bind resize window event.
//      *
//      * @return {Void}
//      */
//     Events.prototype.resize = function() {

//         $(window).on('resize.glide.' + Glide.uuid, Core.Helper.throttle(function() {
//             if(!Glide.destroyed) {
//                 Core.Transition.jumping = true;
//                 Glide.setup();
//                 Core.Build.init();
//                 Core.Run.make('=' + Glide.current, false);
//                 Core.Run.play();
//                 Core.Transition.jumping = false;
//             }
//         }, Glide.options.throttle));

//     };

//     /**
//      * Bind triggers events.
//      *
//      * @return {Void}
//      */
//     Events.prototype.bindTriggers = function() {
//         if (triggers.length) {
//             triggers
//                 .off('click.glide touchstart.glide')
//                 .on('click.glide touchstart.glide', this.handleTrigger);
//         }
//     };

//     /**
//      * Hande trigger event.
//      *
//      * @param {Object} event
//      * @return {Void}
//      */
//     Events.prototype.handleTrigger = function(event) {
//         event.preventDefault();

//         var targets = $(this).data('glide-trigger').split(" ");

//         if (!this.disabled) {
//             for (var el in targets) {
//                 var target = $(targets[el]).data('glide_api');
//                 target.pause();
//                 target.go($(this).data('glide-dir'), this.activeTrigger);
//                 target.play();
//             }
//         }
//     };

//     /**
//      * Bind events to anchors inside track.
//      *
//      * @return {Void}
//      */
//     Events.prototype.bindAnchors = function() {
//         Glide.track.on('click.glide', 'a', function(e) {
//             if (this.prevented) {
//                 e.preventDefault();
//             }
//         }.bind(this));
//     };

//     /**
//      * Bind events to images inside track.
//      *
//      * @return {Void}
//      */
//     Events.prototype.bindImages = function() {
//         Glide.track.on('dragstart.glide', 'img', function(e) {
//             if (this.prevented) {
//                 e.preventDefault();
//             }
//         }.bind(this));
//     };

//     /**
//      * Detach anchors clicks inside track.
//      *
//      * @return {self}
//      */
//     Events.prototype.detachClicks = function(event) {
//         Glide.track.find('a').each(function(i, a) {
//             $(a)
//                 .attr('data-href', $(a).attr('href'))
//                 .removeAttr('href');
//         });

//         return this;
//     };

//     /**
//      * Attach anchors clicks inside track.
//      *
//      * @return {self}
//      */
//     Events.prototype.attachClicks = function(event) {
//         Glide.track.find('a').each(function(i, a) {
//             $(a)
//                 .attr('href', $(a).attr('data-href'))
//                 .removeAttr('data-href');
//         });

//         Core.Animation.after(function() {
//             this.prevented = false;
//         }.bind(this));

//         return this;
//     };

//     /**
//      * Prevent anchors clicks inside track.
//      *
//      * @return {self}
//      */
//     Events.prototype.preventClicks = function() {
//         this.prevented = true;

//         return this;
//     };

//     /*
//      * Call event function with parameters.
//      *
//      * @param {Function} func
//      * @return {self}
//      */
//     Events.prototype.call = function(func) {
//         if ((func !== 'undefined') && (typeof func === 'function')) {
//             func(this.getParams());
//         }

//         return this;
//     };

//     /**
//      * Trigger event.
//      *
//      * @param  {String} name
//      * @return {self}
//      */
//     Events.prototype.trigger = function(name) {
//         Glide.slider.trigger(name + ".glide", [this.getParams()]);

//         return this;
//     };

//     /**
//      * Get parameters for events callback.
//      *
//      * @return {Object}
//      */
//     Events.prototype.getParams = function() {
//         return {
//             index: Glide.current,
//             length: Glide.slides.length,
//             current: Glide.slides.eq(Glide.current - 1),
//             slider: Glide.slider,
//             swipe: {
//                 distance: (Core.Touch.distance || 0)
//             }
//         };
//     };

//     /*
//      * Unbind all events.
//      *
//      * @return {Void}
//      */
//     Events.prototype.unbind = function() {

//         Glide.track
//             .off('click.glide', 'a')
//             .off('dragstart.glide', 'img')
//             .off('keyup.glide')
//             .off('mouseover.glide')
//             .off('mouseout.glide');

//         triggers
//             .off('click.glide touchstart.glide');

//         $(window)
//             .off('keyup.glide')
//             .off('resize.glide.' + Glide.uuid);

//     };

//     /**
//      * Disable all events.
//      *
//      * @return {self}
//      */
//     Events.prototype.disable = function() {
//         this.disabled = true;

//         return this;
//     };

//     /**
//      * Enable all events.
//      *
//      * @return {self}
//      */
//     Events.prototype.enable = function() {
//         this.disabled = false;

//         return this;
//     };

//     // Return class.
//     return new Events();

// };

var defaults$1 = {
  /**
   * Type of the slides movements. Available types:
   * `slider` - Rewinds slider to the start/end when it reaches first or last slide.
   * `carousel` - Changes slides without starting over when it reaches first or last slide.
   * `slideshow` - Changes slides with fade effect.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Direction of the slider movements. Available modes:
   * `horizontal` - Move slider on X axis.
   * `vertical` - Move slider on Y axis.
   *
   * @type {String}
   */
  mode: 'horizontal',

  /**
   * Start at specifed slide zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * Number of slides visible on viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at specifed position in the track. Available inputs:
   * `center` - Current slide will be always focused at the center of track.
   * `(1,2,3...)` - Current slide will be focused at the specifed position number.
   *
   * @type {String|Number}
   */
  focusAt: 'center',

  /**
   * Change slides after specifed interval.
   * Use false for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: 4000,

  /**
   * Stop autoplay on mouseover.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with keyboard left and right arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Minimal touch-swipe distance needed to change slide. False for turning off touch.
   *
   * @type {Number}
   */
  touchDistance: 80,

  /**
   * Minimal mouse drag distance needed to change slide. False for turning off mouse drag.
   *
   * @type {Number}
   */
  dragDistance: 120,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Easing function for animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',

  /**
   * Optimalize resize events. Call at most once per every wait in milliseconds.
   *
   * @type {Number}
   */
  throttle: 16,

  /**
   * Set height of the slider based on current slide content.
   *
   * @type {Boolean}
   */
  autoheight: false,

  /**
   * Distance value of the next and previous viewports which have to be
   * peeked in current view. Can be number, percentage or pixels.
   *
   * @type {Number|String}
   */
  peek: 0,

  /**
   * List of internally used DOM classes.
   *
   * @type {Object}
   */
  classes: {
    horizontal: 'glide--horizontal',
    vertical: 'glide--vertical',
    slider: 'glide--slider',
    carousel: 'glide--carousel',
    slideshow: 'glide--slideshow',
    dragging: 'glide--dragging',
    cloneSlide: 'glide__slide--clone',
    activeSlide: 'glide__slide--active',
    disabledArrow: 'glide__arrow--disabled',
    activeBullet: 'glide__bullet--active'
  },

  /**
   * Callback that fires before a slider initialization.
   *
   * @param {Object} event
   */
  beforeInit: function beforeInit(event) {},


  /**
   * Callback that fires after a slider initialization.
   *
   * @param {Object} event
   */
  afterInit: function afterInit(event) {},


  /**
   * Callback that fires before a slide change.
   *
   * @param {Object} event
   */
  beforeTransition: function beforeTransition(event) {},


  /**
   * Callback that fires during changing of a slide.
   *
   * @param {Object} event
   */
  duringTransition: function duringTransition(event) {},


  /**
   * Callback that fires after a slide change.
   *
   * @param {Object} event
   */
  afterTransition: function afterTransition(event) {},


  /**
   * Callback that fires on start of touch/drag interaction.
   *
   * @param {Object} event
   */
  swipeStart: function swipeStart(event) {},


  /**
   * Callback that fires during touch/drag interaction.
   *
   * @param {Object} event
   */
  swipeMove: function swipeMove(event) {},


  /**
   * Callback that fires on end of touch/drag interaction.
   *
   * @param {Object} event
   */
  swipeEnd: function swipeEnd(event) {}
};

var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, Glide);

        this.selector = selector;
        this.options = options;

        var settings = _extends(defaults$1, options);

        Core$1.settings = settings;
        Core$1.index = settings.startAt;

        Events$1.call(settings.beforeInit);

        DOM$1.init(selector);
        Build$1.init();

        Events$1.call(settings.afterInit);
    }

    /**
     * Gets current slide index.
     *
     * @return {Number}
     */


    createClass(Glide, [{
        key: 'index',
        value: function index() {
            return Core$1.index;
        }
    }]);
    return Glide;
}();

return Glide;

})));
