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
  autoplay: 4000,
  type: 'carousel',
  mode: 'horizontal',
  startAt: 1,
  hoverpause: true,
  keyboard: true,
  touchDistance: 80,
  dragDistance: 120,
  animationDuration: 400,
  animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  throttle: 16,
  autoheight: false,
  paddings: 0,
  centered: true,
  classes: {
    base: 'glide',
    wrapper: 'glide__wrapper',
    track: 'glide__track',
    slide: 'glide__slide',
    arrows: 'glide__arrows',
    arrow: 'glide__arrow',
    arrowNext: 'next',
    arrowPrev: 'prev',
    bullets: 'glide__bullets',
    bullet: 'glide__bullet',
    clone: 'clone',
    active: 'active',
    dragging: 'dragging',
    disabled: 'disabled'
  },
  beforeInit: function beforeInit(event) {},
  afterInit: function afterInit(event) {},
  beforeTransition: function beforeTransition(event) {},
  duringTransition: function duringTransition(event) {},
  afterTransition: function afterTransition(event) {},
  swipeStart: function swipeStart(event) {},
  swipeEnd: function swipeEnd(event) {},
  swipeMove: function swipeMove(event) {}
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

var Core = function () {
  function Core() {
    classCallCheck(this, Core);

    this.uid = new Date().valueOf();
  }

  createClass(Core, [{
    key: 'settings',
    set: function set$$1(settings) {
      this.settings = _extends(defaults, settings);
    }
  }, {
    key: 'element',
    set: function set$$1(element) {
      this.element = element;
    }
  }]);
  return Core;
}();

var Core$1 = new Core();

var Glide = function Glide(element, settings) {
  classCallCheck(this, Glide);

  Core$1.element = element;
  Core$1.settings = settings;
};

return Glide;

})));
