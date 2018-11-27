//order js validator
;
qntTab(
    $('.onePageOrder__deliveryTab'),
    $('.onePageOrder__deliveryOption'),
    'onePageOrder__deliveryTab--selected'
);
$('#delTimeCheck').on('change', function () {

    if ($('#delTimeCheck').prop("checked") == true) {
        $('#selectTime').prop("disabled", false);
    } else {
        $('#selectTime').prop("disabled", true);
        $('#selectTime').val('');
    }
});
$.validate({
    validateOnBlur: true, 
    errorMessagePosition: 'bottom',
    scrollToTopOnError: true,
      onError : function() {
      $('.onePageOrder__input.error').closest('.onePageOrder__section')
      .find('.onePageOrder__header')
      .addClass('errorHeader');
    },
});
