//  styckyHeader script

$(document).ready(function () {
    var offset = $('.ove-subControlPanel__wrapper').offset().top;

    console.log(offset);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {

            $('.ove-subControlPanel__wrapper').addClass('stickyHeader');
        }
        else {
            $('.ove-subControlPanel__wrapper').removeClass('stickyHeader');
        }

    })

});