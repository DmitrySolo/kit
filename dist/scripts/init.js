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
$( document ).ready(function() {

    $('.ove-subControlPanel__search_trigger').on('click.search',function () {

        $('.ove-subControlPanel__search_wrapper').toggle().find('input').focus();
        $('.ove-shade').toggle();
    })
    $('.ove-shade').on("click.search", function () {
        $(this).hide();
        $('.ove-subControlPanel__search_wrapper').hide();
    });

});
//owlSlider Script
$(document).ready(function(){
    $(".owl-carousel").owlCarousel(
        {
            "items":1,
            "lazyLoad":true,
            "autoplay":true
        }
    );
});
//  styckyHeader script

$(document).ready(function () {
    var offset = $('.ove-subControlPanel__wrapper').offset().top;

    console.log(offset);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset+20) {

            $('.ove-subControlPanel__wrapper').addClass('stickyHeader');
        }
        else {
            $('.ove-subControlPanel__wrapper').removeClass('stickyHeader');
        }

    })

});