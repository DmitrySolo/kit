/**
* MODULE: productInline script
*
*/
var quantitySelectorArr = document.getElementsByClassName('productInline__quantitySelector');
for(var i=0;i<quantitySelectorArr.length;i++){
    quantitySelectorArr[i].addEventListener('focus',function () {
        this.select();
    },false)
}