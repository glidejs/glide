import DOM from './components/dom'
import Run from './components/run'
import Core from './components/core'
import Build from './components/build'
import Arrows from './components/arrows'
import Events from './components/events'

import defaults from './defaults'

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor(selector, options = {}) {
    this.selector = selector
    this.options = options

    let settings = Object.assign(defaults, options)

    Core.settings = settings
    Core.index = settings.startAt

    Events.call(settings.beforeInit)

    DOM.init(selector)
    Arrows.init()
    Build.init()
    Run.play()

    Events.call(settings.afterInit)
  }

  /**
   * Gets current slide index.
   *
   * @return {Number}
   */
  index() {
    return Core.index
  }
}

/**
 * Construct Glide. Initialize slider, extends
 * defaults and returning public api.
 *
 * @param {Object} element
 * @param {Object} options
 */
// let Glide = function(element, options) {

//     /**
//      * Default slider options.
//      *
//      * @type {Object}
//      */
//     var defaults = {
//         autoplay: 4000,
//         type: 'carousel',
//         mode: 'horizontal',
//         startAt: 1,
//         hoverpause: true,
//         keyboard: true,
//         touchDistance: 80,
//         dragDistance: 120,
//         animationDuration: 400,
//         animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
//         throttle: 16,
//         autoheight: false,
//         paddings: 0,
//         centered: true,
//         classes: {
//             base: 'glide',
//             wrapper: 'glide__wrapper',
//             track: 'glide__track',
//             slide: 'glide__slide',
//             arrows: 'glide__arrows',
//             arrow: 'glide__arrow',
//             arrowNext: 'next',
//             arrowPrev: 'prev',
//             bullets: 'glide__bullets',
//             bullet: 'glide__bullet',
//             clone: 'clone',
//             active: 'active',
//             dragging: 'dragging',
//             disabled: 'disabled'
//         },
//         beforeInit: function(event) {},
//         afterInit: function(event) {},
//         beforeTransition: function(event) {},
//         duringTransition: function(event) {},
//         afterTransition: function(event) {},
//         swipeStart: function(event) {},
//         swipeEnd: function(event) {},
//         swipeMove: function(event) {},
//     };

//     // Extend defaults with
//     // the init options.
//     this.options = $.extend({}, defaults, options);

//     // Generate unique slider instance id.
//     this.uuid = Math.floor(Math.random() * 1000);

//     // Start at slide number specifed in options.
//     this.current = parseInt(this.options.startAt);

//     // Store main slider DOM element.
//     this.element = element;

//     // Collect slider DOM and
//     // init slider sizes.
//     this.collect();
//     this.setup();

//     // Mark the glide as not destroyed
//     this.destroyed = false;

//     // Call before init callback.
//     this.options.beforeInit({
//         index: this.current,
//         length: this.slides.length,
//         current: this.slides.eq(this.current - 1),
//         slider: this.slider
//     });

//     /**
//      * Construct core with modules.
//      *
//      * @type {Core}
//      */
//     var Engine = new Core(this, {
//         Helper: Helper,
//         Translate: Translate,
//         Transition: Transition,
//         Arrows: Arrows,
//         Bullets: Bullets,
//         Run: Run,
//         Animation: Animation,
//         Clones: Clones,
//         Height: Height,
//         Build: Build,
//         Events: Events,
//         Touch: Touch,
//         Api: Api
//     });

//     // Call after init callback.
//     Engine.Events.call(this.options.afterInit);

//     // Return slider Api.
//     return Engine.Api.instance();

// };


// /**
//  * Collect DOM and set classes.
//  *
//  * @return {void}
//  */
// Glide.prototype.collect = function() {
//     var options = this.options;
//     var classes = options.classes;

//     this.slider = this.element.addClass(classes.base + '--' + options.type).addClass(classes.base + '--' + options.mode);
//     this.track = this.slider.find('.' + classes.track);
//     this.wrapper = this.slider.find('.' + classes.wrapper);
//     this.slides = this.track.find('.' + classes.slide).not('.' + classes.clone);
// };


// /**
//  * Setup slider dementions.
//  *
//  * @return {Void}
//  */
// Glide.prototype.setup = function() {

//     /**
//      * Mode to dimentions (size and axis) mapper.
//      *
//      * @type {Object}
//      */
//     var modeToDimensionsMap = {
//         horizontal: ['width', 'x'],
//         vertical: ['height', 'y'],
//     };

//     // Get slider size by active mode.
//     this.size = modeToDimensionsMap[this.options.mode][0];

//     // Get slider axis by active mode.
//     this.axis = modeToDimensionsMap[this.options.mode][1];

//     // Get slider items length.
//     this.length = this.slides.length;

//     // Get slider configured paddings.
//     this.paddings = this.getPaddings();

//     // Set slider size.
//     this[this.size] = this.getSize();
// };


// /**
//  * Normalize paddings option value. Parsing
//  * strings procents, pixels and numbers.
//  *
//  * @return {string} Normalized value
//  */
// Glide.prototype.getPaddings = function() {

//     var option = this.options.paddings;

//     // If we have a string, we need
//     // to parse it to real number.
//     if (typeof option === 'string') {

//         // Parse string to int.
//         var normalized = parseInt(option, 10);

//         // Check if string is procentage number.
//         var isPercentage = option.indexOf('%') >= 0;

//         // If paddings value is procentage. Calculate
//         // real number value from slider element.
//         if (isPercentage) {
//             return parseInt(this.slider[this.size]() * (normalized / 100));
//         }

//         // Value is number as string, so
//         // just return normalized.
//         return normalized;
//     }

//     // Value is number, we don't need
//     // to do anything, return.
//     return option;

// };


// /**
//  * Get slider size width updated
//  * by addtional paddings.
//  *
//  * @return {number}
//  */
// Glide.prototype.getSize = function() {
//     return this.slider[this.size]() - (this.paddings * 2);
// };
