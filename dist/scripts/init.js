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
//  buttonEvent script

$( document ).ready(function() {

console.log('Hello');

});
//catalogMenu Script
$('.catalogMenu').hover(function () {
    $('.ove-shade').fadeIn();
    $('.catalogMenu__wrapper').css('display','block')
},function () {
    $('.ove-shade').fadeOut();
    $('.catalogMenu__wrapper').css('display','none')
})

$('.catalogMenu__list__item').hover(
    function () {
        var menuId = this.id;
        if (menuId){
            var menuLevel = parseInt(menuId.split('--')[1])+1;
            var nextLevel = menuLevel+1;
            var menuTarget = menuId.split('--')[2];
           // console.log('#catalogMenuLevel--'+menuLevel+'--'+menuTarget);
            //$('.catalogMenu__list__item').css('display','none');
            console.log('.catalogMenu__list--L'+(menuLevel-1)+' .catalogMenu__list__item--active');
            $('.catalogMenu__list--L'+(menuLevel-1)+' .catalogMenu__list__item--active').removeClass('catalogMenu__list__item--active');
            $(this).addClass('catalogMenu__list__item--active');
            $("[id^='catalogMenuLevel--"+menuLevel+"'],[id^='catalogMenuLevel--"+nextLevel+"']").css('display','none');
            $('#catalogMenuLevel--'+menuLevel+'--'+menuTarget).css('display','block');
        }

    },
    function () {




    }
)
//owlSlider Script
$(document).ready(function(){
    $(".owl-carousel").owlCarousel(
        {
            "items":1,
            "lazyLoad":true,
            "margin": 30
        }
    );
});