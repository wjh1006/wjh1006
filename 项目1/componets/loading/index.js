
// createLoading 怎么才能不被污染.????

var createLoading = (function () {
    var _this;         // 1 _this 为 new Loading 实例的对象   2: _this 不论 createLoading 执行多少此,都是彼此独立互补干扰的

    function createLoading(config) {
        var load = new Loading(config);
        load.render().css();
        // load.css();
        return load
    }
    // 问题: 变量是不是全局变量, 有没有可能会被污染
    // 解决: 闭包

    function Loading(config) {
        _this = this;
        var defaultConfig = {
            src:'../assets/images/loading.jpg',      // 表示loading 图片的路径
            mode:'white',                            // 表示模态框的模式 默认 白色 其他情况为黑色
        }
        this.default = !config ? defaultConfig : Object.assign({},defaultConfig,config);
        this.isActive = false;                  // 记录 loading 的显示隐藏. true 显示  false 隐藏
    }
    Loading.prototype.render = function(){
        var body = document.querySelector("body");

        // bug 
        // var bodyChild = body.innerHTML;
        // var html = `<div class="loading"></div>`;
        // body.innerHTML = bodyChild +html;
        // this.loading = document.querySelector('.loading');

        var div = document.createElement("div");
        div.className  = 'loading';
        body.appendChild(div);
        this.loading = div;
        return _this
    }
    // 这样想的
    // 1: 怎么让 css 函数在初始化执行. 函数中this 还是 new实例的对象
    // 2: 怎么用js方式代替原来的 css 代码

    // 2: 执行时候  this 为 new 实例对象
    Loading.prototype.css = function(){
        console.log('css init',this,_this);
        // JS 表示css的对象
        var style = {
            display: 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: `${this.default.mode==='white'?'#eee':'rgba(0,0,0,0.5)'} url(${this.default.src}) 50% no-repeat`,
            backgroundSize: `400px auto`,
            zIndex: '100',
            opacity: '0.95',
        }

        // 如何或者loading 标签
        // this.loading
        for(var x in style){
            this.loading.style[x] = style[x];
            // this.loading.style. we = style[x];
            // this.loading.style['x'] = style[x];
        }
    }

    // 1: 原型 api 中this ,一般情况下,都为 new 实例的对象
    //    只要 api 是由 new 实例对象触发的 VB 
    // 特里: 

    // 原则上: 我们希望  原型上的 api 都是new 实例的对象. 
    // 或者用 变量保存  this 为 new 实例的对象
    Loading.prototype.show = function () {
        // 1: 找到 loading 元素
        var dom =this.loading;
        // 2: 设置显示样式
        dom.style.display = 'block'
        _this.isActive = true;
        // return this
        return _this
    }


    Loading.prototype.hide = function(){
        // 1: 找到 loading 标签
        this.loading.style.display = 'none';
        _this.isActive = false;
        return _this   // 返回new 实例的对象
    }

    Loading.prototype.trigger = function(){
        if(_this.isActive){
            _this.loading.style.display = 'none';
            _this.isActive = false;
        }else{
            _this.loading.style.display = 'block'
            _this.isActive = true;
        }
        return _this
    }
    return createLoading
})()




/**
 * 站在你写的代码.给别人用的角度该如何是西安
 * 1: 考虑别人怎么用.
 *    获取别人给你能够给你的最多的材料
 * 2: 根据 材料  完成业务
 *
 * 考虑bug
 *  同一个函数 在同一页面中 运行多次 彼此独立互补然然哦
 *  方案: 闭包  面向对象
 *  因为 闭包函数是私有的
 *  对象 与 对象之间是彼此独立的
 *
 */

// 实现

// 1: 用js 圆环 ｈｔｍｌ结构
// 2: 用js 实现了 html 的 css 样式
// 3: 理由api 完成 js 交互
//    1: 如何获取 元素
//    2: 处理那些交互
//    3: 函数多次执行的会不会变量污染