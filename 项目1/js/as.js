var ngtBar = document.querySelector(".navigationBar")
    var asd = ngtBar.querySelectorAll(".navigationBar li")
    var content1 = document.querySelector(".content1")
    var dddd = content1.querySelector(".dddd")
    var dsa = document.querySelectorAll(".dddd li")
    var list=document.querySelector(".list")
    for (var i = 0; i < asd.length; i++) {
        asd[i].setAttribute('index', i);
        asd[i].onclick = function () {
            for (var i = 0; i < asd.length; i++) {
                asd[i].className = '';
            }
            this.className = 'current1';
            var index = this.getAttribute('index');
            for (var i = 0; i < dsa.length; i++) {
                dsa[i].style.display = 'none';
            }
            dsa[index].style.display = 'block';
        }
    }
   
    function swipter() {
    }
    // 分类
    function getShopList() {
      REQUEST.get('/goodlist', { params: { page: 1 } }, function(data) {
          var list = document.querySelector('.list');
          console.log(data);
        
          for (var i = 0; i < data.length; i++) {
            var div=document.createElement('div')
            div.classList.add("item")
            list.appendChild(div)
            div.innerHTML=`
            <img src="${data[i].img_list_url}" alt="">
            <p>${data[i].title}</p>
            <p>  <span>￥${data[i].price}</span>  ${data[i].mack}</p>
            `
          }
         
          var imgs=document.querySelectorAll('.img img');
          window.addEventListener("scroll",function(){
            imgs.forEach(function(item){
              if(item.getBoundingClientRect().top<window.innerHeight){
                var dd=item.getAttribute("data-src");
                item.setAttribute("src",dd);
              }
            })
        })
      })
    }

    getShopList()   
    
    
// 回到顶部
 window.onload=function(){
     var Top=document.querySelector(".Top")
     var tt=null
     Top.onclick=function(){
        tt=setInterval(function(){
            document.documentElement.scrollTop-=100
            if(document.documentElement.scrollTop<=0){
                clearInterval(tt)
            }
        },30) 
     }
 }
//  轮播图
var lbt = document.querySelector(".lbt");
var imgs = document.querySelectorAll(".lbt img");
var box = document.querySelector("#box");
var next = document.querySelector("#next");
var last = document.querySelector("#last");
var left = 0;

function lunbo(num) {
    left += num;
    if (left < -3920) {
        left = 0;
        startTransition(num);
    }
    if (left > 0) {
        left = -3920;
        startTransition(num);
    }
    lbt.style.left = left + "px";
}
function startTransition(num) {
    lbt.style.transition = "none";
    var t = setTimeout(function() {
        lbt.style.transition = "all 2s";
        left += num;
        lbt.style.left = left + "px";
    }, 20);
}

var timer = setInterval(function() {
    lunbo(-990);
}, 2000);

box.onmouseenter = function(e) {
    clearInterval(timer);
    timer = null;
}
box.onmouseleave = function() {
    timer = setInterval(function() {
        lunbo(-990)
    }, 2000);
}
next.onclick = function() {
    lunbo(-990);
}
last.onclick = function() {
    lunbo(990);
}
// 登录
// var dengl=document.querySelector(".login1 button");
// var atNumber=document.querySelector(".login1 .accountNumber")
// var password=document.querySelector(".login1 .mm")
// var logIn=new XMLHttpRequest();
// logIn.open("GET","http://49.232.47.192:9527/api/login?username='djjdjjdjj'&password='123456'")
// logIn.send();
// logIn.onreadystatechange=function(){
//     if(logIn.readyState === 4 && logIn.status === 200){
//         var dl=logIn.responseText;
//         var red=JSON.parse(dl);
//         console.log(red)        
//     }
// }


// 类型
typesof()

// 搜索
var ipt=document.querySelector(".searchFor input")
var btn=document.querySelector(".searchFor button")
btn.onclick=function(){
    var words=ipt.value
    location.href=`../view/find.html?xxx=${words}`
}






