/*

microControls script

 */

//search-mobile
$( document ).ready(function() {

    $('.ove-subControlPanel__search_trigger').on('click',function () {
        $('.ove-subControlPanel__search_wrapper').toggle().find('input').focus();
    })

});