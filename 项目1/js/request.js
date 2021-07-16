/**
 * 目的：希望由一个axios 对象 帮我们完成
 * 发送请求 
 * 处理响应的过程
 */

 function axios(config){
    // console.log('axiosx==============config默认配置项',config)
    // 初始化构造函数
    this.default = config;
    // 添加网络通信实例：请求 和 响应
    this.intercaptals = {
        request:{},   // 请求上下文对象
        response:{}   // 响应的山上下文对象
    }

    // config.method = config.method.toUpperCase();
    // if(config.method==='GET') this.get(config.url,config.data,config.success);
    // if(config.method==='POST') this.post(config.url,config.data,config.success); 
}

axios.prototype.request = function(config){
    // console.log(config);
    // console.log(`发起了请求，请求类型为 ${config.method}`);

    var url = this.default.baseurl + config.url;
    var xhr = new XMLHttpRequest();
    var method = config.method;
    var data = config.data;
   
    if(method=='GET'){
        // 如果 有 pamase 参数，将参数拼接到url地址中 并发送给服务器
        if(data.params){
            var parmas = data.params;   // 获取pamars 参数
            url = url + '?';                   // 给url拼接?
            for(var x in parmas){              // 遍历参数 拼接到rul上
                url = url + x + '=' +parmas[x] + '&'
            }
            url = url.slice(0,url.length-1);    // 去粗地址中最后一个 &符号
        }
        xhr.open(method,url,true)
        xhr.send();     
    }

    if(config.method==='POST'){
        var query = '';
        for(var key in data){
            query = query + key +'='+ data[key]+'&'
        }
        query = query.slice(0,query.length-1);
        xhr.open(method,url,true);                                                 // 建立链接
       
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // 设置请求头 
        xhr.send(query)                                                             // 发送请i去
    }

    
    var _this = this;               // 保存上一层函数中this
    // 服务器做出响应的时候触发  
    xhr.onreadystatechange = function(){
        // console.log(this); // bug  是 xhr 实例
        // 使用_this变量；相当于使用 上一层中this 为 axios实例
        _this.intercaptals.response.status = xhr.status;
        // 使用bind 方式 让 this 为 axios 实例
        this.intercaptals.response.readyState = xhr.readyState;
        if(xhr.readyState === 4 && xhr.status ===200){
            this.intercaptals.response.data = JSON.parse(xhr.responseText);
            // if 语句 一行内容；可以省略 {}

            // typeof 在 es5 中 百分百正确
            if(typeof  config.success === 'function') {
                config.success(this.intercaptals.response.data);
            }

        }
    }.bind(this)
}

axios.prototype.get = function(url,data,success){
    var config = {
        url:url,  // /api/goodlist
        data:data,
        method:"GET",
        success:success
    }
    return this.request(config)
}
axios.prototype.post = function(config){
    return this.request({method:"POST"})

}
// 创建一个生产 axios 实例的函数
function createAxios(config){
    var context = new axios(config);
    return context
}


var REQUEST = createAxios({
    baseurl:'http://49.232.47.192:9527/api'
})




// xhr.readyState 

// 0  
// 1
// 2
// 3
// 4

// 0 客户端发送亲贵 
// 1 请求在路上
// 2 服务器接收到请求了，做出响应
// 3 响应在路上
// 4 客户但收到响应了