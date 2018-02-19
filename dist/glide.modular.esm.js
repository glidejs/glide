/*!
 * Glide.js v3.0.0
 * (c) 2013-2018 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 'center',

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: 4000,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A maximum number of slides to whom movement is made on swiping or dragging. Use `false` for unlimited.
   *
   * @type {Number|Boolean}
   */
  perTouch: false,

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

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
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Set height of the slider based on current slide content.
   *
   * @type {Boolean}
   */
  autoheight: false,

  /**
   * Switch to "right to left" moving mode.
   *
   * @type {Boolean}
   */
  rtl: false,

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   * For example:
   * `100`, `'100'`, `'100px'` - Peek 100px on the both sides.
   * { left: 100, right: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Collection of internally used HTML classes.
   *
   * @type {Object}
   */
  classes: {
    rtl: 'glide--rtl',
    slider: 'glide--slider',
    carousel: 'glide--carousel',
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    cloneSlide: 'glide__slide--clone',
    activeNav: 'glide__bullet--active',
    activeSlide: 'glide__slide--active',
    disabledArrow: 'glide__arrow--disabled'
  }
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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {Number|String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Indicates whether the specified value is an object.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}

/**
 * Indicates whether the specified value is a number.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Indicates whether the specified value is a function.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Indicates whether the specified value is an array.
 *
 * @param  {Mixed}   value
 * @return {Boolean}
 */
function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Glide} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */
function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

var EventsBus = function () {
  function EventsBus() {
    var topics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBus);

    this.topics = topics;
    this.hOP = topics.hasOwnProperty;
  }

  createClass(EventsBus, [{
    key: 'listen',
    value: function listen(topic, listener) {
      if (isArray(topic)) {
        for (var i = 0; i < topic.length; i++) {
          this.listen(topic[i], listener);
        }
      }

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
    key: 'emit',
    value: function emit(topic, info) {
      if (isArray(topic)) {
        for (var i = 0; i < topic.length; i++) {
          this.emit(topic[i], info);
        }
      }

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

var Events = null;
var Components = {};

var Glide$2 = function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Glide);

    Events = new EventsBus();

    this.disabled = false;
    this.selector = selector;
    this.settings = _extends({}, defaults, options);
    this.index = this.settings.startAt;
  }

  /**
   * Initializes glide components.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Self}
   */


  createClass(Glide, [{
    key: 'mount',
    value: function mount$$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Events.emit('mount.before');

      if (isObject(extensions)) {
        Components = mount(this, extensions, Events);
      } else {
        warn('You need to provide a components object on `mount()`');
      }

      Events.emit('mount.after');

      return this;
    }

    /**
     * Reinits glide with specified settings.
     *
     * @param {Object} settings
     * @return {Self}
     */

  }, {
    key: 'reinit',
    value: function reinit() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = _extends(this.settings, settings);
      this.index = this.settings.startAt;

      Events.emit('reinit');

      return this;
    }

    /**
     * Reinits glide with specified settings.
     *
     * @param {Object} settings
     * @return {Self}
     */

  }, {
    key: 'update',
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = _extends(this.settings, settings);

      Events.emit('update');

      return this;
    }

    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     *
     * @param {String} pattern
     * @return {Self}
     */

  }, {
    key: 'go',
    value: function go(pattern) {
      Components.Run.make(pattern);

      return this;
    }

    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Self}
     */

  }, {
    key: 'move',
    value: function move(distance) {
      Components.Transition.disable();
      Components.Move.make(distance);

      return this;
    }

    /**
     * Destroy instance and revert all changes done by components.
     *
     * @return {Self}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      Events.emit('destroy');

      return this;
    }

    /**
     * Unpause instance autoplaying.
     *
     * @return {Self}
     */

  }, {
    key: 'play',
    value: function play() {
      Events.emit('play');

      return this;
    }

    /**
     * Unpause instance autoplaying.
     *
     * @return {Self}
     */

  }, {
    key: 'pause',
    value: function pause() {
      Events.emit('pause');

      return this;
    }

    /**
     * Sets glide into a idle status.
     *
     * @return {Void}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;

      return this;
    }

    /**
     * Sets glide into a active status.
     *
     * @return {Void}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;

      return this;
    }

    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Void}
     */

  }, {
    key: 'on',
    value: function on(event, handler) {
      Events.listen(event, handler);

      return this;
    }

    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: 'isType',
    value: function isType(name) {
      return this.settings.type === name;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

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
      if (isObject(opt)) {
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
      this._i = toInt(i);
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

    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: 'disabled',
    get: function get$$1() {
      return this._d;
    }

    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set$$1(status) {
      this._d = !!status;
    }
  }]);
  return Glide;
}();

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

/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */
function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    return r[k] = obj[k], r;
  }, {});
}

var Run = function (Glide, Components, Events) {
  var RUN = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {self}
     */
    mount: function mount() {
      this._f = false;
    },


    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     * @param {Function} callback
     */
    make: function make(move, callback) {
      var _this = this;

      if (!Glide.disabled) {
        Glide.disable();

        this.move = move;

        Events.emit('run.before', this.move);

        this.calculate();

        Events.emit('run', this.move);

        Components.Transition.after(function () {
          if (_this.isOffset('<') || _this.isOffset('>')) {
            _this._f = false;

            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);

          Glide.enable();
        });
      }
    },


    /**
     * Calculates current index based on passed move.
     *
     * @return {Void}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction;


      var countableSteps = isNumber(steps) && toInt(steps) !== 0;

      switch (direction) {
        case '>':
          if (countableSteps) {
            Glide.index += Math.min(length - Glide.index, -toInt(steps));
          } else if (steps === '>') {
            Glide.index = length;
          } else if (this.isEnd()) {
            this._f = true;

            Glide.index = 0;

            Events.emit('run.end', move);
          } else {
            Glide.index++;
          }
          break;

        case '<':
          if (countableSteps) {
            Glide.index -= Math.min(Glide.index, toInt(steps));
          } else if (steps === '<') {
            Glide.index = 0;
          } else if (this.isStart()) {
            this._f = true;

            Glide.index = length;

            Events.emit('run.start', move);
          } else {
            Glide.index--;
          }
          break;

        case '=':
          Glide.index = steps;
          break;
      }
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
      return Glide.isType('carousel') && this._f && this.move.direction === direction;
    }
  };

  define(RUN, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },


    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      this._m = {
        direction: value.substr(0, 1),
        steps: value.substr(1) ? value.substr(1) : 0
      };
    }
  });

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

var Html = function (Glide, Components) {
  var HTML = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.slides = Array.from(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.cloneSlide);
      });
    }
  };

  define(HTML, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return HTML._r;
    },


    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(root) {
      if (isString(root)) {
        root = document.querySelector(root);
      }

      if (exist(root)) {
        HTML._r = root;
      } else {
        warn('Root element must be a existing HTML node');
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

var Peek = function (Glide, Components, Events) {
  var PEEK = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
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
      return PEEK._v;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var width = Components.Sizes.width;

      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value, width);
      }

      PEEK._v = value;
    }
  });

  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */
  Events.listen('resize', function () {
    PEEK.mount();
  });

  return PEEK;
};

var Move = function (Glide, Components, Events) {
  var MOVE = {
    /**
     * Constructs animation component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },


    /**
     * Makes configured animation type on slider.
     *
     * @param  {Number} offset
     * @return {self}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.offset = offset;

      Events.emit('move', {
        movement: this.value
      });

      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };

  define(MOVE, 'offset', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return MOVE._o;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(value) {
      MOVE._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });

  define(MOVE, 'translate', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });

  define(MOVE, 'value', {
    /**
     * Gets translate value based on configured glide type.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Glide.settings.rtl) {
        return translate + offset;
      }

      return translate - offset;
    }
  });

  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */
  Events.listen(['build.before', 'run'], function () {
    MOVE.make();
  });

  return MOVE;
};

var Sizes = function (Glide, Components, Events) {
  var SIZES = {
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
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = this.slideWidth + 'px';
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

  define(SIZES, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return SIZES.slideWidth * SIZES.length + Components.Clones.grow;
    }
  });

  define(SIZES, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });

  define(SIZES, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.root.offsetWidth;
    }
  });

  define(SIZES, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get: function get() {
      var peek = Components.Peek.value;
      var perView = Glide.settings.perView;
      var rootWidth = Components.Html.root.offsetWidth;

      if (isObject(peek)) {
        return rootWidth / perView - peek.before / perView - peek.after / perView;
      }

      return rootWidth / perView - peek * 2 / perView;
    }
  });

  /**
   * Apply calculated glide's dimensions on:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   */
  Events.listen(['build.before', 'resize'], function () {
    SIZES.apply();
  });

  return SIZES;
};

var Build = function (Glide, Components, Events) {
  var BUILD = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     */
    mount: function mount() {
      Events.emit('build.before', Glide);

      this.dirClass();
      this.typeClass();
      this.activeClass();

      Events.emit('build.after', Glide);
    },


    /**
     * Adds `rtl` class to the glide element.
     *
     * @return {Void}
     */
    dirClass: function dirClass() {
      if (Glide.settings.rtl) {
        Components.Html.root.classList.add(Glide.settings.classes.rtl);
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
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      slide.classList.add(classes.activeSlide);

      siblings(slide).forEach(function (sibling) {
        sibling.classList.remove(classes.activeSlide);
      });
    },


    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var classes = Glide.settings.classes;

      Components.Html.root.classList.remove(classes[Glide.settings.type]);

      Components.Html.root.classList.remove(classes.rtl);

      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(classes.activeSlide);
      });
    }
  };

  /**
   * Reinit building of the glide:
   * - on resizing of the window to calculate new dimentions
   * - on reiniting via API to recalculate dimentions
   * - on updating settings via API to recalculate dimentions
   */
  Events.listen(['resize', 'reinit', 'update'], function () {
    BUILD.mount();
  });

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.listen('move.after', function () {
    BUILD.activeClass();
  });

  /**
   * Clear building classes:
   * - on destroying, to bring HTML to its initial state
   */
  Events.listen('destroy', function () {
    BUILD.removeClasses();
  });

  return BUILD;
};

var Clones = function (Glide, Components, Events) {
  var pattern = [];

  var CLONES = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.map();
        this.collect();
      }
    },


    /**
     * Generate pattern of the cloning.
     *
     * @return {Void}
     */
    map: function map() {
      var perView = Glide.settings.perView;
      var length = Components.Html.slides.length;

      // Repet creating pattern based on the ratio calculated
      // by number in `perView` per actual number of slides.
      for (var r = 0; r < Math.max(1, Math.floor(perView / length)); r++) {
        // Fill pattern with indexes of slides at the beginning of track.
        for (var i = 0; i <= Math.min(perView, length - 1); i++) {
          pattern.push('' + i);
        }

        // Fill pattern with indexes of slides from the end of track.
        for (var _i = length - 1; _i >= 0; _i--) {
          pattern.unshift('-' + _i);
        }
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
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        item.style.width = Components.Sizes.slideWidth + 'px';

        // Append clone if pattern position is positive.
        // Prepend clone if pattern position is negative.
        if (pattern[i][0] === '-') {
          Components.Html.wrapper.insertBefore(item, Components.Html.slides[0]);
        } else {
          Components.Html.wrapper.appendChild(item);
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
    /**
     * Gets additional dimentions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      if (Glide.isType('carousel')) {
        return Components.Sizes.slideWidth * CLONES.items.length;
      }

      return 0;
    }
  });

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.listen('build.before', function () {
    if (Glide.isType('carousel')) {
      CLONES.append();
    }
  });

  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */
  Events.listen('destroy', function () {
    CLONES.remove();
  });

  return CLONES;
};

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */
function throttle(func, wait, options) {
  var timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

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
      if (isString(events)) {
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
      if (isString(events)) {
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

var Resize = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var RESIZE = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },


    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },


    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };

  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */
  Events.listen('destroy', function () {
    RESIZE.unbind();
  });

  return RESIZE;
};

/**
 * Reflects value of glide movement.
 *
 * @param  {Glide} Glide
 * @param  {Array} Components
 * @return {Object}
 */
var Rtl = function (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.rtl) {
        return -translate;
      }

      return translate;
    }
  };
};

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
    modify: function modify(translate) {
      if (Glide.isType('carousel')) {
        return translate + Components.Clones.grow / 2;
      }

      return translate;
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
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
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
    modify: function modify(translate) {
      var focusAt = Glide.settings.focusAt;
      var width = Components.Sizes.width;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt;
    }
  };
};

/**
 * Collection of transformers.
 *
 * @type {Array}
 */
var MUTATORS = [Grow, Peeking, Focusing,
// It's important that the Rtl component
// be last on the list, so it reflects
// all previous transformations.
Rtl];

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
    mutate: function mutate(translate) {
      for (var i = 0; i < MUTATORS.length; i++) {
        translate = MUTATORS[i](Glide, Components).modify(translate);
      }

      return translate;
    }
  };
};

var Translate = function (Glide, Components, Events) {
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
      var transform = transformer(Glide, Components).mutate(value);

      Components.Html.wrapper.style.transform = this.get(transform);

      return this;
    }
  };

  /**
   * Set new translate value on:
   * - standard moving on index change
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.listen(['move'], function (context) {
    var width = Components.Sizes.slideWidth;
    var length = Components.Html.slides.length;

    if (Components.Run.isOffset('<')) {
      Components.Transition.after(function () {
        Events.emit('translate.jump');

        TRANSLATE.set(width * (length - 1));
      });

      return TRANSLATE.set(-width);
    }

    if (Components.Run.isOffset('>')) {
      Components.Transition.after(function () {
        Events.emit('translate.jump');

        TRANSLATE.set(0);
      });

      return TRANSLATE.set(width * length);
    }

    return TRANSLATE.set(context.movement);
  });

  return TRANSLATE;
};

var Transition = function (Glide, Components, Events) {
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
      }, Glide.settings.animationDuration);
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

  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */
  Events.listen('move', function () {
    TRANSITION.set();
  });

  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimentions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.listen(['build.before', 'resize', 'translate.jump'], function () {
    TRANSITION.disable();
  });

  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */
  Events.listen('run', function () {
    TRANSITION.enable();
  });

  return TRANSITION;
};

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

var swipe = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;

  var SWIPE = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
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
      if (!disabled && !Glide.disabled) {
        this.disable();

        var swipe = this.touches(event);

        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);

        this.bindSwipeMove();
        this.bindSwipeEnd();

        Events.emit('swipe.start');
      }
    },


    /**
     * Handler for `swipemove` event.
     * Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var settings = Glide.settings;

        var swipe = this.touches(event);

        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < settings.touchAngle) {
          if (settings.rtl) {
            Components.Move.make(-subExSx * parseFloat(settings.touchRatio));
          } else {
            Components.Move.make(subExSx * parseFloat(settings.touchRatio));
          }
        }

        if (swipeSin * 180 / Math.PI < settings.touchAngle) {
          event.stopPropagation();
          event.preventDefault();

          Components.Html.root.classList.add(settings.classes.dragging);

          Events.emit('swipe.move');
        } else {
          return false;
        }
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
      if (!Glide.disabled) {
        var settings = Glide.settings;

        var swipe = this.touches(event);
        var threshold = this.threshold(event);

        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);

        this.enable();

        if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (settings.perTouch) {
            steps = Math.min(steps, toInt(settings.perTouch));
          }

          if (settings.rtl) {
            Components.Run.make('>' + steps);
          } else {
            Components.Run.make('<' + steps);
          }
        } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
          // While swipe is negative and lower than negative threshold move forward.
          if (settings.perTouch) {
            steps = Math.max(steps, -toInt(settings.perTouch));
          }

          if (settings.rtl) {
            Components.Run.make('<' + steps);
          } else {
            Components.Run.make('>' + steps);
          }
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(settings.classes.dragging);

        this.unbindSwipeMove();
        this.unbindSwipeEnd();

        Events.emit('swipe.end');
      }
    },


    /**
    * Binds swipe's starting event.
    *
    * @return {Void}
    */
    bindSwipeStart: function bindSwipeStart() {
      var settings = Glide.settings;

      if (settings.swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, this.start.bind(this));
      }

      if (settings.dragThreshold) {
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
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(this.move.bind(this), Glide.settings.throttle));
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


    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
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
      var settings = Glide.settings;

      if (MOUSE_EVENTS.includes(event.type)) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },


    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;

      Components.Transition.enable();

      return this;
    },


    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;

      Components.Transition.disable();

      return this;
    }
  };

  /**
   * Add component class:
   * - after initial building
   */
  Events.listen('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });

  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */
  Events.listen('destroy', function () {
    SWIPE.unbindSwipeStart();
    SWIPE.unbindSwipeMove();
    SWIPE.unbindSwipeEnd();
  });

  return SWIPE;
};

var height = function (Glide, Components, Events) {
  var HEIGHT = {
    /**
     * Sets height of the slider.
     *
     * @return {Void}
     */
    set: function set() {
      if (Glide.settings.autoheight) {
        var style = Components.Html.track.style;

        style.transition = Components.Transition.compose('height');
        style.height = this.value;
      }
    },


    /**
     * Unsets height of the slider.
     *
     * @return {Void}
     */
    unset: function unset() {
      if (Glide.settings.autoheight) {
        var style = Components.Html.track.style;

        style.transition = null;
        style.height = null;
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

  /**
   * Set height of the current slide on:
   * - building, so it starts with proper dimensions
   * - each run, when slide changed
   */
  Events.listen(['build.after', 'run'], function () {
    HEIGHT.set();
  });

  /**
   * Clear applied height styles:
   * - on destroying, to bring HTML to its initial state
   */
  Events.listen('destroy', function () {
    HEIGHT.unset();
  });

  return HEIGHT;
};

var images = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var IMAGES = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
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
      Binder.off('dragstart', Components.Html.wrapper);
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

  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */
  Events.listen('destroy', function () {
    IMAGES.unbind();
  });

  return IMAGES;
};

var anchors = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var detached = false;
  var prevented = false;

  var ANCHORS = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
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
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
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
      prevented = true;

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
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;

          this.items[i].setAttribute('href', this.items[i].dataset.href);

          delete this.items[i].dataset.href;
        }

        detached = false;
      }

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

  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */
  Events.listen('swipe.move', function () {
    ANCHORS.detach();
  });

  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.listen('swipe.end', function () {
    Components.Transition.after(function () {
      ANCHORS.attach();
    });
  });

  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */
  Events.listen('destroy', function () {
    ANCHORS.attach().unbind();
  });

  return ANCHORS;
};

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

var controls = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var CONTROLS = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      this._e = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

      this.activeClass();
      this.addBindings();
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      for (var i = 0; i < this._n.length; i++) {
        this.class(this._n[i]);
      }
    },


    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} wrapper
     * @return {Void}
     */
    class: function _class(wrapper) {
      var settings = Glide.settings;
      var item = wrapper.children[Glide.index];

      item.classList.add(settings.classes.activeNav);

      siblings(item).forEach(function (sibling) {
        sibling.classList.remove(settings.classes.activeNav);
      });
    },


    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._e.length; i++) {
        this.bind(this._e[i]);
      }
    },


    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._e.length; i++) {
        this.unbind(this._e[i]);
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

  /**
   * Swap active class of current navigation item:
   * - after each move to the new index
   */
  Events.listen('move.after', function () {
    CONTROLS.activeClass();
  });

  /**
   * Remove bindings from controls:
   * - on destroying, to remove added EventListeners
   */
  Events.listen('destroy', function () {
    CONTROLS.removeBindings();
  });

  return CONTROLS;
};

var keyboard = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var KEYBOARD = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },


    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },


    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.on('keyup', document);
    },


    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      if (event.keyCode === 39) {
        if (Glide.settings.rtl) {
          Components.Run.make('<');
        } else {
          Components.Run.make('>');
        }
      }

      if (event.keyCode === 37) {
        if (Glide.settings.rtl) {
          Components.Run.make('>');
        } else {
          Components.Run.make('<');
        }
      }
    }
  };

  /**
   * Remove bindings from keyboard:
   * - on destroying, to remove added EventListeners
   */
  Events.listen('destroy', function () {
    KEYBOARD.unbind();
  });

  return KEYBOARD;
};

var autoplay = function (Glide, Components, Events) {
  var Binder = new EventsBinder();

  var AUTOPLAY = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.start();

      if (Glide.settings.hoverpause) {
        this.events();
      }
    },


    /**
     * Starts autoplaying in configured interval.
     *
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
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


    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
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
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });

  /**
   * Start autoplaying:
   * - on playing via API
   * - while ending swipeing
   */
  Events.listen(['play', 'swipe.end'], function () {
    AUTOPLAY.start();
  });

  /**
   * Stop autoplaying:
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - when starting a swiping
   */
  Events.listen(['pause', 'destroy', 'swipe.start'], function () {
    AUTOPLAY.stop();
  });

  /**
   * Restart autoplaying timer:
   * - on each run, to restet defined interval
   */
  Events.listen('run', function () {
    AUTOPLAY.stop();
    AUTOPLAY.start();
  });

  return AUTOPLAY;
};

var breakpoints = function (Glide, Components, Events) {
  // If there are breakpoints, sort it from smaller to larger.
  if (isObject(Glide.settings.breakpoints)) {
    Glide.settings.breakpoints = sortKeys(Glide.settings.breakpoints);
  }

  // Cache default settings before we overwritting.
  var defaults = _extends({}, Glide.settings);

  var BREAKPOINTS = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} breakpoints
     * @returns {Object}
     */
    match: function match(breakpoints) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in breakpoints) {
          if (breakpoints.hasOwnProperty(point)) {
            if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
              return breakpoints[point];
            }
          }
        }
      }

      return defaults;
    }
  };

  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */
  Glide.settings = _extends(Glide.settings, BREAKPOINTS.match(Glide.settings.breakpoints));

  /**
   * Reinit glide on:
   * - window resize with proper settings for matched breakpoint
   */
  Events.listen('resize', function () {
    Glide.update(BREAKPOINTS.match(Glide.settings.breakpoints));
  });

  return BREAKPOINTS;
};

var COMPONENTS = {
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Peek: Peek,
  Sizes: Sizes,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run
};

var Glide = function (_Core) {
  inherits(Glide, _Core);

  function Glide() {
    classCallCheck(this, Glide);
    return possibleConstructorReturn(this, (Glide.__proto__ || Object.getPrototypeOf(Glide)).apply(this, arguments));
  }

  createClass(Glide, [{
    key: 'mount',
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return get(Glide.prototype.__proto__ || Object.getPrototypeOf(Glide.prototype), 'mount', this).call(this, _extends(COMPONENTS, extensions));
    }
  }]);
  return Glide;
}(Glide$2);

export { swipe as Swipe, height as Height, images as Images, anchors as Anchors, controls as Controls, keyboard as Keyboard, autoplay as Autoplay, breakpoints as Breakpoints };
export default Glide;
