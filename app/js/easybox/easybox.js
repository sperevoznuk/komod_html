'use strict'

var easybox = {
    default: {
        content: '',
        href: '',
    },
    open: function (data) {
        if (typeof (data) == 'string') {
            data = {
                content: data,
            }
        }

        data = Object.assign(this.default, data);

        if (data.href.substr(0, 1) == '#') {
            var element = document.getElementById(data.href.substr(1))
            if (element == null) {
                console.log(data.href + ' not found');
                return false;
            }
            data.content = element.innerHTML;
        }

        var box = document.createElement('div'),
            content = document.createElement('div'),
            close = document.createElement('div'),
            inner = document.createElement('div');

        content.className = 'easy-content';
        close.className = 'easy-close';
        box.className = 'easy-overlay';
        inner.className = 'easy-inner';
        inner.innerHTML = data.content;


        content.appendChild(inner);
        content.appendChild(close);
        box.appendChild(content);

        var body = document.getElementsByTagName('body');
        document.body.appendChild(box);

        close.addEventListener('click', this.close);

    },
    close: function (obj) {
        console.log(obj.target.parentNode.parentNode);
        obj.target.parentNode.parentNode.remove();
    }
}

// easybox.open({
//     href: '#call'
// })

// easybox.open('text')