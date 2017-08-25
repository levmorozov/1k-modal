/*!
    https://github.com/levmorozov/jquery-m1k
*/
(function($){
    "use strict";

    var d = document,
        h = $(d.documentElement),
        modals = [],
        root;

    function getCurrent() {
        return modals.length ? modals[modals.length - 1] : null;
    }

    $.m1k = function(element, config) {

        var e = $(element);
        $.extend(this,
            $.fn.m1k.defaults,
            config,
            e.data(), {
                el: e
            }
        );

        var that = this;

        var t = '<div class=": :-hide"><div class=":-content">';

        if(that.close) {
            t += '<div class=":-close" aria-label="Close">' + that.close + '</div>'
        }

        t +=  '</div></div>';

        that.b = $(t.replace(/:/g,that.id)).clone();

        if (that.single)
            while (getCurrent())
                getCurrent()._c(); // Close any open modals.

        if(root === undefined) { // Add root element to page only once
            root = $('<div class="'+that.id+'-root"></div>');
            $('body').append(root);
        }

        modals.push(that);

        h.addClass('with-' + that.id); // add class to html to disable scrollbars

        // Remember focus:
        that._pa = d.activeElement;

        if (that._pa.blur) {
            that._pa.blur();
        }

        that.el.show();

        that.b
            .find('.'+that.id+'-content')
            .append(that.el);
        that.b
            .removeClass(that.id+'-hide')
            .on('click.'+that.id, function(event) {
                var $target = $(event.target);
                if(that.clickClose  && $target.is('.'+that.id)) {
                    that._c();
                    //  event.preventDefault();
                }
            })
            .find('.'+that.id+'-close').click(function() {
            that._c();return false;
        });
        root.append(that.b);

        $(d).off('keydown.'+that.id).on('keydown.'+that.id, function(event) {
            var current = getCurrent();
            if (event.which === 27 && current.escClose) current._c();
        });

        that.el.trigger(that.id + ':open');
    };

    $.m1k.prototype = {
        constructor: $.m1k,
        id : 'm1k',
        single: true,
        escClose: true, // Close on esc
        clickClose: true, // Close on click
        close: 'x', // Close button added to popup if only «close» is not null

        _c: function() { // Close popup
            modals.pop();

            var that = this;

            that.el.hide().appendTo($('body'));
            that.b.remove();
            that.b = null;

            // Restore focus
            that._pa.focus();
            // Restore scroll
            if(!getCurrent()) {
                h.removeClass('with-' + that.id);
                $(d).off('keydown.'+that.id)
            }
            that.el.trigger(that.id + ':close');
        }

    };


    /**
     * Public static functions
     */

    $.m1k.close =  function() {
        var current = getCurrent();
        if (current)
            current._c();
    }


    $.fn.m1k = function(options){

        if (this.length === 1) {
            new $.m1k(this, options);
        }

        return this;
    };


})(jQuery)