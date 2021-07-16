/**
 *  autoPlay
 *  point
 *  width 
 *  height
 */

function creatSwiper(config) {
    var swiper = new Swiper(config);
    swiper.render().initStyle().controlMouseLeave().isPointActive(0);
    if(config.autoplay){
        swiper.autoplay();
    }
    

    return swiper
}

/**
 * 轮播图构造函数
 * @param {Object} config 
 */
function Swiper(config) {
    var defaultConfig = {
        container: '.swiper',                               // 表示轮播图渲染的容器,规定是 选择器
        autoplay: false,                                    // 表示是否自动播放 true 是 fasle 否
        point: false,                                       // point 表示是否给轮播图添加小圆点
        data: [],                                           // data 表示轮播图中渲染图片的个数
        width:'100%',                                       //  设置轮播宽度
        height:'100%',                                      // 设置轮播图高度
        duration:1000,                                      // 设置自动轮播的事件间隔。每隔多长时间切换下一张图片
        animateTime:1000,                                   // 动画执行时间
    }
    // config = config === undefined ? defaultConfig: {
    //     ...defaultConfig,
    //     ...config,
    // }

    // 保留默认配置项
    for(let x  in defaultConfig){
        config[x] = config[x]?config[x]:defaultConfig[x]
    }
   
    console.log(config);

    // default 表示 默认配置
    this.default = config;
    // this.NODE_DOME = {};                                    // 存放所有的dom元素

    this.marginLeft = 0;                // 表示轮播的位置
    this.index = 0;                     // 表示当前展示的第几个图片
    this.timer = null;
    this.isActive = true;               // 控制动画函数的开关 ,true 动画执行完毕,可以执行  false 动画执行中 禁止再次执行
}
// 渲染dom 的函数
Swiper.prototype.render = function () {
    var swiper = document.querySelector(this.default.container)
    var contain = document.createElement('div');
    contain.className = 'contain';
    contain.addEventListener('mouseover',this.controlMoiseOver.bind(this));
    contain.addEventListener('mouseleave',this.controlMouseLeave.bind(this));

    swiper.appendChild(contain);

    // this.NODE_DOME.swiper = swiper;
    // this.NODE_DOME.contain = contain;

    for (var i = 0; i < 3; i++) {
        var div = document.createElement('div');
        if (i === 0) {
            div.className = 'view';
            // this.NODE_DOME.view = div;
            // swiper-item 的个数应该根据数组长度来渲染
            for (var j = 0; j < this.default.data.length + 1; j++) {
                let swiperItem = document.createElement('div');                    // 创建swiper-item标签
                swiperItem.className = 'swiper-item';                              // 添加 swiper-item 类名
                let img = document.createElement('img');                           // 创建img 标签 
                img.src = this.default.data[j];                                    // 给图片添加图片路径
                if (j === this.default.data.length) {
                    // 当 img 为最后一个img src应该为第一张图片
                    img.src = this.default.data[0]
                }
                img.alt = '';                                                      // 添加alt 属性
                swiperItem.appendChild(img);                                        // 将img添加添加到 swuper-item种种中
                div.appendChild(swiperItem);                                        // 将swiper 添加到 .view上
            }
        } else if (i === 1) {
            div.className = 'point';
            // 渲染小点. 
            for (let i = 0; i < this.default.data.length; i++) {
                let span = document.createElement('span');
                span.className = 'point-item';
                div.appendChild(span);

            }
        } else {
            div.className = 'control';
            var prevent = document.createElement('div');
            prevent.className = 'prevent';
            prevent.innerHTML = '<';

            prevent.addEventListener('click', this.prenvetSwiperIten.bind(this));              // 给上一个绑定迪纳基事件

            var next = document.createElement('div');
            next.className = 'next';

            next.addEventListener('click', this.nextSwiperItem.bind(this));

            next.innerHTML = '>';
            div.appendChild(prevent);
            div.appendChild(next);
        }
        contain.appendChild(div);
    }

    return this

}

// 初始化设置样式的函数
Swiper.prototype.initStyle = function (dom, style) {
    console.log('init style');
    // 先看bug 在问自己 为什么这么改？
    // ${this.default.container 是什么？ 为什么要在所有的 选择器前面都加他？
    var contain = document.querySelector(`${this.default.container}>.contain`)
    this.cssStyle(contain, {
        width:this.default.width,
        height:this.default.height,
        // width: '100%',
        // height: '100%',
        // minHeight:'100px',
        overflow: 'hidden',
        position: 'relative',
    })

    var view = document.querySelector(`${this.default.container}>.contain>.view`);
    this.cssStyle(view, {
        width: '400%',
        height: '100%',
    })

    var swiperItem = document.querySelectorAll(`${this.default.container}>.contain .swiper-item`);
    var img = document.querySelectorAll(`${this.default.container} .swiper-item>img`);

    for (let i = 0; i < swiperItem.length; i++) {
        this.cssStyle(swiperItem[i], {
            width: '25%',
            height: '100%',
            float: 'left',
        })

        this.cssStyle(img[i], {
            width: '100%',
            height: '100%',
        })

    }

    var control = document.querySelector(`${this.default.container}>.contain .control`);
    var controlWidth = parseFloat(this.default.height) / 6 + 'px';

    this.cssStyle(control, {
        width: "100%",
        maxHeight: '120px',
        height: controlWidth,
        position: 'absolute',
        top: '50%',
        transform: `translate(0,-50%)`,
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 10px",
    })

    var prent = document.querySelector(`${this.default.container}>.contain .control .prevent`);
    this.cssStyle(prent, {
        maxWidth: ' 120px',
        maxHeight: ' 120px',
        width: controlWidth,
        height: controlWidth,
        minWidth:'25px',
        minHeight:"25px",
        borderRadius: ' 50%',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: controlWidth,
    })
    var next = document.querySelector(`${this.default.container} .control .next`);
    this.cssStyle(next, {
        maxWidth: ' 120px',
        maxHeight: ' 120px',
        width: controlWidth,
        height: controlWidth,
        minWidth:'25px',
        minHeight:"25px",
        borderRadius: ' 50%',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: controlWidth,
        
    })

    var point = document.querySelector(`${this.default.container} .point`);
    var spanWidth = parseFloat(this.default.height) /15;

    this.cssStyle(point, {
        width: '100%',
        // height: '50px',
        height: spanWidth+'px',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '10px',
    })

    var pointItem = document.querySelectorAll(`${this.default.container} .point>span`);

    for (let i = 0; i < pointItem.length; i++) {
        this.cssStyle(pointItem[i], {
            maxWidth: '30px',
            maxHeight: '30px',

            width: spanWidth +'px',
            height: spanWidth + 'px',
            
            minWidth: '5px',
            minHeight: '5px',
            
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0,0.3)',
            margin: `0px ${spanWidth/5 + 'px'}`,
            minMargin:'1px',
            maxMargin:'5px'
            
        })
    }

    return this
}
Swiper.prototype.cssStyle = function (dom, obj) {

    if (obj.constructor === Object) {
        for (let k in obj) {
            dom.style[k] = obj[k]
        }
    }

    return this

}



// 轮播自动播放函数
Swiper.prototype.autoplay = function () {
    setInterval(() => {
        this.nextSwiperItem();
        // 变为动画设置 自动轮播的时间间隔
    }, this.default.duration+this.default.animateTime);

}


Swiper.prototype.prenvetSwiperIten = function () {
    var view = document.querySelector(`${this.default.container} .view`);
    var swiperItem = document.querySelector(`${this.default.container} .view>.swiper-item`);
    this.index--;
    if (this.index < 0) {
        this.index = this.default.data.length - 1;
    }
    sucessLog('this index', this.index)

    this.marginLeft = parseFloat(getComputedStyle(swiperItem, null)['width']) * this.index;
    this.$animate(view, { marginLeft: -this.marginLeft + 'px' }, this.default.animateTime, function () {
        console.log('结束了');
    })
}

// 实现下一张
Swiper.prototype.nextSwiperItem = function () {
    console.log('\n%c 监听事件函数是否执行 ↓  ', 'background:#fcc307;color:#fff;padding:1px;border-radius:3px');
    // if (!this.isActive) return
    // 获取 view  轮播 让view 移动 
    var view = document.querySelector(`${this.default.container} .view`);
    // view 移动的位移 = 当前显示第几个图片 * 图片容器的宽度
    var swiperItem = document.querySelector(`${this.default.container} .view>.swiper-item`);
    this.index++;
    // 0 1 2 3
    // 0 1 2 
    //  3 有动画 结束 0 \
    console.log(this.index);

    if (this.index >= this.default.data.length) {
        // 我希望，最后一张图片 动画执行，执行性结束后，闪现到第一种

        this.marginLeft = parseFloat(getComputedStyle(swiperItem, null)['width']) * this.index;
        this.$animate(view, { marginLeft: -this.marginLeft + 'px' }, this.default.animateTime, function () {
            view.style.marginLeft = 0;
            // 注意：this.index 写在回调函数内部 与外部区别
            // this.index = 0;

        }.bind(this))

        this.index = 0;

    } else {
        this.marginLeft = parseFloat(getComputedStyle(swiperItem, null)['width']) * this.index;

        // 让view 动起来
        // view.style.marginLeft = -this.marginLeft + 'px';\
        this.$animate(view, { marginLeft: -this.marginLeft + 'px' }, this.default.animateTime, function () {
            console.log('结束了');
            // 默认 this === window  
            //  bind 方式更改this
            // 动画执行结束，意味着可以执行下一个动画了
            // this.isActive = true;
            // console.log(this);
         

        }.bind(this))
    }

    this.isPointActive(this.index)



}

// 渲染小圆点函数
Swiper.prototype.renderPoint = function () {

}

// 小圆点功能

Swiper.prototype.point = function () {

}


Swiper.prototype.$animate = function (dom, css, time, callback) {
    // 如果isActive 为false,禁止动画执行
    if (!this.isActive) return

    this.isActive = false;
    // 1: 获取dom中 css 属性的起始值
    // 起始值 100px  opcatiy 0 1 
    console.log('dfasfafd');
    for (let i in css) {
        var start = parseFloat(getComputedStyle(dom, null)[i]);
        // 2: 获取dom的 css 属性的结束值
        var end = parseFloat(css[i])
        // 3: 求过度差值
        var changeValue = end - start;
        (function (start, end, changeValue) {
            // 4: 从 0 在time内容 changeValue 
            var timer = setInterval(() => {
                start += changeValue / (time / 5)
                // 1: end > start  时候
                if (changeValue > 0) {
                    dom.style[i] = start + 'px';
                    if (start >= end) {
                        dom.style[i] = end + 'px';
                        clearInterval(timer);
                    }
                } else {
                    // end<start
                    dom.style[i] = start + 'px';
                    if (start <= end) {
                        dom.style[i] = end + 'px';
                        clearInterval(timer);                 // 动画执行结束
                    }
                }

            }, 5)
        })(start, end, changeValue)

    }
    // 2: optatay 不需要加 单位

    var tiemrOut = setTimeout(() => {
        clearTimeout(tiemrOut);
        typeof callback === 'function' ? callback() : callback;

        // 动画执行结束,允许下一个动画执行
        this.isActive = true;
    }, time)

}


/**
 * 控制control的显示隐藏
 */

Swiper.prototype.controlMoiseOver = function(){
    // errorLog('this',this)
    var control = document.querySelector(`${this.default.container} .control`);
    // console.log(control);
    control.style.opacity = 1;
    return this
}

Swiper.prototype.controlMouseLeave = function(){
    // errorLog('this',this)

    var control = document.querySelector(`${this.default.container} .control`);

    control.style.opacity = 0;

   return this
}

/**
 * 
 * @param {Number} index 
 * 表示 圆点选中的样式
 * 用形参index 表示当前显示的是第几个图片
 * 问题：在哪里执行函数？ 在哪里可以知道当前显示是第几个图片那么就在哪里执行
 */
Swiper.prototype.isPointActive = function(index){
    // 1 获取所有的雄小圆点
    var pointItem = document.querySelectorAll(`${this.default.container} .point>span`);
    // 清空默认样式
    for(var i  = 0 ;i<pointItem.length;i++){
        pointItem[i].style.backgroundColor = 'rgba(0, 0, 0,0.3)';
    }

    // 根据当前显示的第几个图片，给对应小圆点添加样式
    pointItem[index].style.backgroundColor = '#fff';

}