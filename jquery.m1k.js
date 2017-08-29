(function($){

    var d = document,
        h = $(d.documentElement),
        modals = [],
        root;

    function getCurrent() {
        return modals.length ? modals[modals.length - 1] : null;
    }

    $.m1k = function(obj, config) {
        var that = $.extend(this,
            {
                id :'m1k',
                single: false,
                class: 'm1k-pop',
                esc: true,
                click: true,
                close: '×',
            },
            $.fn.m1k.defaults,
            config,
            obj.data()
        ),
            id = that.id,
            oldFocus,
            box,
            element = obj;

        box = $(
            '<div class="'+id+' '+id+'-hide"><div class="'+id+'-content '+that.class+'">' +
            (that.close ? '<div class="'+id+'-close" aria-label="Close">' + that.close + '</div>' : '') +
            '</div></div>'
        ).clone();

        if (that.single)
            while (getCurrent())
                getCurrent().c(); // Close any open modals.

        if(root === undefined) { // Add root element to page only once
            root = $('<div class="'+id+'-root"></div>');
            $('body').append(root);
        }

        modals.push(that);

        h.addClass('w-' + id); // add class to html to disable scrollbars

        // Remember focus:
        oldFocus = d.activeElement;

        if (oldFocus.blur) {
            oldFocus.blur();
        }

        element.show();

        box
            .find('.'+id+'-content')
            .append(element);
        box
            .removeClass(id+'-hide')
            .on('click.'+id, function(event) {
                var $target = $(event.target);
                if(that.click  && $target.is('.'+id)) {
                    that.c();
                    //  event.preventDefault();
                }
            })
            .find('.'+id+'-close').click(function() {
                that.c();return false;
            });
        root.append(box);

        $(d).off('keydown.'+id).on('keydown.'+id, function(event) {
            if (event.which === 27 && getCurrent().esc) getCurrent().c();
        });

        element.trigger(id + ':open');

        that.c = function() {
            modals.pop();

            element.hide().appendTo($('body'));
            box.remove();
            box = null;

            // Restore focus
            if(oldFocus) oldFocus.focus();
            // Restore scroll
            if(!getCurrent()) {
                h.removeClass('w-' + id);
                $(d).off('keydown.'+id)
            }
            element.trigger(id + ':close');
        }
    };

    $.m1k.close = function() {
        if (getCurrent())
            getCurrent().c();
    }


    $.fn.m1k = function(options){

        if (this.length === 1) {
            new $.m1k($(this), options);
        }

        return this;
    };


})(jQuery)