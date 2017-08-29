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
      this.arrows = this.element.querySelector('[data-glide="arrows"]');
      this.bullets = this.element.querySelector('[data-glide="bullets"]');
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
      DOM$1.wrapper.style[dimention] = this.wrapperSize + 'px';
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
    key: 'wrapperSize',
    get: function get$$1() {
      return this.slideSize * this.length;
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
    value: function set$$1(value) {
      DOM$1.wrapper.style.transform = this.get(value);

      return this;
    }
  }]);
  return Translate;
}();

var Translate$1 = new Translate();

var Transition = function () {
  /**
   * Construct transition.
   */
  function Transition() {
    classCallCheck(this, Transition);

    this.disabled = false;
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

      if (!this.disabled) {
        return property + ' ' + settings.animationDuration + 'ms ' + settings.animationTimingFunc;
      }

      return property + ' 0ms ' + settings.animationTimingFunc;
    }

    /**
     * Sets value of transition.
     *
     * @param {String} property
     * @return {self}
     */

  }, {
    key: 'set',
    value: function set$$1(property) {
      DOM$1.wrapper.style.transition = this.get(property);

      return this;
    }

    /**
     * Enable transition.
     *
     * @return {self}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;

      return this;
    }

    /**
     * Disable transition.
     *
     * @return {self}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;

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
     * Logic of the `slider` animation type.
     *
     * @return {Void}
     */

  }, {
    key: 'slider',
    value: function slider() {
      var translate = Dimensions$1.slideSize * Core$1.index;

      if (Core$1.settings.focusAt === 'center') {
        translate = translate - (Dimensions$1.width / 2 - Dimensions$1.slideSize / 2);
      }

      if (Core$1.settings.focusAt > 0) {
        translate = translate - Dimensions$1.slideSize * Core$1.settings.focusAt;
      }

      Transition$1.set('transform');
      Translate$1.set(translate);
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

    /**
     * Gets value of the additional animation displacement.
     *
     * @return {Integer}
     */

  }, {
    key: 'offset',
    get: function get$$1() {
      return this.displacement;
    }

    /**
     * Sets value of the additional animation displacement.
     *
     * @param  {Number} value
     * @return {self}
     */
    ,
    set: function set$$1(value) {
      this.displacement = typeof value !== 'undefined' ? parseInt(value) : 0;

      return this;
    }
  }]);
  return Animation;
}();

var Animation$1 = new Animation();

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
      Transition$1.disable();

      this[Core$1.settings.type]();

      this.typeClass();
      this.modeClass();
      this.activeClass();
      this.setHeight();

      Transition$1.enable();
    }

    /**
     * Build glide of `slider` type.
     *
     * @return {Void}
     */

  }, {
    key: 'slider',
    value: function slider() {
      Dimensions$1.apply();
      Animation$1.make();
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

var Run = function () {
  function Run() {
    classCallCheck(this, Run);

    this.flag = false;
    this.running = false;
  }

  createClass(Run, [{
    key: 'play',
    value: function play() {
      var _this = this;

      if (Core$1.settings.autoplay || this.running) {
        if (typeof this.interval === 'undefined') {
          this.interval = setInterval(function () {
            _this.pause();
            _this.make('>');
            _this.play();
          }, this.period);
        }
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (Core$1.settings.autoplay || this.running) {
        if (this.interval >= 0) {
          this.interval = clearInterval(this.interval);
        }
      }
    }
  }, {
    key: 'make',
    value: function make(move, callback) {
      this.direction = move.substr(0, 1);
      this.steps = move.substr(1) ? parseInt(move.substr(1)) : 0;

      switch (this.direction) {
        case '>':
          // We are at the last slide while moving forward
          // and step is a number. Set "jumping" flag
          // and change index to the first.
          if (this.isEnd()) {
            Core$1.index = 0;

            this.flag = true;
          }
          // Step is not a number, but '>'
          // scroll slider to the end.
          else if (this.steps === '>') {
              Core$1.index = this.length;
            }
            // Otherwise change normally.
            else {
                Core$1.index = Core$1.index + 1;
              }
          break;

        case '<':
          // When we at first slide and move backward and steps
          // are number, set flag and index slide to last.
          if (this.isStart()) {
            Core$1.index = this.length;

            this.flag = true;
          }
          // When steps is not number, but '<'
          // scroll slider to start.
          else if (this.steps === '<') {
              Core$1.index = 0;
            }
            // Otherwise change normally.
            else {
                Core$1.index = Core$1.index - 1;
              }
          break;

        case '=':
          Core$1.index = this.steps;
          break;
      }

      Animation$1.make().after(function () {
        Build$1.activeClass();
      });
    }

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isStart',
    value: function isStart() {
      return Core$1.index === 0;
    }

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEnd',
    value: function isEnd() {
      return Core$1.index === this.length;
    }

    /**
     * Checks if we are making offset run.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isOffset',
    value: function isOffset(direction) {
      return this.flag && this.direction === direction;
    }

    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */

  }, {
    key: 'period',
    get: function get$$1() {
      var autoplay = DOM$1.slides[Core$1.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return parseInt(autoplay);
      }

      return Core$1.settings.autoplay;
    }

    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */

  }, {
    key: 'length',
    get: function get$$1() {
      return DOM$1.slides.length - 1;
    }
  }]);
  return Run;
}();

var Run$1 = new Run();

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

var Arrows = function () {
    /**
     * Construct arrows.
     */
    function Arrows() {
        classCallCheck(this, Arrows);

        this.listeners = {};
    }

    /**
     * Init arrows. Binds DOM elements with listeners.
     *
     * @return {Void}
     */


    createClass(Arrows, [{
        key: 'init',
        value: function init() {
            this.bind();
        }

        /**
         * Arrow click event handler.
         *
         * @param {Object} event
         * @return {Void}
         */

    }, {
        key: 'click',
        value: function click(event) {
            event.preventDefault();

            if (!Events$1.disabled) {
                Run$1.pause();

                Run$1.make(event.target.dataset.glideDir);

                Animation$1.after(function () {
                    Run$1.play();
                });
            }
        }

        /**
         * Arrow hover event handler.
         *
         * @param {Object} event
         * @return {Void}
         */

    }, {
        key: 'hover',
        value: function hover(event) {
            if (!Events$1.disabled) {
                switch (event.type) {
                    case 'mouseleave':
                        Run$1.play();
                        break;

                    case 'mouseenter':
                        Run$1.pause();
                        break;
                }
            }
        }

        /**
         * Bind arrows events.
         *
         * @return {Void}
         */

    }, {
        key: 'bind',
        value: function bind() {
            var items = this.items;

            for (var i = 0; i < items.length; i++) {
                this.on('click', items[i], this.click);
                this.on('touchstart', items[i], this.click);
                this.on('mouseenter', items[i], this.hover);
                this.on('mouseleave', items[i], this.hover);
            }
        }

        /**
         * Unbind arrows events.
         *
         * @return {Void}
         */

    }, {
        key: 'unbind',
        value: function unbind() {
            var items = this.items;

            for (var i = 0; i < items.length; i++) {
                this.off('click', items[i]);
                this.off('touchstart', items[i]);
                this.off('mouseenter', items[i]);
                this.off('mouseleave', items[i]);
            }
        }
    }, {
        key: 'on',
        value: function on(event, el, closure) {
            this.listeners[event] = closure;

            el.addEventListener(event, this.listeners[event]);
        }
    }, {
        key: 'off',
        value: function off(event, el) {
            el.removeEventListener(event, this.listeners[event]);
        }

        /**
         * Gets collection of the arrows elements.
         *
         * @return {HTMLElement[]}
         */

    }, {
        key: 'items',
        get: function get$$1() {
            return DOM$1.arrows.children;
        }
    }]);
    return Arrows;
}();

var Arrows$1 = new Arrows();

// /**
//  * Arrows module.
//  *
//  * @param {Object} Glide
//  * @param {Object} Core
//  * @return {Arrows}
//  */
// var Arrows = function(Glide, Core) {


//     /**
//      * Arrows constructor.
//      */
//     function Arrows() {
//         this.build();
//         this.bind();
//     }


//     /**
//      * Build arrows. Gets DOM elements.
//      *
//      * @return {Void}
//      */
//     Arrows.prototype.build = function() {
//         this.wrapper = Glide.slider.find('.' + Glide.options.classes.arrows);
//         this.items = this.wrapper.children();
//     };


//     /**
//      * Disable next/previous arrow and enable another.
//      *
//      * @param {String} type
//      * @return {Void}
//      */
//     Arrows.prototype.disable = function(type) {
//         var classes = Glide.options.classes;

//         if (!type) {
//             return this.disableBoth();
//         }

//         this.items.filter('.' + classes['arrow' + Core.Helper.capitalise(type)])
//             .unbind('click.glide touchstart.glide')
//             .addClass(classes.disabled)
//             .siblings()
//             .bind('click.glide touchstart.glide', this.click)
//             .bind('mouseenter.glide', this.hover)
//             .bind('mouseleave.glide', this.hover)
//             .removeClass(classes.disabled);
//     };

//     /**
//      * Disable both arrows.
//      *
//      * @return {Void}
//      */
//     Arrows.prototype.disableBoth = function() {
//         this.items
//             .unbind('click.glide touchstart.glide')
//             .addClass(Glide.options.classes.disabled);
//     };


//     /**
//      * Show both arrows.
//      *
//      * @return {Void}
//      */
//     Arrows.prototype.enable = function() {
//         this.bind();

//         this.items.removeClass(Glide.options.classes.disabled);
//     };

//     /**
//      * Arrow click event.
//      *
//      * @param {Object} event
//      * @return {Void}
//      */
//     Arrows.prototype.click = function(event) {
//         event.preventDefault();

//         if (!Core.Events.disabled) {
//             Core.Run.pause();
//             Core.Run.make($(this).data('glide-dir'));
//             Core.Animation.after(function() {
//                 Core.Run.play();
//             });
//         }
//     };

//     /**
//      * Arrows hover event.
//      *
//      * @param {Object} event
//      * @return {Void}
//      */
//     Arrows.prototype.hover = function(event) {
//         if (!Core.Events.disabled) {

//             switch (event.type) {
//                 // Start autoplay on mouse leave.
//                 case 'mouseleave':
//                     Core.Run.play();
//                     break;
//                 // Pause autoplay on mouse enter.
//                 case 'mouseenter':
//                     Core.Run.pause();
//                     break;
//             }

//         }
//     };

//     /**
//      * Bind arrows events.
//      *
//      * @return {Void}
//      */
//     Arrows.prototype.bind = function() {
//         this.items
//             .on('click.glide touchstart.glide', this.click)
//             .on('mouseenter.glide', this.hover)
//             .on('mouseleave.glide', this.hover);
//     };


//     /**
//      * Unbind arrows events.
//      *
//      * @return {Void}
//      */
//     Arrows.prototype.unbind = function() {
//         this.items
//             .off('click.glide touchstart.glide')
//             .off('mouseenter.glide')
//             .off('mouseleave.glide');
//     };


//     // Return class.
//     return new Arrows();

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
        Arrows$1.init();
        Build$1.init();
        Run$1.play();

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
