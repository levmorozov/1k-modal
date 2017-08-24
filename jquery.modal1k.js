//https://github.com/kylefox/jquery-modal/blob/master/jquery.modal.js
//https://github.com/vodkabears/Remodal/blob/master/src/remodal.js
//    https://raw.githubusercontent.com/eustasy/jQuery.leanModal2/master/jQuery.leanModal2.js


(function($){
    "use strict";

    var h = $(document.documentElement),
        d = document,
        modals = [],
        root;

    function getCurrent() {
        return modals.length ? modals[modals.length - 1] : null;
    }

    $.m1k = function(el, config) {

        $.extend(this,
            $.fn.m1k.defaults,
            config,
            $(el).data()
        );

        this.init(el, config);
    };

    $.m1k.prototype = {
        constructor: $.m1k,
        id : 'm1k',
        single: true,
        escClose: true, // Close on esc
        clickClose: true, // Close on click
        close: 'x', // Close button added to popup if only «close» is not null

        init: function(el, config){

            var that = this;

            var t = '<div class="% %-hide"><div class="%-content">';

            if(that.close) {
                t += '<div class="%-close" aria-label="Close">' + that.close + '</div>'
            }

            t +=  '</div></div>';

            if(root === undefined) {
                root = $('<div class="'+that.id+'-root"></div>');
                $('body').append(root);
            }


            that.box = $(t.replace(/%/g,that.id)).clone();

            if (that.single)
                while (getCurrent() !== null)
                    getCurrent().close(); // Close any open modals.

            modals.push(that);

            that.el = $(el);

            that.box
                .find('.'+that.id+'-content')
                .append(that.el)

            root.append(that.box);

            h.addClass('with-' + that.id);

            // Remember focus:
            that._pa = d.activeElement;

            if (that._pa.blur) {
                that._pa.blur();
            }

            that.el.show();

            that.box.removeClass(that.id+'-hide');

            that.el.trigger(that.id + ':after-open', [that, that.el]);

            that.box.on('click.'+that.id, function(event) {
                var $target = $(event.target);
                if( (that.clickClose  && $target.is('.'+that.id))
                    || $target.closest(that.id + '-close').length ) {
                    that._close(event);
                    event.preventDefault();
                }
            });

            that.box.find('.'+that.id+'-close').click(function() {
                getCurrent()._close();return false;
            });

            $(d).off('keydown.'+that.id).on('keydown.'+that.id, function(event) {
                var current = getCurrent();
                if (event.which === 27 && current.escClose) current._close();
            });

            return that;
        },

        _close: function() {
            modals.pop();

            var that = this;

            that.el.hide().appendTo($('body'));
            that.box.remove();
            that.box = null;

            // Restore focus
            that._pa.focus();
            // Restore scroll
            if(getCurrent() === null) {
                h.removeClass('with-' + that.id);
            }
            that.el.trigger(that.id + ':after-close', that);
        }

    };


    /**
     * Public static functions
     */

    $.m1k.close =  function(event) {
        var current = getCurrent();
        if (current === null) return;

        if (event) event.preventDefault();
        current._close();
        return current.el;
    }


    $.fn.m1k = function(options){

        if (this.length === 1) {
            new $.m1k(this, options);
        }

        return this;
    };


})(jQuery)