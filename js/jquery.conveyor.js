/**
 * Conveyor Belt v0.0.2 - A simple (brain-dead) horizontal slider
 *
 * Copyright 2014, Marc Aubé - https://github.com/marcaube - http://marcaube.ca
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
;(function($) {

    $.fn.conveyor = function(options) {

        if (this.length === 0)
        {
            return this;
        }

        // Support multiple conveyors
        if (this.length > 1) {
            this.each(function(){$(this).conveyor();});

            return this;
        }

        /**
         * Options/Settings, loads of 'em right?
         */
        var defaults = {
                direction: "horizontal",
                delay: 1000,
                onScroll: function(){}
            },
            settings = $.extend({}, defaults, options);

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

            if (index < 0 || currentThumb === index) {
                return;
            }

            currentThumb = index;

            if (settings.direction === 'vertical') {
                verticalScroll(index);
            } else {
                horizontalScroll(index);
            }

            settings.onScroll();
        };

        var horizontalScroll = function(index) {
            // Calc the offset of the image in relation to the wrapper
            var img     = el.children().eq(index).find('img'),
                padding = parseInt(img.css('paddingLeft')),
                offset  = img.offset().left - el.offset().left - padding;

            wrapper.animate({
                scrollLeft: offset
            }, settings.delay);
        };

        var verticalScroll = function(index) {
            // Calc the offset of the image in relation to the wrapper
            var item    = el.children().eq(index),
                padding = parseInt(item.css('paddingTop')),
                offset  = item.offset().top - el.offset().top - padding;

            wrapper.animate({
                scrollTop: offset
            }, settings.delay);
        };


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
        };

        /**
         * Returns the current index
         */
        el.index = function() {
            return currentThumb;
        };

        /**
         * Returns the number of thumbnails
         */
        el.length = function() {
            return thumbCount;
        };

        /**
         * Scroll to the next item
         */
        el.next = function() {
            scrollTo(currentThumb + 1);

            return el;
        };

        /**
         * Scroll to the previous item
         */
        el.previous = function() {
            scrollTo(currentThumb - 1);

            return el;
        };

        /**
         * Go back to the beginning
         */
        el.restart = function() {
            scrollTo(0);

            return el;
        };

        return this;
    };

}( jQuery ));