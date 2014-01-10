/**
 * Conveyor Belt v0.0.1 - A simple (brain-dead) horizontal slider
 *
 * Copyright 2014, Marc Aubé - https://github.com/marcaube - http://marcaube.ca
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
;(function($) {

    $.fn.conveyor = function() {

        if (this.length == 0) return this;

        // Support multiple conveyors
        if (this.length > 1) {
            this.each(function() {$(this).conveyor()});

            return this;
        }

        /**
         * Init vars
         */
        var el = this,
            wrapper      = el.parent(),
            currentThumb = 0,
            wrapperWidth = wrapper.innerWidth(),
            thumbWidth   = el.children().eq(0).outerWidth(true),
            thumbCount   = el.children().length,
            maxThumbs    = Math.round(wrapperWidth / thumbWidth),
            lastIndex    = thumbCount - maxThumbs;

        /**
         * Make it scroll
         */
        var scrollTo = function(index) {
            if (index > lastIndex) {
                index = lastIndex;
            }

            if (index < 0 || currentThumb == index) {
                return;
            }

            currentThumb = index;

            // Calc the offset of the image in relation to the wrapper
            var img     = el.children().eq(index).find('img'),
                padding = parseInt(img.css('paddingLeft')),
                offset  = img.offset().left - el.offset().left - padding;

            wrapper.animate({
                scrollLeft: offset
            }, 1000);
        }


        /**
         * Assign on click events
         */
        el.children().find('img').click(function() {
            scrollTo($(this).parent().index());
        })


        /**
         * Public functions
         * -------------------------------------------------------------------------------------------------------------
         */

        /**
         * Scroll to thumbnail
         */
        el.scrollTo = function(index) {
            scrollTo(index);

            return el;
        }

        /**
         * Returns the current index
         */
        el.index = function() {
            return currentThumb;
        }

        /**
         * Returns the number of thumbnails
         */
        el.length = function() {
            return thumbCount;
        }


        // Return the current jQuery object
        return this;
    }

}(jQuery));