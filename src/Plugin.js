/**
 * Wire Glide to the jQuery.
 *
 * @param  {object} options
 * @return {object}
 */

$.fn.glide = function(options) {

    return this.each(function() {
        if (!$.data(this, 'glide_api')) {
            $.data(this, 'glide_api',
                new Glide($(this), options)
            );
        }
    });

};
