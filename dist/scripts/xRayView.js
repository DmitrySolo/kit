//  xRayView script

$( document ).ready(function() {

$('#js-triggerEye').on('click',function () {

    //visual
    var $currAtr = $('svg use',this).attr('xlink:href');
    var _this = $(this);

    if ($currAtr == '#eye' && !_this.hasClass('active')){
        $('svg use',_this).attr('xlink:href','#eye.hide');
        _this.addClass('active');
    }
    else{
        $('svg use',this).attr('xlink:href','#eye');
        _this.removeClass('active')
    }
    //logic

})

});