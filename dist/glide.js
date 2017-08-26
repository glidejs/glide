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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Glide = function Glide(element, options) {
    _classCallCheck(this, Glide);

    this.options = Object.assign(defaults, options);
};

return Glide;

})));
