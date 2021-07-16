var xx = localStorage.getItem('classTi')
// 接口
    function ajxa(url, fn) {
        var hrx = new XMLHttpRequest()
        hrx.open('get', `http://49.232.47.192:9527/api${url}`)
        hrx.send();
        hrx.onreadystatechange = function () {
            if (hrx.status === 200 & hrx.readyState === 4) {
                var fen = hrx.responseText;
                fen = JSON.parse(fen)
                fn(fen)
            }
        }
    }
    var floor=document.querySelector(".floor")
    // 渲染 
    var fenl=document.querySelector(".fenl") 
    ajxa(`/goodList?type_one=${xx}`, function (x) {
 
        for(var i=0;i<x.length;i++){ 
            console.log(x)
            if(i==0||x[i].type_two!=x[i-1].type_two  ){
                console.log(x[i].type_two);
                var h2=document.createElement("h2");
                 h2.innerHTML=x[i].type_two;
                 var p=document.createElement('p');
                 p.innerText=x[i].type_two;
                 floor.appendChild(p);
                 fenl.appendChild(h2);
                 var ul=document.createElement("ul");
                 fenl.appendChild(ul);
            }
            var li=document.createElement("li");
            li.setAttribute('data-id',x[i].Id)
            ul.appendChild(li);
            li.innerHTML=`
            <img src=${x[i].img_list_url} alt="" >
            <a>${x[i].title}</a>
            <div><p>￥${x[i].price}</p><span>${x[i].type_one}</span></div>            
            `   
        }
        floorScroll(document.querySelector('.floor').children, fenl.querySelectorAll('h2'), 'ss')
        var gw=document.querySelectorAll(".fenl ul li")
        for(i=0;i<gw.length;i++){
            gw[i].onclick=function(){
                localStorage.setItem('locaId',this.getAttribute('data-id'))
                location.href='../view/商品详情.html'
        }
        }
    })

    typesof()

// 楼层滚动
    function floorScroll(side, content, classN) {
        side[0].classList.add(classN)
        window.addEventListener('scroll', function () {
            var arr = []
            for (var i = 0; i < content.length; i++) {
                arr.push(Math.abs(document.documentElement.scrollTop - content[i].offsetTop))
            }
            var min = arr[0]
            for (var i = 0; i < arr.length; i++) {
                if (min >= arr[i]) {
                    min = arr[i]
                }
            }
            for (var i = 0; i < side.length; i++) {
                side[i].classList.remove(classN)
            }
            side[arr.indexOf(min)].classList.add(classN)
        })
        for (let i = 0; i < side.length; i++) {
            side[i].addEventListener('click', function () {
                window.scrollTo({
                    top: content[i].offsetTop,
                    behavior: 'smooth'
                })
            })
        }
    }
   

 
