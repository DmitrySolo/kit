$('#pattern').on('click','.menu-link', function() {
    $('.menu').slideToggle('fast', function() {
        if($('.menu').is(':visible')) {
            $('.menu-link span').html('&#9650;');
        } else {
            $('.menu-link span').html('&#9660;');
        }
    });
});

$('.menu').on('click', '.has-subnav a', function() {
    if ($(window).width() < 772 || $('html').hasClass('touch')) {
        if ($(this).next('ul').is(':visible')) {
            $(this).next('ul').slideUp('fast');
            $(this).removeClass('active');
        } else {
            $(this).closest('ul').find('.active').next('ul').slideUp('fast');
            $(this).closest('ul').find('.active').removeClass('active');
            $(this).next().slideToggle('fast');
            $(this).addClass('active');
        }
    }
});
