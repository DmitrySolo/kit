//FORM VALIDATE
var validate = function () {
    var valid = true;
    var name=document.forms["subscribe"]["name"].value;
    var email=document.forms["subscribe"]["email"].value;
    if (! validator.isAlpha(name)){
        console.log('noname');
        if (valid) valid =false;
        $('#js_val_name').html('Введите имя!').css('color','red')
    }else{$('#js_val_name').html('')}
    if (! validator.isEmail(email)){
        console.log('NOMAIL');
        if (valid) valid =false;
        $('#js_val_email').html('Неверный адрес!').css('color','red')
    }else{{$('#js_val_email').html('')}}
    return valid
}
//catalogMenu Script


$('.catalogMenu').hover(function () {

    $('.catalogMenu__wrapper').css('display','block')
    $('.ove-shade').fadeIn('fast');
    var height = $('.catalogMenu__list--L1').height();
    $('.catalogMenu__list--L2,.catalogMenu__list--L3').css('min-height',height+'px');

    setTimeout(timeout,mrefreshinterval);
},function () {
    $('.ove-shade').fadeOut();
    $('.catalogMenu__wrapper').css('display','none');

})

var mrefreshinterval = 500; // update display every 500ms
var lastmousex=-1;
var lastmousey=-1;
var lastmousetime;
var mousetravel = 0;
var mousetravely = 0;
$('.catalogMenu__wrapper').mousemove(function(e) {
    var mousex = e.pageX;
    var mousey = e.pageY;
    if (lastmousex > -1)
        mousetravel = mousex-lastmousex;
    if (lastmousey > -1)
        mousetravely = mousey-lastmousey;
    lastmousex = mousex;
    lastmousey = mousey;
});
timeout =function () {
    mousetravel = 0;

    var walk_hover = $('.catalogMenu__list__item:hover');
    if (walk_hover.get().length)
        walkStart(walk_hover.get()[0]);
    if ($('.catalogMenu__wrapper').css('display')=='block')
        setTimeout(timeout,mrefreshinterval);
};



var walkMenu = function () {
    walkStart(this);
    //setTimeout(timeout,mrefreshinterval);
}

var walkStart = function (obj) {

    if( mousetravel < 2){
        var menuId = obj.id;
        if (menuId){
            var menuLevel = parseInt(menuId.split('--')[1])+1;
            var nextLevel = menuLevel+1;
            var menuTarget = menuId.split('--')[2];
            // console.log('#catalogMenuLevel--'+menuLevel+'--'+menuTarget);
            //$('.catalogMenu__list__item').css('display','none');

            var menuLevels = 3;



            var el = $(obj);

            for(var curL = (menuLevel-1); curL <= menuLevels; curL++){
                $('.catalogMenu__list--L'+curL+' .catalogMenu__list__item--active').removeClass('catalogMenu__list__item--active');
            }
            $("[id^='catalogMenuLevel--"+menuLevel+"'],[id^='catalogMenuLevel--"+nextLevel+"']").css('display','none');
            el.addClass('catalogMenu__list__item--active');
            $('#catalogMenuLevel--'+menuLevel+'--'+menuTarget).css('display','block');


        }

    }
}


$('.catalogMenu__list__item').hover(walkMenu);
/*

 microControls script

 */

//search-mobile
$(document).ready(function () {

    $('.ove-subControlPanel__search_trigger').on('click.search', function () {

        $('.ove-subControlPanel__search_wrapper').toggle().find('input').focus();
        $('.ove-shade').toggle();
    })
    $('.ove-shade').on("click.search", function () {
        $(this).hide();
        $('.ove-subControlPanel__search_wrapper').hide();
    });

//card-reg
    $('.ove-cardRegInput').on('input', function () {

        var Inptlenght = 7;
        var targetInput = ".ove-pageCard__Form__num";
        if ($(this).hasClass('ove-pageCard__Form__sms')) {
            Inptlenght = 5;
            targetInput = ".ove-pageCard__Form__sms";
        }else if ($(this).hasClass('ove-pageCard__Form__phone')){
            Inptlenght = 4;
            targetInput = ".ove-pageCard__Form__phone";
        }


        if ($(this).val().length == Inptlenght) {
            $(this).prop('disabled', true);
            $(targetInput).siblings('.ove-cardReg').removeClass('ove-cardReg--inactive').prop('disabled', false);
            $(targetInput + ' + .ove-pageCard__Form__cleaner').show();
        } else {
            $(targetInput).siblings('.ove-cardReg').addClass('ove-cardReg--inactive').prop('disabled', true)
        }
    });

    $('.ove-pageCard__Form__cleaner').on('click', function () {

        $(this).siblings('.ove-cardReg').addClass('ove-cardReg--inactive').prop('disabled', true);
        $(this).siblings('.ove-cardRegInput').prop('disabled', false).val('').focus();
        $(this).hide();


    })

});
//owlGoodsSlider Script
var items = ($(window).width() > 900)? ($(window).width() > 1400)? 5: 4: 3;

$(".owlGoodsSlider").owlCarousel({
    "items" : items || 3,
    "margin": 5,
    "nav" : true,
    "dots" : false,
    "lazyLoad": true
});
//owlSlider Script
$(document).ready(function(){
    $(".ove-mainSlider").owlCarousel(
        {
            "items":1,
            "lazyLoad":true,
            "autoplay":true
        }
    );
});
//  styckyHeader script

$(document).ready(function () {
    var hPoint = $('.ove-subControlPanel--desktop').offset().top;
    var styckElHeight = $('.ove-subControlPanel--desktop').innerHeight();
    var lPoint = hPoint + styckElHeight*2;

    var sticked = false;
    console.log(lPoint);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > lPoint && $(this).width() > 1199) {

            if (!sticked) {

                $('.ove-main').css('margin-top',styckElHeight+'px');
                $('.ove-subControlPanel--desktop').addClass('stickyHeader').delay(1000).hide().slideDown();
                sticked = true
            }

        }
        else if($(this).scrollTop() < hPoint) {
            if (sticked){

                $('.ove-main').css('margin-top','0');
                $('.ove-subControlPanel--desktop').show().removeClass('stickyHeader');
                sticked = false
            }

        }

    })

});
//TO CART

$('.toCart').on('click', function () {

    var ajaxResp = true;

    if (ajaxResp) {
        var _this = $(this)
        _this.find('use').attr('xlink:href', '#loader').delay(5);


        setTimeout(function () {
            $('.ove-cartCounter--phantom').addClass('animate').delay(1000).queue(function (next) {
                $(this).removeClass("animate");
                next();
            });
            _this.addClass('toCart--in').prop('disabled', true);
            _this.find('use').attr('xlink:href', '#check');
        }, 2000)
    }
})
