window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.carousel');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        // arrow_l.style.display = 'block';
        // arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        // arrow_l.style.display = 'none';
        // arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 3000);
    });
    var ul = focus.querySelector(' ul');
    var ol = focus.querySelector('.circle');
    console.log(ol);
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        console.log(li);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function () {
        arrow_r.click();
    }, 3000);

    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  ??????????????? callback()

        // ?????????????????????????????????????????????????????????????????????
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // ?????????????????????????????????
            // ?????????????????????????????? ???????????????????????????
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // ???????????? ????????????????????????
                clearInterval(obj.timer);
                // ???????????????????????????????????????
                // if (callback) {
                //     // ????????????
                //     callback();
                // }
                callback && callback();
            }
            // ????????????1 ?????????????????????????????????????????????  ???????????????(????????? - ???????????????) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }

})


