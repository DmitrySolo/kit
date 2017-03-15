//TO CART

$('.toCart').on('click',function () {

    var ajaxResp = true;

    if (ajaxResp){
        var _this =$(this)
        _this.find('use').attr('xlink:href','#loader').delay(5);



        setTimeout(function () {
            _this.addClass('toCart--in').prop('disabled',true);
            _this.find('use').attr('xlink:href','#check');
        },2000)
    }
})
