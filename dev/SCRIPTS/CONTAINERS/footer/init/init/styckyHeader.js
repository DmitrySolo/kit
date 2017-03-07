//  styckyHeader script

$(document).ready(function () {
    var hPoint = $('.ove-subControlPanel--desktop').offset().top;
    var lPoint = hPoint + $('.ove-subControlPanel--desktop').innerHeight();

    var sticked = false;
    console.log(lPoint);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > lPoint) {

            if (!sticked) {

                $('.ove-main').css('margin-top','1.1em');
                $('.ove-subControlPanel--desktop').addClass('stickyHeader').hide().slideDown();
                sticked = true
            }

        }
        else if($(this).scrollTop() < hPoint) {
            if (sticked){

                $('.ove-main').css('margin-top','0');
                $('.ove-subControlPanel--desktop').removeClass('stickyHeader');
                sticked = false
            }

        }

    })

});