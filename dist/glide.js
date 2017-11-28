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

var defaults = {
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
   * Minimal swipe distance needed to change slide, `false` for turning off touch.
   *
   * @type {Number}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change slide, `false` for turning off mouse drag.
   *
   * @type {Number}
   */
  dragThreshold: 120,

  /**
   * A maximum number of slides to whom movement is maked on swiping or dragging, `false` for unlimited.
   *
   * @type {Number}
   */
  perTouch: false,

  /**
   * Moving ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.75,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

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
   * Optimalize resize and swipemove events. Call at most once per every wait in milliseconds.
   *
   * @type {Number}
   */
  debounce: 200,

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
   * List of internally used Html classes.
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
   * Additional slider extension components.
   *
   * @type {Object}
   */
  extensions: {},

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
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Glide} glide
 * @param {Object} extensions
 *
 * @returns {Void}
 */
function init(glide, extensions) {
  var components = {};

  for (var name in extensions) {
    components[name] = extensions[name](glide, components);
  }

  for (var _name in components) {
    if (typeof components[_name].init === 'function') {
      components[_name].init();
    } else {
      warn('Extension [' + _name + '] must implement a init() method');
    }
  }
}

/**
 * Finds siblings elements of the passed node.
 *
 * @param  {HTMLElement} node
 * @return {Array}
 */


/**
 * Checks if precised node exist and is a valid element.
 *
 * @param  {HTMLElement} node
 * @return {Boolean}
 */
function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}

function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}

var Html = function (Glide, Components) {
  var TRACK_SELECTOR = '[data-glide-el="track"]';

  var HTML = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    init: function init() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
    }
  };

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return HTML._el;
    },


    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(el) {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      if (exist(el)) {
        HTML._el = el;
      } else {
        warn('Main element must be a existing HTML node');
      }
    }
  });

  define(HTML, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return HTML._tr;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(tr) {
      if (exist(tr)) {
        HTML._tr = tr;
      } else {
        warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
      }
    }
  });

  define(HTML, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return HTML.track.children[0];
    }
  });

  define(HTML, 'slides', {
    /**
     * Gets collection of the slides nodes.
     *
     * @return {Array}
     */
    get: function get() {
      return HTML.wrapper.children;
    }
  });

  return HTML;
};

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

var EventBus = function () {
  /**
   * Construct events.
   */
  function EventBus() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventBus);

    this.listeners = listeners;
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {Array} events
   * @param  {HTMLElement} el
   * @param  {Closure} closure
   * @return {Void}
   */


  createClass(EventBus, [{
    key: 'on',
    value: function on(events, el, closure) {
      if (typeof events === 'string') {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;

        el.addEventListener(events[i], this.listeners[events[i]]);
      }
    }

    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {Array} events
     * @param  {HTMLElement} el
     * @return {Void}
     */

  }, {
    key: 'off',
    value: function off(events, el) {
      if (typeof events === 'string') {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]]);

        delete this.listeners[events[i]];
      }
    }
  }]);
  return EventBus;
}();

var Anchors = function (Glide, Components) {
  var Events = new EventBus();

  var detached = false;
  var prevented = false;

  return {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    init: function init() {
      this.links = Components.Html.wrapper.querySelectorAll('a');

      this.bind();
    },


    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Events.on('click', Components.Html.wrapper, this.click.bind(this));
    },


    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      event.stopPropagation();

      if (prevented) {
        event.preventDefault();
      }
    },


    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      if (!detached) {
        for (var i = 0; i < this.links.length; i++) {
          this.links[i].draggable = false;

          this.links[i].dataset.href = this.links[i].getAttprribute('href');

          this.links[i].removeAttribute('href');
        }

        detached = true;
      }

      return this;
    },


    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      if (detached) {
        for (var i = 0; i < this.links.length; i++) {
          this.links[i].draggable = true;

          this.links[i].setAttribute('href', this.links[i].dataset.href);

          delete this.links[i].dataset.href;
        }

        detached = false;
      }

      return this;
    },


    /**
     * Sets `prevented` status so anchors inside track are not clickable.
     *
     * @return {self}
     */
    prevent: function prevent() {
      prevented = true;

      return this;
    },


    /**
     * Unsets `prevented` status so anchors inside track are clickable.
     *
     * @return {self}
     */
    unprevent: function unprevent() {
      prevented = false;

      return this;
    }
  };
};

// import Run from './components/run'
// import Build from './components/build'
// import Swipe from './components/swipe'
// import Arrows from './components/arrows'
// import Window from './components/window'
// import Images from './components/images'
// import Callbacks from './components/callbacks'

var COMPONENTS = {
  Html: Html,
  Anchors: Anchors
  // Build,
  // Images,
  // Swipe,
  // Arrows,
  // Window,
  // Run
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
    this.settings = _extends(defaults, options);
    this.index = this.settings.startAt;

    this.mount();
  }

  /**
   * Initializes glide components.
   *
   * @return {Void}
   */


  createClass(Glide, [{
    key: 'mount',
    value: function mount() {
      init(this, _extends(this.settings.extensions, COMPONENTS));
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

    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: 'type',
    get: function get$$1() {
      return this.settings.type;
    }
  }]);
  return Glide;
}();

return Glide;

})));
