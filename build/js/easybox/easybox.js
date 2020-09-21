'use strict'

var easybox = {
    template: {
        outer: '<div class="easy-overlay"><div class="easy-content"></div><div class="easy-<div class="easy-content"></div>"></div></div>',
    },
    open: function (data) {
        if (typeof (data) == 'string') {
            data = {
                content: data,
            }
        }
        
       if (data.url.substr(0, 1) == '#') {
           var element = document.getElementById()
       }

        var box = document.createElement('div'),
            content = document.createElement('div'),
            close = document.createElement('div'),
            inner = document.createElement('div');

        content.className = 'easy-content';
        close.className = 'close';
        box.className = 'easy-overlay';
        inner.className = 'easy-inner';
        inner.innerHTML = data.content;


        content.appendChild(inner);
        content.appendChild(close);
        box.appendChild(content);

        var body = document.getElementsByTagName('body');
        document.body.appendChild(box);

    }
}


easybox.open('text')