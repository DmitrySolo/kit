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