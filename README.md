modal-1k
============

Super tiny jquery plugin for modal windows. JS size 1163 bytes minified, 643 bytes gziped.


Main Ideas
----------
* No images, iframes, etc. Only html content
* Real modal window (no scrolling!)
* CSS should be outside code
* No build-in ajax functionality, but easy to use with ajax
* No animation (it's just a popups, not a fkng circus)
* ~1kb of gziped JS+CSS are enough for modal window plugin
* No automate binding. It's may be done by 1 line of code if needed
* There may be more than one modal window. Supports nested windows.
* Supports any browsers whitch jquery (1.7+) supports

Examples
----------

**Simple default way:**

```html
<a href="#" id="some-link">Open popup</a>

<div id="popup" style="display:none">
    Window contents
</div>

```

```javascript
$(function() {
    $('#some-link').click(function() {
        $('#popup').m1k();
        return false;
    }); 
});

```

**Or you can bind to any links with data attribute:**
```javascript
$('[data=target').click(function() {        
    $($(this).data('target')).m1k();
    return false;
}); 
```

so you can do this:
```html
<a href="#" data-target="#popup">Open popup</a>

```

**Or you can load any content:**
```javascript
$('<h1>Hello</h1>').m1k();

```

It's usefull for ajax:
```javascript

$.get('/some/url', function(result) {   
    $(result).m1k();   
})

```

Options
--------

List of options with default values:
```
{
    id : 'm1k',       // It's a namespace. Append to every css class name
    single: false,    // Close other modal windows when open new window
    esc: true,        // Close window on esc
    click: true,      // Close window on click in back
    close: 'x'        // Close button contents. Can be null|undefined
}
```


There 3 ways to pass options: 
- defaults: ```$.m1k.default```
- direct: ```m1k({options})```
- data attributes: ```<div class='popup' data-esc='false'>```

API
----------

```$.m1k.close()``` — close current window
