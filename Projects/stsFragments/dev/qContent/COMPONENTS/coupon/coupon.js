/**
* COMPONRNT: coupon script
*/
; 
$(document).ready(function(){  

        $('#countDowncoupon--bottom')
            .countdown("2018/04/1", function(event) {
                    $(this).text( 
                        event.strftime('%D Дней %H:%M:%S')
                    );
                });

    var cbCloser = $('.coupon__closer','.coupon--bottom');
    cbCloser.on('click',function(e){
    $('.coupon--bottom').remove();
    
    });
     $(".coupon--bottom").on('click',function(event){
        var _this =  $(this);
           _this.removeClass('animated');
           _this.animate({'marginBottom': '0px'}, 500);
    });  
});
