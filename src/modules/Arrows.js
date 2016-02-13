/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Arrows}
 */

var Arrows = function(Glide, Core) {


    /**
     * Arrows Module Constructor
     */
    function Module() {
        this.build();
        this.bind();
    }


    /**
     * Build
     * arrows DOM
     */
    Module.prototype.build = function() {
        this.wrapper = Glide.slider.find('.' + Glide.options.classes.arrows);
        this.items = this.wrapper.children();
    };


    /**
     * Disable arrow
     */
    Module.prototype.disable = function(type) {
        var classes = Glide.options.classes;

        return this.items.filter('.' + classes['arrow' + Core.Helper.capitalise(type)])
            .unbind('click.glide touchstart.glide')
            .addClass(classes.disabled)
            .siblings()
            .bind('click.glide touchstart.glide', this.click)
            .removeClass(classes.disabled);
    };


    /**
     * Show arrows
     */
    Module.prototype.enable = function() {
        this.bind();
        return this.items.removeClass(Glide.options.classes.disabled);
    };

    /**
     * Click arrow method
     * @param  {Object} event
     */
    Module.prototype.click = function(event) {
        event.preventDefault();

        if (!Core.Events.disabled) {
            Core.Run.pause();
            Core.Run.make($(this).data('glide-dir'));
            Core.Animation.after(function() {
                Core.Run.play();
            });
        }
    };


    /**
     * Bind
     * arrows events
     */
    Module.prototype.bind = function() {
        return this.items.on('click.glide touchstart.glide', this.click);
    };


    /**
     * Unbind
     * arrows events
     */
    Module.prototype.unbind = function() {
        return this.items.off('click.glide touchstart.glide');
    };


    // @return Module
    return new Module();

};
