/**
 *  导航组件
 */



function Nav(config) {
    var defaultConfig = {
        container: '.nav',
        isLogin: this.getToken(),   // isLogin 表示是否登录
        aLink: [
            { type: 'index', href: "./index.html" },
            { type: 'login', href: "./login.html" },
            { type: 'register', href: "./register.html" },
            { type: 'shopcar', href: "./shopCar.html" },
        ],
    }
    this.default = !config ? defaultConfig : { ...defaultConfig, ...config };
    // 这里的 页面跳转 是 基于js 为不是 html


}

// 如何根据 isLogin 数据 完成 控制 导航的显示隐藏 

// 初始化渲染dom
Nav.prototype.render = function (box) {
    var contain = document.querySelector(box);
    var html = `
  <nav>
  <div class="nav-mid">
      <div class="nav-top">
          <img src="${this.default.logoUrl}" alt="">
          <div class="nav-right">
              <div class="forms-clearfix">
                  <input type="text" name="" id="" placeholder="请输入想要的商品">
              </div>
              <button id="search-button">
                  <i class="iconfont icon-search"></i>搜索</button>
          </div>
      </div>
      <div class="nav-bot">
          <div id="nav-content">
              <div class="nav-sub before">
                  <a href="#" data-title="index" class="index">首页</a>
                  <a href="#" data-title="login" class="login">登录</a>
                  <a href="#" data-title="register" class="register">注册</a>
              </div>
              <div class="nav-sub after">
                  <a href="#" data-title="index"  class="index">首页</a>
                  <a href="#" data-title="shopcar"  class="shopcar">购物车</a>
                  <a href="#" data-title="loginout"  class="loginout">退出登录</a>
              </div>
          </div>
      </div>
  </div>
</nav>
  
  `
    contain.innerHTML = html;
    var noLogin = document.querySelector(`${this.default.container} .after`);
    var login = document.querySelector(`${this.default.container} .before`);
    if (this.default.isLogin) {
        // 登录了
        login.style.display = 'block';
        noLogin.style.display = 'none';

    } else {
        login.style.display = 'none';
        noLogin.style.display = 'block'
    }

    

    
    // contain.innerHTML = html;
    // var noLogin = document.querySelector(`${this.default.container} .before`);
    // var login = document.querySelector(`${this.default.container} .after`);
    // if (this.default.isLogin) {
    //     // 登录了
    //     login.style.display = 'block';
    //     noLogin.style.display = 'none'
    // } else {
    //     login.style.display = 'none';
    //     noLogin.style.display = 'block'
    // }
    
    
// var loginout=document.querySelector(".loginout");
// loginout.onclick=function(){
//     location.href= '../view/index.html' ;       
// }
    var link = document.querySelectorAll(`${this.default.container} .nav-sub a`);
    for (var i = 0; i < link.length; i++) {
        link[i].onmouseover = this.mouseover.bind(this);
        link[i].onmouseleave = this.mouseleave.bind(this);
        link[i].onclick = this.click.bind(this)

    }

    return this
}

// 导航初始化时候，判断当前是哪一个页面，选中导航
Nav.prototype.initLinkStyle = function () {
    let url = location.href;
    infoLog('匹配链接地址', url)
    // 检测url 中是否有 type 字符
    for (let i = 0; i < this.default.aLink.length; i++) {
        var type = this.default.aLink[i].type;
        console.log(type);
        console.log(url.indexOf(this.default.aLink[i].type));
        if (url.indexOf(type) != -1) {
            // 给 a 添加样式
            var a = document.querySelector(`${this.default.container} #nav-content .${type}`);
            console.log(a);
            this.css(a, {
                color: 'purple',
                borderColor: 'purple',
            })

        }
    }

}

// dom 初始化样式设置
Nav.prototype.initStyle = function () {
    var nav = document.querySelector(`${this.default.container} nav`);

    this.css(nav, {
        paddingTop: '20px',
        marginBottom: '10px',
        width: '100%',
        height: '152px',
        boxShadow: '0 2px 6px #999'
    })

    var navMid = document.querySelector(`${this.default.container} .nav-mid`);

    // if (this.defaultStatus.isLogin) {
    this.css(navMid, {
        margin: '0 auto',
        width: '1200px',
        height: '100%'
    })
    // }

    var navTop = document.querySelector(`${this.default.container} .nav-top`);

    this.css(navTop, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    })

    var logo = document.querySelector(`${this.default.container} .nav-top img`);

    this.css(logo, {
        width: '188px',
        height: '74px'
    })

    var navRight = document.querySelector(`${this.default.container} .nav-right`);

    this.css(navRight, {
        display: 'flex',
        width: '600px',
        zIndex: 99,
        height: '40px',

    });

    var input = document.querySelector(`${this.default.container} .forms-clearfix input`);
    input.onfocus = this.onFouse.bind(this);
    input.onblur = this.onblur.bind(this);

    this.css(input, {
        padding: '0 15px',
        width: '400px',
        border: '1px solid #dcdfe6',
        borderRight: 'none',
        borderRadius: '4px 0 0 4px',
        transition: 'borderColor .2s cubic-bezier(.645,.045,.355,1)',
        height: '40px',
    })
    var button = document.querySelector(`${this.default.container} .nav-right button`);
    button.onclick = this.onSearch.bind(this); // 给搜索按钮绑定点击事件
    button.onmouseover = this.btnMouseover.bind(this)
    button.onmouseleave = this.btnMouseleave.bind(this);

    this.css(button, {
        width: '89px',
        border: "1px solid #dcdfe6",
        backgroundColor: "#fff",
        borderRadius: "0 4px 4px 0",
        fontSize: "14px",
        color: "#606266",
        transition: "border-color .2s cubic-bezier(.645, .045, .355, 1)",
        cursor: "pointer",
        height: '40px',

    })

    // var con = document.querySelector(`${this.default.container} .con`);

    // this.css(con, {
    //     backgroundColor: "#fff",
    //     boxShadow: "0 2px 6px #999"

    // })

    var navContent = document.querySelector(`${this.default.container} #nav-content`);

    this.css(navContent, {
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 10
    });

    // 登录前 登录后?
    var navLogin = document.querySelector(`${this.default.container} .nav-sub`);
    // if (this.default.isLogin) {// 已经登录 未登录
    this.css(navLogin, {
        margin: '0 auto',
        padding: '15px 0',
        width: '1200px',
        height: '57px',
    });
    // } else {

    // }

    var link = document.querySelectorAll(`${this.default.container} .nav-sub a`);
    // if (this.default.isLogin) {// 已经登录 未登录
    for (let i = 0; i < link.length; i++) {
        this.css(link[i], {
            display: 'inline-block',
            padding: '0 10px',
            paddingBottom: '4px',
            margin: '0 20px',
            fontSize: '16px',
            color: '#000000',
            fontWeight: 'bolder',
            borderBottom: '2px solid #fff',
            transition: 'all .3s',
            transition: 'all .3s',
            textDecoration: 'none',
            color: '#000'

        });
    }

    // } else {

    // }


    return this

}

// css 添加样式函数
Nav.prototype.css = function (dom, obj) {
    if (obj.constructor === Object) {
        for (let k in obj) {
            dom.style[k] = obj[k]
        }
    }

    return this
}
// 鼠标移入到导航栏事件
Nav.prototype.mouseover = function (e) {
    // 如何 获取触发事件的元素呢?
    // infoLog('event',e)
    var dom = e.target;
    this.css(dom, {
        color: 'purple',
        borderColor: 'purple',
    })
}

// 鼠标离开 导航 事件
Nav.prototype.mouseleave = function (e) {
    // console.log(e.target.className);
    let url = location.href;
    // 通过url 地址，检测当前是在那个页面
    if ( url.indexOf(e.target.className) !=-1) {
        // 给对应的 导航设置样式
        this.css(e.target, {
            color: 'purple',
            borderColor: 'purple',
        })
        return
    }

    this.css(e.target, {
        color: '#000',
        borderColor: '#fff',
    })
}

// 点击不同的a 标签 跳转不同的页面
Nav.prototype.click = function (e) {
    var a = e.target;
    var title = a.getAttribute('data-title');
    // filter() 过滤数组,返回新数组
    var arr = this.default.aLink.filter((item) => {
        // item 为数组中的没有一个元素
        // return 后为 过滤条件.将满足条件的item元素;都添加到 arr中
        return item.type == title
    })
    location.href = arr[0].href;
}
// 获取token 验证权限
Nav.prototype.getToken = function () {
    var token = localStorage.getItem('token');
    if (token) return true;
    return false
}
// 点击搜索
Nav.prototype.onSearch = function (e) {
    this.css(e.target, {
        color: 'purple',
        backgroundColor: '#f2e6f2',
        borderColor: '#d9b3d9'
    })
    typeof this.default.onSearch() === 'function' ? this.default.onSearch() : false
}

// 鼠标移入 搜索按按钮事件
Nav.prototype.onFouse = function (e) {
    this.css(e.target, {
        outline: "1px solid purple"
    })

}

// 搜索框失去焦点事件
Nav.prototype.onblur = function (e) {
    this.css(e.target, {
        outline: "1px solid rgb(220, 223, 230)"

    })
}


// 鼠标离开搜索按钮事件
Nav.prototype.btnMouseover = function (e) {
    this.css(e.target, {
        color: ' purple',
        backgroundColor: '#fff',
        borderColor: '#ccc',
    })
}

Nav.prototype.btnMouseleave = function (e) {
    this.css(e.target, {
        color: '#ccc',
        backgroundColor: '#f2e6f2',
        borderColor: '#d9b3d9',
    })
}


// 创建导航实例
function createNav(config) {
    // this 为 window 
    var nav = new Nav(config);
    nav.render(config.container).initStyle().initLinkStyle()
    return nav
}

// Nav 下面 所有的 api 怎么样才能会自行
// 1：nav.api()
