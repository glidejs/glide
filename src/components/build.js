import Core from './core'
import Nodes from './nodes'

import siblings from '../utils/siblings'
import prefixer from '../utils/prefixer'

class Build {
  init() {
    this.typeClass()
    this.modeClass()
    this.activeClass()
  }

  typeClass() {
    Nodes.element.classList.add(prefixer(Core.settings.type))
  }

  modeClass() {
    Nodes.element.classList.add(prefixer(Core.settings.mode))
  }

  activeClass() {
    let el = Nodes.slides[Core.index]

    el.classList.add(prefixer(Core.settings.classes.active))

    siblings(el).forEach((sibling) => {
      sibling.classList.remove(prefixer(Core.settings.classes.active))
    })
  }
}

export default new Build()

// /**
//  * Build module.
//  *
//  * @param {[type]} Glide
//  * @param {[type]} Core
//  * @return {Build}
//  */
// var Build = function(Glide, Core) {

//     // Build constructor.
//     function Build() {
//         this.init();
//     }

//     /**
//      * Init slider builder.
//      *
//      * @return {Void}
//      */
//     Build.prototype.init = function() {
//         // Build proper slider type
//         this[Glide.options.type]();

//         // Set slide active class
//         this.active();

//         // Set slides height
//         Core.Height.set();
//     };

//     /**
//      * Check slider type.
//      *
//      * @param  {String} name
//      * @return {Boolean}
//      */
//     Build.prototype.isType = function(name) {
//         return Glide.options.type === name;
//     };

//     /**
//      * Check slider mode.
//      *
//      * @param  {String} name
//      * @return {Boolean}
//      */
//     Build.prototype.isMode = function(name) {
//         return Glide.options.mode === name;
//     };

//     /**
//      * Build slider type.
//      *
//      * @return {Void}
//      */
//     Build.prototype.slider = function() {

//         // Turn on jumping flag.
//         Core.Transition.jumping = true;

//         // Apply slides width.
//         Glide.slides[Glide.size](Glide[Glide.size]);

//         // Apply translate.
//         Glide.track.css(Glide.size, Glide[Glide.size] * Glide.length);

//         // If mode is vertical apply height.
//         if (this.isMode('vertical')) {
//             Core.Height.set(true);
//         }

//         // Go to startup position.
//         Core.Animation.make();

//         // Turn off jumping flag.
//         Core.Transition.jumping = false;

//     };

//     /**
//      * Build carousel type.
//      *
//      * @return {Void}
//      */
//     Build.prototype.carousel = function() {

//         // Turn on jumping flag.
//         Core.Transition.jumping = true;

//         // Update shift for carusel type.
//         Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length / 2) - Glide[Glide.size];

//         // Apply slides width.
//         Glide.slides[Glide.size](Glide[Glide.size]);

//         // Apply translate.
//         Glide.track.css(Glide.size, (Glide[Glide.size] * Glide.length) + Core.Clones.getGrowth());

//         // If mode is vertical apply height.
//         if (this.isMode('vertical')) {
//             Core.Height.set(true);
//         }

//         // Go to startup position.
//         Core.Animation.make();

//         // Append clones.
//         Core.Clones.append();

//         // Turn off jumping flag.
//         Core.Transition.jumping = false;

//     };

//     /**
//      * Build slideshow type.
//      *
//      * @return {Void}
//      */
//     Build.prototype.slideshow = function() {

//         // Turn on jumping flag
//         Core.Transition.jumping = true;

//         // Go to startup position
//         Core.Animation.make();

//         // Turn off jumping flag
//         Core.Transition.jumping = false;

//     };

//     /**
//      * Set active class to current slide.
//      *
//      * @return {Void}
//      */
//     Build.prototype.active = function() {

//         Glide.slides
//             .eq(Glide.current - 1).addClass(Glide.options.classes.active)
//             .siblings().removeClass(Glide.options.classes.active);

//     };

//     // Return class.
//     return new Build();

// };
