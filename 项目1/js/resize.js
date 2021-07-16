
var xhr = new XMLHttpRequest();
// 建立客户端与服务器端链接
// 参数 params 参数
xhr.open('/api?aaa=123&b=234','GET',true);
// 发送请求
// 请求题传参，
xhr.send('aa=123&&b=234');
// 响应
xhr.onreadystatechange = function(){
}
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