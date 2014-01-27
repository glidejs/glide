// Type definitions for Glide.js v1.0.5
// Project: http://jedrzejchalubek.com/glide/
// Sources: https://github.com/jedrzejchalubek/Glide.js
// Definitions by: Milan Jaros
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface GlideOptions {
    // Default: 4000 
    // {Int or Bool} False for turning off autoplay
    autoplay?: any;
    // Default: true {Bool} Pause autoplay on mouseover slider
    hoverpause?: boolean;

    /**
     * Default: 500  
     * Animation time 
     * !!! IMPORTANT !!!
     * That option will be use only, when css3 are not suported
     * If css3 are supported animation time is set in css declaration inside .css file
     * @type {Int}
     */
    animationTime?: number;

    /**
     * Default: true 
     * {Bool or String} Show/hide/appendTo arrows
     * True for append arrows to slider wrapper
     * False for not appending arrows
     * Id or class name (e.g. '.class-name') for appending to specific HTML markup
     */
    arrows?: any;
    // Default: 'slider-arrows'
    // {String} Arrows wrapper class
    arrowsWrapperClass?: string;
    // Default: 'slider-arrow'
    // {String} Main class for both arrows
    arrowMainClass?: string;
    // Default: 'slider-arrow--right'
    // {String} Right arrow
    arrowRightClass?: string;
    // Default: 'next'
    // {String} Right arrow text
    arrowRightText?: string;
    // Default: 'slider-arrow--left'
    // {String} Left arrow
    arrowLeftClass?: string;
    // Default: 'prev'
    // {String} Left arrow text
    arrowLeftText?: string;

    /**
     * Default: true
     * {Bool or String} Show/hide/appendTo bullets navigation
     * True for append arrows to slider wrapper
     * False for not appending arrows
     * Id or class name (e.g. '.class-name') for appending to specific HTML markup
     */
    nav?: any;
    // Default: true
    // {Bool} Center bullet navigation
    navCenter?: boolean;
    // Default: 'slider-nav'
    // {String} Navigation class
    navClass?: string;
    // Default: 'slider-nav__item'
    // {String} Navigation item class
    navItemClass?: string;
    // Default: 'slider-nav__item--current'
    // {String} Current navigation item class
    navCurrentItemClass?: string;

    // Default: true
    // {Bool} Slide on left / right keyboard arrows press
    keyboard?: boolean;

    // Default: 60
    // {Int or Bool} Touch settings
    touchDistance?: any;

    // Default: function () {}
    // {Function} Callback before plugin init
    beforeInit?: Function;
    // Default: function () {}
    // {Function} Callback after plugin init
    afterInit?: Function;

    // Default: function () {}
    // {Function} Callback before slide change
    beforeTransition?: Function;
    // Default: function() {}
    // {Function} Callback after slide change
    afterTransition?: Function;
}

interface JQuery {
    glide(options?: GlideOptions): JQuery;
}
