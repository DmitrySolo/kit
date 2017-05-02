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
    "items" : items || 25,
    "margin": 5,
    "nav" : true,
    "dots" : false,
    "lazyLoad": true
});
$('.oveX-header').css('backgroundColor','tomato');
console.log('test213');
console.log('test23');
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
