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