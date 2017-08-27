import DOM from './components/dom'
import Core from './components/core'
import Build from './components/build'
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
    Build.init()

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
