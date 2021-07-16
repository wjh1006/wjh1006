/**
 * 项目不大，接口比较小，所以只是用一个文件管理\
 * 在这个页面 将所有的接口封装一边
 * 
 * 
 * 1：首页
 * 2：搜索页面
 * 3：分类页
 * 4：详情页的相关商品
 * 如何区分这些接口
 * 地址方式都相同
 * 请求参数不同
 */

var api=(function () {
    var api = {};
    api.getShopList = getShopList;
    api.getDetail = getDetail;
    api.getSearch = getSearch;
    api.getTypeOne = getShopList;
    api.Register = Register;
    api.Login = Login;
    api.getTypeOne = getTypeOne;


    function getShopList(options, success) {
        REQUEST.get('/goodList', {
            params: options
        }, function (data) {
            success(data)
        })

    }
    /**
     * 获取商品详情接口
     * @param {Object} opttions  请求参数
     * @param {Function} success  请求成功后处理函数
     */
    function getDetail(options, success) {
        errorLog("接口执行了")
        REQUEST.get('/detail', {
            params: options,
        }, function (data) {
            success(data)
        })
    }

    /**
     * 检索商品列表
     * @param {Object} options 
     * @param {Function} success 
     */
    function getSearch(options, success) {
        // 我们验证，必填参数的目的，为了验证因为 书写等错误，不容易排错。

        // 检验options 中是否有word字段
        // obj.hasOwnProperty(key) 检测某个对象中是否存在某个属性，如果存在，返回true 不存在 返回false
        var result = options.hasOwnProperty('word');
        // 如果不存在word 下面代码不执行
        if (!result) {
            // throw 抛出错误信息，结束语句的作用
            // new Error 创建 错误实例
            throw new Error('option.word is request Params,but you do not have WORD 属性')
        }

        REQUEST.get('/search', {
            params: options,
        }, function (data) {
            success(data)
        })
    }
    /**
     * 获取一级分裂接口
     * @param {Function} success 
     */
    function getTypeOne(success) {
        REQUEST.get('/getTypeone', {
            params: {},
        }, function (data) {
            success(data);
        })
    }

    /**
     * 注册接口
     * @param {*} options 
     * @param {*} success 
     */
    function Register(options, success) {
        var res = options.hasOwnProperty('username') && options.hasOwnProperty('password')
        if (!res) {
            throw new Error('you meed to be userName ande password')
        }

        REQUEST.get('/register', {
            params: options,
        }, function (data) {
            success(data);
        })
    }

    /**
     * 登录
     * @param {Object} options 
     * @param {Function} success 
     */
    function Login(options, success) {
        var res = options.hasOwnProperty('username') && options.hasOwnProperty('password')
        if (!res) {
            throw new Error('you meed to be userName ande password')
        }

        REQUEST.get('/login', {
            params: options,
        }, function (data) {
            success(data);
        })
    }

    /**
     *
     * @param {Object} options
     * @param {Function} success
     */
    function addShopcr(potion,sucess){
var res=options.hasOwnProperty('username')&&options.hasOwnProperty('password')
if (!res) {
    throw new Error('you meed to be userName ande password')
}

REQUEST.get('/add', {
    params: options,
}, function (data) {
    success(data);
})
}
    
    return api
})()

