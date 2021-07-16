function typesof(){
    var  muna=document.querySelector(".muna");
    var  coffee=document.querySelectorAll(".muna  div");
    for(var i=0;i<coffee.length;i++){
        coffee[i].onclick=function(){
            localStorage.setItem('classTi',this.innerText)
            window.location.href='./分类.html' 
            
        }        
    }
}