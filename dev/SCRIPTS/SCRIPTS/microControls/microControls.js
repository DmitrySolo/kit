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