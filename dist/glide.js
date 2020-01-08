/*!
 * Glide.js v3.4.0
 * (c) 2013-2020 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Glide = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
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

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var defaults = {
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
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perMove: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

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
     * Type of the movement.
     *
     * @type {Boolean}
     */
    loop: false,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only when not looping and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Slider will rewind to the first/last slide when it's at the start/end. Has an effect only when not looping.
     *
     * @type {Boolean}
     */
    rewind: false,

    /**
     * A number of slides moved on single swipe.
     *
     * Available types:
     * `perView` - Moves slider by one slide per swipe
     * `perMove` - Moves slider between views per swipe (number of slides defined in `perView` options)
     *
     * @type {String}
     */
    perSwipe: 'perView',

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
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Definest how many clones will be created in looped mode.
     *
     * @type {Number}
     */
    cloneRatio: 1,

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
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 15,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
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
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slide: {
        clone: 'glide__slide--clone',
        active: 'glide__slide--active'
      },
      arrow: {
        disabled: 'glide__arrow--disabled'
      },
      nav: {
        active: 'glide__bullet--active'
      }
    }
  };

  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */
  function warn(msg) {
    console.error("[Glide warn]: ".concat(msg));
  }

  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */
  function toInt(value) {
    return parseInt(value);
  }
  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */

  function toFloat(value) {
    return parseFloat(value);
  }
  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */

  function isObject(value) {
    var type = _typeof(value);

    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }
  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */

  function isArray(value) {
    return value.constructor === Array;
  }

  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
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
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} target
   * @param  {Object} source
   * @return {Object}
   */

  function mergeDeep(target, source) {
    var output = _extends({}, target);

    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (isObject(source[key])) {
          if (!(key in target)) {
            _extends(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = mergeDeep(target[key], source[key]);
          }
        } else {
          _extends(output, _defineProperty({}, key, source[key]));
        }
      });
    }

    return output;
  }

  var EventsBus =
  /*#__PURE__*/
  function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, EventsBus);

      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    _createClass(EventsBus, [{
      key: "on",
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }

          return;
        } // Create the event's object if not yet created


        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        } // Add the handler to queue


        var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: "emit",
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }

          return;
        } // If the event doesn't exist, or there's no handlers in queue, just leave


        if (!this.hop.call(this.events, event)) {
          return;
        } // Cycle through events queue, fire!


        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);

    return EventsBus;
  }();

  var Glide =
  /*#__PURE__*/
  function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Glide);

      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeDeep(defaults, options);
      this.index = this.settings.startAt;
    }
    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    _createClass(Glide, [{
      key: "mount",
      value: function mount$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }
      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: "mutate",
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }
      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: "update",
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.settings = mergeDeep(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

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
       * @return {Glide}
       */

    }, {
      key: "go",
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }
      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: "move",
      value: function move(distance) {
        this._c.Transition.disable();

        this._c.Move.make(distance);

        return this;
      }
      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }
      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: "play",
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }
      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: "pause",
      value: function pause() {
        this._e.emit('pause');

        return this;
      }
      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: "disable",
      value: function disable() {
        this.disabled = true;
        return this;
      }
      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: "enable",
      value: function enable() {
        this.disabled = false;
        return this;
      }
      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: "on",
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }
      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: "settings",
      get: function get() {
        return this._o;
      }
      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set(o) {
        if (isObject(o)) {
          this._o = o;
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
      key: "index",
      get: function get() {
        return this._i;
      }
      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set(i) {
        this._i = toInt(i);
      }
      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: "disabled",
      get: function get() {
        return this._d;
      }
      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set(status) {
        this._d = !!status;
      }
    }]);

    return Glide;
  }();

  function Run (Glide, Components, Events) {
    /**
     * Returns index value to move forward/to the right
     *
     * @param distance
     * @returns {Number}
     */
    var calculateForwardIndex = function calculateForwardIndex(distance) {
      var index = Glide.index;

      if (Glide.settings.loop) {
        return index + distance;
      }

      return index + (distance - index % distance);
    };
    /**
     * Calculates index value to move backward/to the left
     *
     * @param distance
     * @returns {Number}
     */


    var calculateBackwardIndex = function calculateBackwardIndex(distance) {
      var index = Glide.index;

      if (Glide.settings.loop) {
        return index - distance;
      }

      return (Math.ceil(index / distance) - 1) * distance;
    };
    /**
     * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param distance
     * @returns {Number}
     */


    var normalizeForwardIndex = function normalizeForwardIndex(index, distance) {
      var length = Run.length;

      if (index <= length) {
        return index;
      }

      if (Glide.settings.loop) {
        return index - (length + 1);
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on the last possible index value given by bound
        if (Run.isBound() && !Run.isEnd()) {
          return length;
        }

        return 0;
      }

      if (Run.isBound()) {
        return length;
      }

      return Math.floor(length / distance) * distance;
    };
    /**
     * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param distance
     * @returns {*}
     */


    var normalizeBackwardIndex = function normalizeBackwardIndex(index, distance) {
      var length = Run.length;

      if (index >= 0) {
        return index;
      }

      if (Glide.settings.loop) {
        return index + (length + 1);
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on first possible index value before we to rewind to the length given by bound
        if (Run.isBound() && Run.isStart()) {
          return length;
        }

        return Math.floor(length / distance) * distance;
      }

      return 0;
    };
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */


    var calculate = function calculate(move, length) {
      var steps = move.steps,
          direction = move.direction;
      var _Glide$settings = Glide.settings,
          loop = _Glide$settings.loop,
          perMove = _Glide$settings.perMove;
      var distance = steps === '|' ? perMove : steps || 1; // While direction is `=` we want jump to
      // a specified index described in steps.

      if (direction === '=') {
        // Check if bound is true, as we want to avoid whitespaces
        if (Glide.settings.bound && steps > length) {
          return length;
        } else {
          return steps;
        }
      } // When pattern is equal to `>>` we want
      // fast forward to the last slide.


      if (direction === '>' && steps === '>') {
        return length;
      } // When pattern is equal to `<<` we want
      // fast forward to the first slide.


      if (direction === '<' && steps === '<') {
        return 0;
      }

      if (direction === '>') {
        var index = calculateForwardIndex(distance);

        if (index > length && loop) {
          Run._o = true;
        }

        return normalizeForwardIndex(index, distance);
      }

      if (direction === '<') {
        var _index = calculateBackwardIndex(distance);

        if (_index < 0 && loop) {
          Run._o = true;
        }

        return normalizeBackwardIndex(_index, distance);
      }

      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    };

    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },

      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          Glide.disable();
          this.move = move;
          Events.emit('run.before', this.move);
          Glide.index = calculate(this.move, this.length);
          Events.emit('run', this.move);
          Components.Animation.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset('<') || _this.isOffset('>')) {
              _this._o = false;
              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);
            Glide.enable();
          });
        }
      },

      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index <= 0;
      },

      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index >= this.length;
      },

      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      },

      /**
       * Checks if bound mode is active
       *
       * @return {Boolean}
       */
      isBound: function isBound() {
        var _Glide$settings2 = Glide.settings,
            loop = _Glide$settings2.loop,
            focusAt = _Glide$settings2.focusAt,
            bound = _Glide$settings2.bound;
        return !loop && focusAt !== 'center' && bound;
      }
    };
    define(Run, 'move', {
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
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length; // If the `bound` option is active, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (this.isBound()) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });
    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });
    return Run;
  }

  function Gap (Glide, Components, Events) {
    var Gap = {};
    define(Gap, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });
    define(Gap, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gap.value * Components.Size.length;
      }
    });
    define(Gap, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;
        return Gap.value * (perView - 1) / perView;
      }
    });
    return Gap;
  }

  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }
  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */

  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';
  function Html (Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = _toConsumableArray(this.wrapper.children);
      }
    };
    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },

      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });
    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },

      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
        }
      }
    });
    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });
    return Html;
  }

  function Peek (Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };
    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },

      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });
    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });
    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */

    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });
    return Peek;
  }

  function Loop (Glide, Components, Events) {
    var Size = Components.Size,
        Gap = Components.Gap,
        Html = Components.Html;
    var Loop = {
      set: function set(translate) {
        var slides = this.slides;
        var gapValue = Gap.value;
        var perView = Glide.settings.perView;
        var slideWidth = Size.slideWidth,
            wrapperWidth = Size.wrapperWidth;

        if (translate < wrapperWidth && translate > wrapperWidth - slideWidth * perView - gapValue * perView) {
          for (var i = 0; i < slides.length; i++) {
            slides[i].style.left = "".concat(wrapperWidth + slideWidth * i + gapValue * i, "px");
          }
        } else {
          for (var _i = 0; _i < slides.length; _i++) {
            slides[_i].style.left = "".concat(slideWidth * _i + gapValue * _i, "px");
          }
        }
      }
    };
    define(Loop, 'slides', {
      get: function get() {
        return Html.slides.slice(0, Loop.number);
      }
    });
    define(Loop, 'number', {
      get: function get() {
        var _Glide$settings = Glide.settings,
            focusAt = _Glide$settings.focusAt,
            perView = _Glide$settings.perView;

        if (focusAt === 'center') {
          return perView + Math.floor(perView / 2);
        }

        if (focusAt + 1 >= Math.round(perView / 2)) {
          return perView + focusAt;
        }

        return perView + (perView - focusAt);
      }
    });
    Events.on('translate.set', function (translate) {
      Loop.set(translate.value);
    });
    return Loop;
  }

  function Size (Glide, Components, Events) {
    var Html = Components.Html,
        Gap = Components.Gap,
        Peek = Components.Peek;

    var slides = function slides(width) {
      var slides = Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = "".concat(width, "px");
      }
    };

    var wrapper = function wrapper(width) {
      Html.wrapper.style.width = "".concat(width, "px");
    };

    var Size = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      set: function set() {
        slides(this.slideWidth);
        wrapper(this.wrapperWidth);
      },

      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Html.wrapper.style.width = '';
      }
    };
    define(Size, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Html.slides.length;
      }
    });
    define(Size, 'width', {
      /**
       * Gets width value of the slider (visible area).
       *
       * @return {Number}
       */
      get: function get() {
        return Html.root.getBoundingClientRect().width;
      }
    });
    define(Size, 'wrapperWidth', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Size.slideWidth * Size.length + Gap.grow;
      }
    });
    define(Size, 'slideWidth', {
      /**
       * Gets width value of a single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Size.width / Glide.settings.perView - Peek.reductor - Gap.reductor;
      }
    });
    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */

    Events.on(['layout.before', 'resize', 'update'], function () {
      Size.set();
    });
    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Size.remove();
    });
    return Size;
  }

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
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */

  function throttle(func, wait, options) {
    var timeout, context, args, result;
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

  var EventsBinder =
  /*#__PURE__*/
  function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, EventsBinder);

      this.listeners = listeners;
    }
    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    _createClass(EventsBinder, [{
      key: "on",
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;
          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: "off",
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: "destroy",
      value: function destroy() {
        delete this.listeners;
      }
    }]);

    return EventsBinder;
  }();

  function Resize (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Resize = {
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

    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });
    return Resize;
  }

  function Layout (Glide, Components, Events) {
    var Html = Components.Html,
        Size = Components.Size,
        Gap = Components.Gap;
    var Layout = {
      mount: function mount() {
        Events.emit('layout.before');
        this.set(Html.slides);
        Events.emit('layout.after');
      },
      set: function set(slides) {
        Html.wrapper.style.height = "".concat(Html.slides[Glide.index].getBoundingClientRect().height, "px");

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.position = 'absolute';
          slides[i].style.top = '0px';
          slides[i].style.left = "".concat(Size.slideWidth * i + Gap.value * i, "px");
        }
      }
    };
    Events.on(['resize', 'update'], function () {
      Layout.mount();
    });
    Events.on('run', function () {
      Html.wrapper.style.height = "".concat(Html.slides[Glide.index].getBoundingClientRect().height, "px");
    });
    return Layout;
  }

  function Classes (Glide, Components, Events) {
    var Html = Components.Html;
    var Classes = {
      /**
       * Adds initial classes.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('classes.before');
        this.add();
        Events.emit('classes.after');
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      add: function add() {
        var classes = Glide.settings.classes;
        var slide = Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.slide.active);
          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.slide.active);
          });
        }
      },

      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      remove: function remove() {
        var slide = Glide.settings.classes.slide;
        Html.slides.forEach(function (sibling) {
          sibling.classList.remove(slide.active);
        });
      }
    };
    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */

    Events.on(['destroy', 'update'], function () {
      Classes.remove();
    });
    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */

    Events.on(['resize', 'update'], function () {
      Classes.mount();
    });
    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */

    Events.on('run.after', function () {
      Classes.add();
    });
    return Classes;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };
  function Direction (Glide, Components, Events) {
    var classAttr = function classAttr(action, value) {
      Components.Html.root.classList[action](value);
    };

    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },

      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },

      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      }
    };
    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },

      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });
    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */

    Events.on('update', function () {
      Direction.mount();
    });
    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */

    Events.on(['classes.before', 'update'], function () {
      classAttr('add', Glide.settings.classes.direction[Direction.value]);
    });
    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */

    Events.on(['destroy', 'update'], function () {
      classAttr('remove', Glide.settings.classes.direction[Direction.value]);
    });
    return Direction;
  }

  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Rtl (Glide, Components) {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    return function (translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    };
  }

  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Gap$1 (Glide, Components) {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    return function (translate) {
      var multiplier = Math.floor(translate / Components.Size.slideWidth);
      return translate + Components.Gap.value * multiplier;
    };
  }

  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */

  function Peeking (Glide, Components) {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    return function (translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    };
  }

  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Focusing (Glide, Components) {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    return function (translate) {
      var gap = Components.Gap.value;
      var width = Components.Size.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Size.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    };
  }

  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */

  function mutator (Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap$1, Peeking, Focusing].concat(Glide._t, [Rtl]);
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */

    return function (translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer())) {
          translate = transformer(Glide, Components, Events)(translate);
        } else {
          warn('Transformer should be a function that returns the function');
        }
      }

      return translate;
    };
  }

  function Translate (Glide, Components, Events) {
    var Size = Components.Size,
        Html = Components.Html;
    /**
     * Instance of the translate mutation function.
     *
     * @type {Function}
     */

    var mutate = mutator(Glide, Components, Events);

    var calculate = function calculate(value) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var loop = Glide.settings.loop;
      var wrapperWidth = Size.wrapperWidth;
      var move = value - offset;

      if (loop) {
        if (move < 0) {
          return wrapperWidth + (value - offset);
        } else if (move > wrapperWidth) {
          return -1 * (offset + (wrapperWidth - value));
        }
      }

      return move;
    };

    var apply = function apply(value) {
      Events.emit('translate.set', {
        value: value
      });
      Html.wrapper.style.transform = "translate3d(".concat(-1 * value, "px, 0px, 0px)");
    };

    var Translate = {
      mount: function mount() {
        this._v = mutate(Size.slideWidth * Glide.index);
        this.set(0);
      },
      set: function set(offset) {
        var value = calculate(this._v, offset);
        apply(value);
        return value;
      }
    };
    define(Translate, 'value', {
      get: function get() {
        return Translate._v;
      },
      set: function set(value) {
        Translate._v = toFloat(value);
      }
    });
    Events.on('resize', function () {
      Translate.mount();
    });
    return Translate;
  }

  function Animate (Glide, Components, Events) {
    var getProgress = function getProgress(_ref) {
      var elapsed = _ref.elapsed,
          total = _ref.total;
      return Math.min(elapsed / total, 1);
    };

    var easeOut = function easeOut(progress) {
      return Math.pow(--progress, 5) + 1;
    };

    var finalPosition = 600;
    var time = {
      start: performance.now(),
      total: 2000
    };

    var tick = function tick(now) {
      time.elapsed = now - time.start;
      var progress = getProgress(time);
      var easing = easeOut(progress);
      var position = easing * finalPosition;
      element.style.transform = "translate(".concat(position, "px)");
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    var Animation = {
      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      }
    };
    define(Animation, 'duration', {
      get: function get() {
        return toInt(Glide.settings.animationDuration);
      }
    });
    return Animation;
  }

  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */
  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;

  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
  function Swipe (Glide, Components, Events) {
    var Html = Components.Html,
        Translate = Components.Translate,
        Direction = Components.Direction;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */

    var touches = function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    };
    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */


    var threshold = function threshold(event) {
      var _Glide$settings = Glide.settings,
          dragThreshold = _Glide$settings.dragThreshold,
          swipeThreshold = _Glide$settings.swipeThreshold;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return dragThreshold;
      }

      return swipeThreshold;
    };

    var translate = Translate._v;
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },

      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();
          var swipe = touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit('swipe.start');
        }
      },

      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings2 = Glide.settings,
              touchAngle = _Glide$settings2.touchAngle,
              touchRatio = _Glide$settings2.touchRatio,
              classes = _Glide$settings2.classes;
          var swipe = touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            translate = Translate.set(subExSx * toFloat(touchRatio));
            Html.root.classList.add(classes.dragging);
            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },

      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;
          var swipe = touches(event);
          var swipeThreshold = threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = toInt(settings[settings.perSwipe]);
          Translate.value = translate;
          this.enable();

          if (swipeDistance > swipeThreshold && swipeDeg < settings.touchAngle) {
            Components.Run.make("".concat(Direction.resolve('<')).concat(steps));
          } else if (swipeDistance < -swipeThreshold && swipeDeg < settings.touchAngle) {
            Components.Run.make("".concat(Direction.resolve('>')).concat(steps));
          }

          Html.root.classList.remove(settings.classes.dragging);
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
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Html.track, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Html.track, function (event) {
            _this.start(event);
          }, capture);
        }
      },

      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Html.track, capture);
        Binder.off(START_EVENTS[1], Html.track, capture);
      },

      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Html.track, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },

      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Html.track, capture);
      },

      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Html.track, function (event) {
          _this3.end(event);
        });
      },

      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Html.track);
      },

      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;
        return this;
      },

      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;
        return this;
      }
    };
    /**
     * Add component class:
     * - after initial building
     */

    Events.on('classes.after', function () {
      Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe;
  }

  function Images (Glide, Components, Events) {
    var Html = Components.Html;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    var Images = {
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
        Binder.on('dragstart', Html.wrapper, function (event) {
          event.preventDefault();
        });
      },

      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Html.wrapper);
      }
    };
    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });
    return Images;
  }

  function Anchors (Glide, Components, Events) {
    var Html = Components.Html;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */

    var detached = false;
    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */

    var prevented = false;
    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */

    var click = function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Html.wrapper.querySelectorAll('a');
        this.bind();
      },

      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Html.wrapper, click);
      },

      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Html.wrapper);
      },

      /**
       * Detaches anchors click event inside glide.
       *
       * @return {Void}
       */
      detach: function detach(items) {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < items.length; i++) {
            items[i].draggable = false;
            items[i].setAttribute('data-href', items[i].getAttribute('href'));
            items[i].removeAttribute('href');
          }

          detached = true;
        }
      },

      /**
       * Attaches anchors click events inside glide.
       *
       * @return {Void}
       */
      attach: function attach(items) {
        prevented = false;

        if (detached) {
          for (var i = 0; i < items.length; i++) {
            items[i].draggable = true;
            items[i].setAttribute('href', items[i].getAttribute('data-href'));
          }

          detached = false;
        }
      }
    };
    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });
    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */

    Events.on('swipe.move', function () {
      Anchors.detach(Anchors.items);
    });
    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */

    Events.on('swipe.end', function () {
      Components.Animation.after(function () {
        Anchors.attach(Anchors.items);
      });
    });
    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */

    Events.on('destroy', function () {
      Anchors.attach(Anchors.items);
      Anchors.unbind();
      Binder.destroy();
    });
    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
  var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
  var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");
  function Controls (Glide, Components, Events) {
    var Html = Components.Html,
        Run = Components.Run,
        Direction = Components.Direction;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */

    var addClass = function addClass(controls) {
      var classes = Glide.settings.classes;
      var item = controls[Glide.index];

      if (item) {
        item.classList.add(classes.nav.active);
        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(classes.nav.active);
        });
      }
    };
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */


    var removeClass = function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.nav.active);
      }
    };
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */


    var resetArrowState = function resetArrowState() {
      var settings = Glide.settings;

      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    };
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */


    var disableArrow = function disableArrow() {
      var settings = Glide.settings;

      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    };
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */


    var click = function click(event) {
      if (!supportsPassive$1 && event.type === 'touchstart') {
        event.preventDefault();
      }

      var direction = event.currentTarget.getAttribute('data-glide-dir');
      Run.make(Direction.resolve(direction));
    };

    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Html.root.querySelectorAll(NAV_SELECTOR);
        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */

        this._c = Html.root.querySelectorAll(CONTROLS_SELECTOR);
        /**
         * Collection of arrow control HTML elements.
         *
         * @private
         * @type {Object}
         */

        this._ac = {
          previous: Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
          next: Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
        };
        this.addBindings();
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          addClass(this._n[i].children);
        }
      },

      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          removeClass(this._n[i].children);
        }
      },

      /**
       * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
       */
      setArrowState: function setArrowState() {
        if (!Glide.settings.rewind) {
          var next = Controls._ac.next;
          var previous = Controls._ac.previous;
          resetArrowState(next, previous);

          if (Glide.index === 0) {
            disableArrow(previous);
          }

          if (Glide.index === Run.length) {
            disableArrow(next);
          }
        }
      },

      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },

      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },

      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], click);
          Binder.on('touchstart', elements[i], click, capture);
        }
      },

      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      }
    };
    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });
    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */

    Events.on(['mount.after', 'run.after'], function () {
      Controls.setActive();
    });
    /**
     * Add or remove disabled class of arrow elements
     */

    Events.on(['mount.after', 'run'], function () {
      Controls.setArrowState();
    });
    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });
    return Controls;
  }

  function Keyboard (Glide, Components, Events) {
    var Run = Components.Run,
        Direction = Components.Direction;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */

    var press = function press(event) {
      var perSwipe = Glide.settings.perSwipe;

      if (event.keyCode === 39) {
        Run.make(Direction.resolve("".concat(perSwipe, ">")));
      }

      if (event.keyCode === 37) {
        Run.make(Direction.resolve("".concat(perSwipe, "<")));
      }
    };

    var Keyboard = {
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
        Binder.on('keyup', document, press);
      },

      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      }
    };
    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */

    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });
    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */

    Events.on('update', function () {
      Keyboard.mount();
    });
    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Keyboard;
  }

  function Autoplay (Glide, Components, Events) {
    var Html = Components.Html,
        Run = Components.Run;
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */

    var Binder = new EventsBinder();
    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },

      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Run.make('>');

              _this.start();

              Events.emit('autoplay');
            }, this.time);
          }
        }
      },

      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },

      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseenter', Html.root, function () {
          _this2.stop();

          Events.emit('autoplay.enter');
        });
        Binder.on('mouseleave', Html.root, function () {
          _this2.start();

          Events.emit('autoplay.leave');
        });
      },

      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Html.root);
      }
    };
    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });
    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */

    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });
    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */

    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });
    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */

    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });
    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */

    Events.on('update', function () {
      Autoplay.mount();
    });
    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Autoplay;
  }

  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */

  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn("Breakpoints option must be an object");
    }

    return {};
  }

  function Breakpoints (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */

    var settings = Glide.settings;
    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */

    var points = sortBreakpoints(settings.breakpoints);
    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */

    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
                return points[point];
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

    _extends(settings, Breakpoints.match(points));
    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */


    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeDeep(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));
    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */

    Events.on('update', function () {
      points = sortBreakpoints(points);
      defaults = _extends({}, settings);
    });
    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Binder.off('resize', window);
    });
    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Peek: Peek,
    Gap: Gap,
    Size: Size,
    Layout: Layout,
    Run: Run,
    Translate: Translate,
    Loop: Loop,
    Animate: Animate,
    Direction: Direction,
    Resize: Resize,
    Classes: Classes,
    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 =
  /*#__PURE__*/
  function (_Core) {
    _inherits(Glide, _Core);

    function Glide() {
      _classCallCheck(this, Glide);

      return _possibleConstructorReturn(this, _getPrototypeOf(Glide).apply(this, arguments));
    }

    _createClass(Glide, [{
      key: "mount",
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);

    return Glide;
  }(Glide);

  return Glide$1;

})));
