/*!
 * Glide.js v3.0.0
 * (c) 2013-2017 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Glide = factory());
}(this, (function () { 'use strict';

var defaults = {
  /**
   * Type of the slides movements.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches first or last slide.
   * `carousel` - Changes slides without starting over when it reaches first or last slide.
   * `slideshow` - Changes slides with fade effect.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Direction of the slider movements.
   *
   * Available modes:
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
   * Focus currently active slide at specifed position in the track.
   *
   * Available inputs:
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
   * Debounce constly events at most once per every wait in milliseconds.
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
   * Left and right peeking can be setup separetly with a
   * directions object `{ left: 100, right: 100 }`.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * List of internally used html classes.
   *
   * @type {Object}
   */
  classes: {
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
   * Additional slider extensions.
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
 * Outputs warning message to the bowser console.
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
function init(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    components[name] = extensions[name](glide, components, events);
  }

  for (var _name in components) {
    if (typeof components[_name].init === 'function') {
      components[_name].init();
    }
  }
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

var EventsBus = function () {
  function EventsBus() {
    var topics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBus);

    this.topics = topics;
    this.hOP = topics.hasOwnProperty;
  }

  createClass(EventsBus, [{
    key: "listen",
    value: function listen(topic, listener) {
      // Create the topic's object if not yet created
      if (!this.hOP.call(this.topics, topic)) {
        this.topics[topic] = [];
      }

      // Add the listener to queue
      var index = this.topics[topic].push(listener) - 1;

      // Provide handle back for removal of topic
      return {
        remove: function remove() {
          delete this.topics[topic][index];
        }
      };
    }
  }, {
    key: "emit",
    value: function emit(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!this.hOP.call(this.topics, topic)) {
        return;
      }

      // Cycle through topics queue, fire!
      this.topics[topic].forEach(function (item) {
        item(info || {});
      });
    }
  }]);
  return EventsBus;
}();

var Events = new EventsBus();

function listen(event, handler) {
  if (event.constructor === Array) {
    for (var i = 0; i < event.length; i++) {
      listen(event[i], handler);
    }
  }

  return Events.listen(event, handler);
}

function emit(event, context) {
  if (event.constructor === Array) {
    for (var i = 0; i < event.length; i++) {
      emit(event[i], context);
    }
  }

  return Events.emit(event, context);
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}

var Run = function (Glide, Components) {
  var RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    init: function init() {
      this._j = false;
    },


    /**
     * Handles glide status. Calculates current index
     * based on passed move and slider type.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make: function make(move, callback) {
      this._m = {
        direction: move.substr(0, 1),
        steps: move.substr(1) ? move.substr(1) : 0
      };

      emit('run.make', this._m);

      switch (this._m.direction) {
        case '>':
          if (typeof this._m.steps === 'number' && parseInt(this._m.steps) !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -parseInt(this._m.steps));
          } else if (this._m.steps === '>') {
            Glide.index = this.length;
          } else if (this.isEnd()) {
            Glide.index = 0;

            emit('run.make.atEnd', this._m);
          } else {
            Glide.index++;
          }
          break;

        case '<':
          if (typeof this._m.steps === 'number' && parseInt(this._m.steps) !== 0) {
            Glide.index -= Math.min(Glide.index, parseInt(this._m.steps));
          } else if (this._m.steps === '<') {
            Glide.index = 0;
          } else if (this.isStart()) {
            Glide.index = this.length;

            emit('run.make.atStart', this._m);
          } else {
            Glide.index--;
          }
          break;

        case '=':
          Glide.index = this._m.steps;
          break;
      }

      emit('run.make.after', this._m);

      return this;
    },


    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index === 0;
    },


    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index === this.length;
    },


    /**
     * Checks if we are making offset run.
     *
     * @return {Boolean}
     */
    isOffset: function isOffset(direction) {
      return this._j && this._m.direction === direction;
    }
  };

  define(RUN, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length - 1;
    }
  });

  listen('window.resize', function () {
    RUN.make('=' + Glide.index).init();
  });

  listen(['run.make.atStart', 'run.make.atEnd'], function () {
    RUN._j = true;
  });

  listen('animation.make.after', function () {
    if (RUN.isOffset('<') || RUN.isOffset('>')) {
      RUN._j = false;
    }
  });

  return RUN;
};

/**
 * Finds siblings nodes of the passed node.
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
 * Checks if passed node exist and is a valid element.
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

var TRACK_SELECTOR = '[data-glide-el="track"]';
var SLIDE_SELECTOR = '[data-glide-el="slide"]';

var Html = function (Glide, Components) {
  var HTML = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    init: function init() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.slides = this.wrapper.querySelectorAll(SLIDE_SELECTOR);
    }
  };

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return HTML._e;
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
        HTML._e = el;
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
      return HTML._t;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(tr) {
      if (exist(tr)) {
        HTML._t = tr;
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

  return HTML;
};

/**
 * Converts value entered as number, string
 * or procentage to actual width value.
 *
 * @param {Number|String} value
 * @param {Number} width
 * @returns {Number}
 */
function dimension(value, width) {
  var isPercentage = typeof value === 'string' && value.indexOf('%') >= 0;

  value = parseInt(value, 10);

  if (isPercentage) {
    return parseInt(width * (value / 100));
  }

  return value;
}

var Peek = function (Glide, Components, Events) {
  var PEEK = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    init: function init() {
      this.value = Glide.settings.peek;
    }
  };

  define(PEEK, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number}
     */
    get: function get$$1() {
      return PEEK._v;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @todo  refactor
     * @param {Number} value
     * @return {Void}
     */
    set: function set$$1(value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        if (typeof value.before === 'string') {
          value.before = dimension(value.before, Components.Dimensions.width);
        }
        if (typeof value.after === 'string') {
          value.after = dimension(value.after, Components.Dimensions.width);
        }
      } else {
        if (typeof value === 'string') {
          value = dimension(value, Components.Dimensions.width);
        }

        if (typeof value !== 'number') {
          warn('Invalid peek value');
        }
      }

      PEEK._v = value;
    }
  });

  return PEEK;
};

var Build = function (Glide, Components, Events$$1) {
  var BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    init: function init() {
      emit('build.init.before');

      this.typeClass();
      this.activeClass();

      emit('build.init.after');
    },


    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var settings = Glide.settings;
      var slide = Components.Html.slides[Glide.index];

      slide.classList.add(settings.classes.activeSlide);

      siblings(slide).forEach(function (sibling) {
        sibling.classList.remove(settings.classes.activeSlide);
      });
    }
  };

  listen('window.resize', function () {
    BUILD.init();
  });

  listen('animation.make.after', function () {
    BUILD.activeClass();
  });

  return BUILD;
};

var EventsBinder = function () {
  /**
   * Construct events.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBinder);

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


  createClass(EventsBinder, [{
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
  return EventsBinder;
}();

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

var Swipe = function (Glide, Components) {
  var Binder = new EventsBinder();

  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var dragging = false;

  var SWIPE = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    init: function init() {
      this.bindSwipeStart();
    },


    /**
     * Handler for `swipestart` event.
     * Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (this.enabled) {
        var swipe = this.touches(event);

        this.disable();

        swipeSin = null;
        swipeStartX = parseInt(swipe.pageX);
        swipeStartY = parseInt(swipe.pageY);

        this.bindSwipeMove();
        this.bindSwipeEnd();

        emit('swipe.start');
        // Components.Callbacks.call(Glide.settings.swipeStart)
      }
    },


    /**
     * Handler for `swipemove` event.
     * Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (this.enabled) {
        var swipe = this.touches(event);

        var subExSx = parseInt(swipe.pageX) - swipeStartX;
        var subEySy = parseInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < Glide.settings.touchAngle) {
          Components.Movement.make(subExSx * parseFloat(Glide.settings.touchRatio));
        }

        if (swipeSin * 180 / Math.PI < Glide.settings.touchAngle) {
          event.stopPropagation();
          event.preventDefault();

          Components.Html.wrapper.classList.add(Glide.settings.classes.dragging);
        } else {
          return;
        }

        emit('swipe.move');
      }
    },


    /**
     * Handler for `swipeend` event. Finitializes
     * user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (this.enabled) {
        var swipe = this.touches(event);
        var threshold = this.threshold(event);

        this.enable();

        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        var steps = Math.round(swipeDistance / Components.Dimensions.slideWidth);

        if (swipeDistance > threshold && swipeDeg < Glide.settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (Glide.settings.perTouch) {
            steps = Math.min(steps, parseInt(Glide.settings.perTouch));
          }

          Components.Run.make('<' + steps);
        } else if (swipeDistance < -threshold && swipeDeg < Glide.settings.touchAngle) {
          // While swipe is negative and lower than negative threshold move forward.
          if (Glide.settings.perTouch) {
            steps = Math.max(steps, -parseInt(Glide.settings.perTouch));
          }

          Components.Run.make('>' + steps);
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Movement.make();
        }

        Components.Html.wrapper.classList.remove(Glide.settings.classes.dragging);

        this.unbindSwipeMove();
        this.unbindSwipeEnd();

        // Components.Callbacks.call(Glide.settings.swipeEnd)
        emit('swipe.end');
      }
    },


    /**
    * Binds swipe's starting event.
    *
    * @return {Void}
    */
    bindSwipeStart: function bindSwipeStart() {
      if (Glide.settings.swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, this.start.bind(this));
      }

      if (Glide.settings.dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, this.start.bind(this));
      }
    },


    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper);
      Binder.off(START_EVENTS[1], Components.Html.wrapper);
    },


    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, this.move.bind(this));
    },


    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper);
    },


    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      Binder.on(END_EVENTS, Components.Html.wrapper, this.end.bind(this));
    },


    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },
    touches: function touches(event) {
      if (MOUSE_EVENTS.includes(event.type)) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },


    /**
     * Gets value of minimum swipe distance.
     * Returns value based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      if (MOUSE_EVENTS.includes(event.type)) {
        return Glide.settings.dragThreshold;
      }

      return Glide.settings.swipeThreshold;
    },


    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      dragging = false;

      Components.Transition.enable();

      return this;
    },


    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      dragging = true;

      Components.Transition.disable();

      return this;
    }
  };

  define(SWIPE, 'enabled', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number}
     */
    get: function get() {
      return !(Glide.disabled && dragging);
    }
  });

  return SWIPE;
};

var Clones = function (Glide, Components, Events$$1) {
  var pattern = [];

  var CLONES = {
    init: function init() {
      this.items = [];

      this.map();
      this.collect();
    },


    /**
     * Generate pattern of the cloning.
     *
     * @return {Void}
     */
    map: function map() {
      for (var i = 0; i < Glide.settings.perView; i++) {
        pattern.push(i);
      }

      for (var _i = Glide.settings.perView - 1; _i >= 0; _i--) {
        pattern.push(-(Components.Html.slides.length - 1) + _i);
      }
    },


    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    collect: function collect() {
      var clone = null;

      for (var i = 0; i < pattern.length; i++) {
        clone = Components.Html.slides[Math.abs(pattern[i])].cloneNode(true);

        clone.classList.add(Glide.settings.classes.cloneSlide);

        this.items.push(clone);
      }
    },


    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var item = null;

      for (var i = 0; i < this.items.length; i++) {
        item = this.items[i];

        item.style.width = Components.Dimensions.slideWidth;

        // Append clone if pattern position is positive.
        // Prepend clone if pattern position is negative.
        if (pattern[i] >= 0) {
          Components.Html.wrapper.appendChild(item);
        } else {
          Components.Html.wrapper.insertBefore(item, Components.Html.slides[0]);
        }
      }
    },


    /**
     * Remove all cloned slides.
     *
     * @return {self}
     */
    remove: function remove() {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].remove();
      }

      return this;
    }
  };

  define(CLONES, 'grow', {
    get: function get() {
      if (Glide.isType('carousel')) {
        return Components.Dimensions.slideWidth * CLONES.items.length;
      }

      return 0;
    }
  });

  listen('build.init.before', function () {
    if (Glide.isType('carousel')) {
      CLONES.append();
    }
  });

  return CLONES;
};

var Height = function (Glide, Components, Events$$1) {
  var HEIGHT = {
    /**
     * Inits height. Adds `height` transition to the root.
     *
     * @return {Void}
     */
    init: function init() {
      if (Glide.settings.autoheight) {
        Components.Html.track.style.transition = Components.Transition.compose('height');
      }
    },


    /**
     * Sets height of the slider.
     *
     * @param {Boolean} force Force height setting even if option is turn off.
     * @return {Void}
     */
    set: function set(force) {
      if (Glide.settings.autoheight || force) {
        Components.Html.track.style.height = this.value;
      }
    }
  };

  define(HEIGHT, 'value', {
    /**
     * Gets height of the current slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides[Glide.index].offsetHeight;
    }
  });

  listen(['build.init.after', 'run.make.after'], function () {
    HEIGHT.set();
  });

  return HEIGHT;
};

/**
 * Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
 * This accumulates the arguments passed into an array, after a given index.
 *
 * @source https://github.com/jashkenas/underscore
 */
var restArgs = function restArgs(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0);
    var rest = Array(length);
    var index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest);
      case 1:
        return func.call(this, arguments[0], rest);
      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};

/**
 * Delays a function for the given number of milliseconds, and then calls
 * it with the arguments supplied.
 *
 * @source https://github.com/jashkenas/underscore
 */
var delay = restArgs(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source https://github.com/jashkenas/underscore
 */
function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function later(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArgs(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

var Window = function (Glide, Components) {
  var Binder = new EventsBinder();

  return {
    /**
     * Initializes window bindings.
     */
    init: function init() {
      this.bind();
    },


    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this = this;

      Binder.on('resize', window, debounce(function () {
        emit('window.resize.before');

        _this.resize();

        emit('window.resize.after');
      }, Glide.settings.debounce.resize));
    },


    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    },


    /**
     * Handler for `resize` event. Rebuilds glide,
     * so its status matches new dimentions.
     * 
     * @returns {Void}
     */
    resize: function resize() {
      emit('window.resize');
    }
  };
};

var Images = function (Glide, Components) {
  var Binder = new EventsBinder();

  return {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    init: function init() {
      this.bind();
    },


    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },


    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper, this.dragstart);
    },


    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
};

var Anchors = function (Glide, Components) {
  var Binder = new EventsBinder();

  var detached = false;
  var prevented = false;

  var ANCHORS = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    init: function init() {
      this._a = Components.Html.wrapper.querySelectorAll('a');

      this.bind();
    },


    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click.bind(this));
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
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;

          this.items[i].dataset.href = this.items[i].getAttribute('href');

          this.items[i].removeAttribute('href');
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
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;

          this.items[i].setAttribute('href', this.items[i].dataset.href);

          delete this.items[i].dataset.href;
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

  define(ANCHORS, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return ANCHORS._a;
    }
  });

  listen('swipe.move', function () {
    ANCHORS.prevent().detach();
  });

  listen('swipe.end', function () {
    ANCHORS.unprevent().attach();
  });

  return ANCHORS;
};

var CONTROLS_SELECTOR = '[data-glide-el="controls"]';

var Controls = function (Glide, Components) {
  var Binder = new EventsBinder();

  return {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    init: function init() {
      this._e = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

      for (var i = 0; i < this._e.length; i++) {
        this.bind(this._e[i]);
      }
    },


    /**
     * Binds events to arrows HTML elements.
     *
     * @return {Void}
     */
    bind: function bind(wrapper) {
      var children = wrapper.children;

      for (var i = 0; i < children.length; i++) {
        Binder.on(['click', 'touchstart'], children[i], this.click);
      }
    },


    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @return {Void}
     */
    unbind: function unbind(wrapper) {
      var children = wrapper.children;

      for (var i = 0; i < children.length; i++) {
        Binder.off(['click', 'touchstart'], children[i]);
      }
    },


    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click: function click(event) {
      event.preventDefault();

      Components.Run.make(event.target.dataset.glideDir);
    }
  };
};

var Keyboard = function (Glide, Components) {
  var Binder = new EventsBinder();

  return {
    init: function init() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },
    unbind: function unbind() {
      Binder.on('keyup', document, this.press);
    },
    press: function press(event) {
      if (event.keyCode === 39) {
        Components.Run.make('>');
      }
      if (event.keyCode === 37) {
        Components.Run.make('<');
      }
    }
  };
};

var Autoplay = function (Glide, Components) {
  var Binder = new EventsBinder();

  var AUTOPLAY = {
    init: function init() {
      this.start();

      if (Glide.settings.hoverpause) {
        this.events();
      }
    },
    start: function start() {
      var _this = this;

      if (Glide.settings.autoplay) {
        if (typeof this._i === 'undefined') {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();
          }, this.time);
        }
      }
    },


    /**
     * Stops autorunning of the glide.
     *
     * @return {self}
     */
    stop: function stop() {
      if (Glide.settings.autoplay) {
        this._i = clearInterval(this._i);
      }
    },
    events: function events() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        _this2.stop();
      });

      Binder.on('mouseout', Components.Html.root, function () {
        _this2.start();
      });
    }
  };

  define(AUTOPLAY, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return parseInt(autoplay);
      }

      return Glide.settings.autoplay;
    }
  });

  return AUTOPLAY;
};

/**
 * Makes a string's first character uppercase.
 *
 * @param  {String} string
 * @return {String}
 */
function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
var Grow = function (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    translate: function translate(_translate) {
      if (Glide.isType('carousel')) {
        return _translate + Components.Clones.grow / 2;
      }

      return _translate;
    }
  };
};

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
var Peeking = function (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    translate: function translate(_translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if ((typeof peek === 'undefined' ? 'undefined' : _typeof(peek)) === 'object') {
          return _translate - peek.before;
        }

        return _translate - peek;
      }

      return _translate;
    }
  };
};

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
var Focusing = function (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    translate: function translate(_translate) {
      var focusAt = Glide.settings.focusAt;
      var width = Components.Dimensions.width;
      var slideWidth = Components.Dimensions.slideWidth;

      if (focusAt === 'center') {
        return _translate - (width / 2 - slideWidth / 2);
      }

      return _translate - slideWidth * focusAt;
    }
  };
};

/**
 * Collection of transformers.
 *
 * @type {Array}
 */
var TRANSFORMERS = [Grow, Peeking, Focusing];

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Glide} Glide
 * @param  {Components} Components
 * @return {Object}
 */
var transformer = function (Glide, Components) {
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    transform: function transform(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        translate = TRANSFORMERS[i](Glide, Components).translate(translate);
      }

      return translate;
    }
  };
};

/**
 * Provide a transform value of the `slider` type glide.
 *
 * @param  {Glide}  Glide
 * @param  {Object} Components
 * @return {Number}
 */
var Slider = function (Glide, Components) {
  var translate = Components.Dimensions.slideWidth * Glide.index;

  return transformer(Glide, Components).transform(translate);
};

/**
 * Provide a transform value of the `carousel` type glide.
 *
 * @param  {Glide}  Glide
 * @param  {Object} Components
 * @return {Number}
 */
var Carousel = function (Glide, Components) {
  var mutator = transformer(Glide, Components);

  var slideWidth = Components.Dimensions.slideWidth;
  var slidesLength = Components.Html.slides.length;

  if (Components.Run.isOffset('<')) {
    Components.Transition.after(function () {
      emit('carousel.jumping', {
        movement: mutator.transform(slideWidth * (slidesLength - 1))
      });
    });

    return mutator.transform(-slideWidth);
  }

  if (Components.Run.isOffset('>')) {
    Components.Transition.after(function () {
      emit('carousel.jumping', {
        movement: mutator.transform(0)
      });
    });

    return mutator.transform(slideWidth * slidesLength);
  }

  return mutator.transform(slideWidth * Glide.index);
};

var TYPES = {
  Slider: Slider,
  Carousel: Carousel
};

var Movement = function (Glide, Components, Events$$1) {
  var MOVEMENT = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    init: function init() {
      this._o = 0;
    },


    /**
     * Makes configured animation type on slider.
     *
     * @param  {Number} offset
     * @return {self}
     */
    make: function make() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.offset = offset;

      emit('animation.make', {
        movement: this.value
      });

      Components.Transition.after(function () {
        emit('animation.make.after');
      });
    }
  };

  define(MOVEMENT, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return MOVEMENT._o;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(value) {
      MOVEMENT._o = typeof value !== 'undefined' ? parseInt(value) : 0;
    }
  });

  define(MOVEMENT, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get: function get() {
      return TYPES[ucfirst(Glide.type)](Glide, Components);
    }
  });

  define(MOVEMENT, 'value', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get: function get() {
      return this.translate - this.offset;
    }
  });

  listen(['build.init.before', 'run.make.after'], function () {
    MOVEMENT.make();
  });

  return MOVEMENT;
};

var Callbacks = function (Glide, Components) {
  var CALLBACKS = {
    /**
     * Calls callback with attributes.
     *
     * @param {Function} closure
     * @return {self}
     */
    call: function call(closure) {
      if (closure !== 'undefined' && typeof closure === 'function') {
        closure(this.params);
      }
    }
  };

  define(CALLBACKS, 'params', {
    /**
     * Gets attributes for events callback's parameter.
     *
     * @return {Object}
     */
    get: function get() {
      return {
        index: Glide.index
      };
    }
  });

  return CALLBACKS;
};

var Transition = function (Glide, Components, Events$$1) {
  var disabled = false;

  var TRANSITION = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

      var settings = Glide.settings;

      if (!disabled) {
        return property + ' ' + settings.animationDuration + 'ms ' + settings.animationTimingFunc;
      }

      return property + ' 0ms ' + settings.animationTimingFunc;
    },


    /**
     * Sets value of transition.
     *
     * @param {String} property
     * @return {self}
     */
    set: function set(property) {
      Components.Html.wrapper.style.transition = this.compose(property);

      return this;
    },


    /**
     * Runs callback after animation.
     *
     * @param  {Closure} callback
     * @return {Integer}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, Glide.settings.animationDuration + 10);
    },


    /**
     * Enable transition.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;

      return this.set();
    },


    /**
     * Disable transition.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;

      return this.set();
    }
  };

  listen('animation.make', function () {
    TRANSITION.set();
  });

  listen(['build.init.before', 'window.resize.before', 'carousel.jumping'], function () {
    TRANSITION.disable();
  });

  listen(['build.init.after', 'window.resize.after', 'run.make.after'], function () {
    TRANSITION.enable();
  });

  return TRANSITION;
};

var Translate = function (Glide, Components) {
  var TRANSLATE = {
    /**
     * Gets value of translate.
     *
     * @param  {Integer} value
     * @return {String}
     */
    get: function get(value) {
      return 'translate3d(' + -1 * value + 'px, 0px, 0px)';
    },


    /**
     * Sets value of translate.
     *
     * @param {HTMLElement} el
     * @return {self}
     */
    set: function set(value) {
      Components.Html.wrapper.style.transform = this.get(value);

      return this;
    }
  };

  listen(['animation.make', 'carousel.jumping'], function (data) {
    TRANSLATE.set(data.movement);
  });

  return TRANSLATE;
};

var Dimensions = function (Glide, Components, Events$$1) {
  var DIMENSIONS = {
    /**
     * Applys dimentions to the glide HTML elements.
     *
     * @return {Void}
     */
    apply: function apply() {
      this.setupSlides();
      this.setupWrapper();
    },


    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides(dimention) {
      for (var i = 0; i < Components.Html.slides.length; i++) {
        Components.Html.slides[i].style.width = this.slideWidth + 'px';
      }
    },


    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper(dimention) {
      Components.Html.wrapper.style.width = this.wrapperSize + 'px';
    }
  };

  define(DIMENSIONS, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get$$1() {
      return DIMENSIONS.slideWidth * DIMENSIONS.length + Components.Clones.grow;
    }
  });

  define(DIMENSIONS, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get$$1() {
      return Components.Html.slides.length;
    }
  });

  define(DIMENSIONS, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get: function get$$1() {
      return Components.Html.root.offsetWidth;
    }
  });

  define(DIMENSIONS, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get: function get$$1() {
      var peek = Components.Peek.value;
      var perView = Glide.settings.perView;
      var rootWidth = Components.Html.root.offsetWidth;

      if ((typeof peek === 'undefined' ? 'undefined' : _typeof(peek)) === 'object') {
        return rootWidth / perView - peek.before / perView - peek.after / perView;
      }

      return rootWidth / perView - peek * 2 / perView;
    }
  });

  listen('build.init.before', function () {
    DIMENSIONS.apply();
  });

  return DIMENSIONS;
};

var COMPONENTS = {
  // Required
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Dimensions: Dimensions,
  Movement: Movement,
  Peek: Peek,
  Clones: Clones,
  Window: Window,
  Callbacks: Callbacks,
  Build: Build,
  Run: Run,
  // Optional
  Swipe: Swipe,
  Height: Height,
  Images: Images,
  Anchors: Anchors,
  Controls: Controls,
  Keyboard: Keyboard,
  Autoplay: Autoplay
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

    this.settings = _extends(defaults, options);

    this.disabled = false;
    this.selector = selector;
    this.index = this.settings.startAt;

    this.settings.beforeInit(this);

    this.mount(this.settings.extensions);

    this.settings.afterInit(this);
  }

  /**
   * Initializes glide components.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Void}
   */


  createClass(Glide, [{
    key: 'mount',
    value: function mount(extensions) {
      init(this, _extends(extensions, COMPONENTS), Events);
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: 'isType',


    /**
     * Checks if slider is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
    value: function isType(name) {
      return this.settings.type === name;
    }
  }, {
    key: 'settings',
    get: function get$$1() {
      return this._o;
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
        this._o = opt;
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
      return this._i;
    }

    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set$$1(i) {
      this._i = parseInt(i);
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
