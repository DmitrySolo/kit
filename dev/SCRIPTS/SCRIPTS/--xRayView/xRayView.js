//  xRayView script

$( document ).ready(function() {


    quantFuncs.xRayView = function(_this){
        var $currAtr = $('svg use',_this).attr('xlink:href');


        if ($currAtr == '#eye' && !_this.hasClass('active')){
            $('svg use',_this).attr('xlink:href','#eye.hide');
            _this.addClass('active');
        }
        else{
            $('svg use',_this).attr('xlink:href','#eye');
            _this.removeClass('active')
        }
    }



    //logic

});