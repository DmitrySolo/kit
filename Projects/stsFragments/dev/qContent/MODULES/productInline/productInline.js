/**
* MODULE: productInline script
*
*/
$(document).ready(function () {
    var photo = document.getElementById("opa"); 
    TweenLite.to(photo, 1.5, {x:100});
})



var quantitySelectorArr = document.getElementsByClassName('productInline__quantitySelector');
for(var i=0;i<quantitySelectorArr.length;i++){
    quantitySelectorArr[i].addEventListener('focus',function () {
        this.select();
    },false)
}
