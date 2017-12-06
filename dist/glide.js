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
    }
  }
}

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

function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}

var Run = function (Glide, Components) {
  var flag = false;
  var running = false;

  var RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    init: function init() {
      var _this = this;

      if (Glide.settings.autoplay || running) {
        if (typeof this.interval === 'undefined') {
          this.interval = setInterval(function () {
            _this.stop().make('>').init();
          }, this.period);
        }
      }

      return this;
    },


    /**
     * Stops autorunning of the glide.
     *
     * @return {self}
     */
    stop: function stop() {
      if (Glide.settings.autoplay || running) {
        if (this.interval >= 0) {
          this.interval = clearInterval(this.interval);
        }
      }

      return this;
    },


    /**
     * Handles glide status. Calculates current index
     * based on passed move and slider type.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make: function make(move, callback) {
      this.direction = move.substr(0, 1);
      this.steps = move.substr(1) ? parseInt(move.substr(1)) : 0;

      switch (this.direction) {
        case '>':
          if (typeof this.steps === 'number' && this.steps !== 0) {
            Glide.index += Math.min(this.length - Glide.index, -this.steps);
          } else if (this.steps === '>') {
            Glide.index = this.length;
          } else if (this.isEnd()) {
            Glide.index = 0;

            this.flag = true;
          } else {
            Glide.index++;
          }
          break;

        case '<':
          if (typeof this.steps === 'number' && this.steps !== 0) {
            Glide.index -= Math.min(Glide.index, this.steps);
          } else if (this.steps === '<') {
            Glide.index = 0;
          } else if (this.isStart()) {
            Glide.index = this.length;

            this.flag = true;
          } else {
            Glide.index--;
          }
          break;

        case '=':
          Glide.index = this.steps;
          break;
      }

      Components.Animation.make().after(function () {
        Components.Build.activeClass();
      });

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
      return flag && this.direction === direction;
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

  define(RUN, 'period', {
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

  return RUN;
};

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
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
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

var Peek = function (Glide, Components) {
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
    get: function get() {
      return PEEK._s;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      if (typeof value === 'string') {
        var normalized = parseInt(value, 10);
        var isPercentage = value.indexOf('%') >= 0;

        if (isPercentage) {
          value = parseInt(Components.Dimensions.width * (normalized / 100));
        } else {
          value = normalized;
        }
      }

      if (typeof value === 'number') {
        this._s = value;
      } else {
        warn('Invalid peek value');
      }
    }
  });

  return PEEK;
};

var Build = function (Glide, Components) {
  return {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    init: function init() {
      Components.Transition.disable();
      Components.Peek.init();
      Components.Dimensions.apply();

      this.typeClass();
      this.modeClass();
      this.activeClass();
      this.setHeight();

      Components.Animation.make();
      Components.Transition.enable();
    },


    /**
     * Sets height of the slides track.
     *
     * @return {Void}
     */
    setHeight: function setHeight() {
      if (Glide.settings.autoheight) {
        Components.Height.set();
      }
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
     * Adds `mode` class to the glide element.
     *
     * @return {Void}
     */
    modeClass: function modeClass() {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.mode]);
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

var Swipe = function (Glide, Components) {
  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var dragging = false;

  var Events = new EventBus();

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

        Components.Run.stop();
        Components.Callbacks.call(Glide.settings.swipeStart);
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
          Components.Animation.make(subExSx * parseFloat(Glide.settings.touchRatio));
        }

        if (swipeSin * 180 / Math.PI < Glide.settings.touchAngle) {
          event.stopPropagation();
          event.preventDefault();

          Components.Html.wrapper.classList.add(Glide.settings.classes.dragging);
        } else {
          return;
        }

        Components.Anchors.prevent().detach();
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
          Components.Animation.make();
        }

        Components.Html.wrapper.classList.remove(Glide.settings.classes.dragging);

        this.unbindSwipeMove();
        this.unbindSwipeEnd();

        Components.Animation.after(function () {
          Components.Run.init();
          Components.Anchors.unprevent().attach();
        });

        Components.Callbacks.call(Glide.settings.swipeEnd);
      }
    },


    /**
    * Binds swipe's starting event.
    *
    * @return {Void}
    */
    bindSwipeStart: function bindSwipeStart() {
      if (Glide.settings.swipeThreshold) {
        Events.on(START_EVENTS[0], Components.Html.wrapper, this.start.bind(this));
      }

      if (Glide.settings.dragThreshold) {
        Events.on(START_EVENTS[1], Components.Html.wrapper, this.start.bind(this));
      }
    },


    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Events.off(START_EVENTS[0], Components.Html.wrapper);
      Events.off(START_EVENTS[1], Components.Html.wrapper);
    },


    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      Events.on(MOVE_EVENTS, Components.Html.wrapper, this.move.bind(this));
    },


    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Events.off(MOVE_EVENTS, Components.Html.wrapper);
    },


    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      Events.on(END_EVENTS, Components.Html.wrapper, this.end.bind(this));
    },


    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Events.off(END_EVENTS, Components.Html.wrapper);
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

var Arrows = function (Glide, Components) {
  var Events = new EventBus();

  var ARROWS_SELECTOR = '[data-glide-el="arrows"]';

  var ARROWS = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    init: function init() {
      this._el = Components.Html.root.querySelector(ARROWS_SELECTOR);

      this.bind();
    },


    /**
     * Binds events to arrows HTML elements.
     *
     * @return {Void}
     */
    bind: function bind() {
      for (var i = 0; i < this.items.length; i++) {
        Events.on(['click', 'touchstart'], this.items[i], this.click);
        Events.on(['mouseenter', 'mouseleave'], this.items[i], this.hover);
      }
    },


    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      for (var i = 0; i < this.items.length; i++) {
        Events.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], this.items[i]);
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

      if (!Glide.disabled) {
        Components.Run.stop().make(event.target.dataset.glideDir);

        Components.Animation.after(function () {
          Components.Run.init();
        });
      }
    },


    /**
     * Handles `hover` event on the arrows HTML elements.
     * Plays and pauses autoplay running.
     *
     * @param {Object} event
     * @return {Void}
     */
    hover: function hover(event) {
      if (!Glide.disabled) {
        if (event.type === 'mouseleave') {
          Components.Run.init();
        }

        if (event.type === 'mouseenter') {
          Components.Run.stop();
        }
      }
    }
  };

  define(ARROWS, 'items', {
    /**
    * Gets collection of the arrows HTML elements.
    *
    * @return {HTMLElement[]}
    */
    get: function get() {
      return this._el.children;
    }
  });

  return ARROWS;
};

// Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
// This accumulates the arguments passed into an array, after a given index.
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

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
var delay = restArgs(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

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
  var Events = new EventBus();

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
      Events.on('resize', window, debounce(this.resize.bind(this), Glide.settings.debounce.resize));
    },


    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Events.off('resize', window);
    },


    /**
     * Handler for `resize` event. Rebuilds glide,
     * so its status matches new dimentions.
     */
    resize: function resize() {
      if (!Glide.destroyed) {
        Components.Transition.disable();

        Components.Build.init();
        Components.Run.make('=' + Glide.index).init();

        Components.Transition.enable();
      }
    }
  };
};

var Images = function (Glide, Components) {
  var Events = new EventBus();

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
      Events.on('dragstart', Components.Html.wrapper, this.dragstart);
    },


    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Events.off('dragstart', Components.Html.wrapper, this.dragstart);
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

var Bullets = function (Glide, Components) {
  var Events = new EventBus();

  var BULLETS_SELECTOR = '[data-glide-el="bullets"]';

  var BULLETS = {
    /**
     * Inits bullets. Binds events listeners
     * to the bullets HTML elements.
     *
     * @return {Void}
     */
    init: function init() {
      this._el = Components.Html.root.querySelector(BULLETS_SELECTOR);

      this.bind();
    },


    /**
     * Binds events to bullets HTML elements.
     *
     * @return {Void}
     */
    bind: function bind() {
      var items = this.items;

      for (var i = 0; i < items.length; i++) {
        Events.on(['click', 'touchstart'], items[i], this.click);
        Events.on(['mouseenter', 'mouseleave'], items[i], this.hover);
      }
    },


    /**
     * Unbinds events binded to the bullets HTML elements.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      for (var i = 0; i < this.items.length; i++) {
        Events.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], this.items[i]);
      }
    },


    /**
     * Handles `click` event on the bullets HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click: function click(event) {
      event.preventDefault();

      if (!Glide.disabled) {
        Components.Run.stop().make(event.target.dataset.glideDir);

        Components.Animation.after(function () {
          Components.Run.init();
        });
      }
    },


    /**
     * Handles `hover` event on the bullets HTML elements.
     * Plays and pauses autoplay running.
     *
     * @param {Object} event
     * @return {Void}
     */
    hover: function hover(event) {
      if (!Glide.disabled) {
        if (event.type === 'mouseleave') {
          Components.Run.init();
        }

        if (event.type === 'mouseenter') {
          Components.Run.stop();
        }
      }
    }
  };

  define(BULLETS, 'items', {
    /**
    * Gets collection of the arrows HTML elements.
    *
    * @return {HTMLElement[]}
    */
    get: function get() {
      return this._el.children;
    }
  });

  return BULLETS;
};

var Anchors = function (Glide, Components) {
  var detached = false;
  var prevented = false;

  var Events = new EventBus();

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

  return ANCHORS;
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

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var Peeking = function (Glide, Components) {
  return {
    translate: function translate(_translate) {
      if (Glide.settings.focusAt >= 0) {
        _translate -= Components.Peek.value / 2;
      }

      return _translate;
    }
  };
};

var Focusing = function (Glide, Components) {
  return {
    translate: function translate(_translate) {
      var width = Components.Dimensions.width;
      var focusAt = Glide.settings.focusAt;
      var slideSize = Components.Dimensions.slideSize;

      if (focusAt === 'center') {
        _translate -= width / 2 - slideSize / 2;
      }

      if (focusAt >= 0) {
        _translate -= slideSize * focusAt;
      }

      return _translate;
    }
  };
};

var TRANSFORMERS = [Peeking, Focusing];

var transformer = function (Glide, Components) {
  return {
    transform: function transform(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        translate = TRANSFORMERS[i](Glide, Components).translate(translate);
      }

      return translate;
    }
  };
};

var Slider = function (Glide, Components) {
  var translate = Components.Dimensions.slideSize * Glide.index;

  return transformer(Glide, Components).transform(translate);
};

var Animation = function (Glide, Components) {
  var TYPES = {
    Slider: Slider
  };

  var ANIMATION = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    init: function init() {
      this._d = 0;
    },


    /**
     * Makes configured animation type on slider.
     *
     * @param  {Number} offset
     * @return {self}
     */
    make: function make(offset) {
      this.offset = offset;

      this.apply();

      return this;
    },


    /**
     * Applies an animation.
     *
     * @return {Void}
     */
    apply: function apply() {
      Components.Transition.set();
      Components.Translate.set(this.translate - this.offset);
    },


    /**
     * Runs callback after animation.
     *
     * @param  {Closure} callback
     * @return {Integer}
     */
    after: function after(callback) {
      return setTimeout(function () {
        callback();
      }, Glide.settings.animationDuration + 10);
    }
  };

  define(ANIMATION, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return ANIMATION._d;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(value) {
      ANIMATION._d = typeof value !== 'undefined' ? parseInt(value) : 0;
    }
  });

  define(ANIMATION, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get: function get() {
      return TYPES[ucfirst(Glide.type)](Glide, Components);
    }
  });

  return ANIMATION;
};

var Transition = function (Glide, Components) {
  var disabled = false;

  return {
    /**
     * Gets value of transition.
     *
     * @param {String} property
     * @return {String}
     */
    get: function get() {
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
      Components.Html.wrapper.style.transition = this.get(property);

      return this;
    },


    /**
     * Enable transition.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;

      return this;
    },


    /**
     * Disable transition.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;

      return this;
    }
  };
};

var Translate = function (Glide, Components) {
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

  return {
    /**
     * Gets value of translate.
     *
     * @param  {Integer} value
     * @return {String}
     */
    get: function get(value) {
      AXES[Components.Dimensions.dimention.axis] = parseInt(value);

      return "translate3d(" + -1 * AXES.x + "px, " + -1 * AXES.y + "px, " + -1 * AXES.z + "px)";
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
};

var Dimensions = function (Glide, Components) {
  var MODE_TO_DIMENSIONS = {
    horizontal: ['width', 'x'],
    vertical: ['height', 'y']
  };

  var DIMENSIONS = {
    /**
     * Applys dimentions to the glide HTML elements.
     *
     * @return {Void}
     */
    apply: function apply() {
      var dimention = this.dimention.size;

      this.setupSlides(dimention);
      this.setupWrapper(dimention);
    },


    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides(dimention) {
      for (var i = 0; i < Components.Html.slides.length; i++) {
        Components.Html.slides[i].style[dimention] = this.slideSize + 'px';
      }
    },


    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper(dimention) {
      Components.Html.wrapper.style[dimention] = this.wrapperSize + 'px';
    }
  };

  define(DIMENSIONS, 'dimention', {
    /**
     * Gets dimentions map for current glide's mode.
     *
     * @return {Object}
     */
    get: function get() {
      return {
        size: MODE_TO_DIMENSIONS[Glide.settings.mode][0],
        axis: MODE_TO_DIMENSIONS[Glide.settings.mode][1]
      };
    }
  });

  define(DIMENSIONS, 'slideSize', {
    /**
     * Gets dimentions map for current glide's mode.
     *
     * @return {Object}
     */
    get: function get() {
      if (Glide.isMode('vertical')) {
        return this.slideHeight;
      }

      return this.slideWidth;
    }
  });

  define(DIMENSIONS, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return this.slideSize * this.length;
    }
  });

  define(DIMENSIONS, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });

  define(DIMENSIONS, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.root.offsetWidth;
    }
  });

  define(DIMENSIONS, 'height', {
    /**
     * Gets height value of the glide.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.root.offsetHeight;
    }
  });

  define(DIMENSIONS, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;

      return Components.Html.root.offsetWidth / perView - Components.Peek.value / perView;
    }
  });

  define(DIMENSIONS, 'slideHeight', {
    /**
     * Gets height value of the single slide.
     *
     * @return {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;

      return Components.Html.root.offsetHeight / perView - Components.Peek.value / perView;
    }
  });

  return DIMENSIONS;
};

var COMPONENTS = {
  Html: Html,
  Build: Build,
  Arrows: Arrows,
  Bullets: Bullets,
  Anchors: Anchors,
  Callbacks: Callbacks,
  Animation: Animation,
  Images: Images,
  Window: Window,
  Swipe: Swipe,
  Run: Run,
  Transition: Transition,
  Dimensions: Dimensions,
  Translate: Translate,
  Peek: Peek
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
