'use strict'

var easybox = {
    class: {
        overlay: 'easy-overlay',
        blocked: 'easy-blocked',
    },
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
            data.content = element.outerHTML;
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

        close.addEventListener('click', (event) => {
            event.target.parentNode.parentNode.remove();
            this.unBlockPage();
        });
        box.addEventListener('click', (event) => {
            if (event.target.className == this.class.overlay) {
                event.target.remove();
            }
            this.unBlockPage();
        });
        this.blockPage();
    },
    close: function (obj) {

    },
    blockPage: function () {
        document.body.classList.add(this.class.blocked)
    },
    unBlockPage: function () {
        var body = document.getElementsByTagName('body');
        if (!document.getElementsByClassName(this.class.overlay).length) {
            document.body.classList.remove(this.class.blocked)
        }
    }
}

var elements = document.querySelectorAll('.easybox');

for (let index = 0; index < elements.length; index++) {
    elements[index].addEventListener('click', function () {
        easybox.open({ href: this.attributes['href'].value })
    })
}


// easybox.open({
//     href: '#call'
// })

// easybox.open('text')