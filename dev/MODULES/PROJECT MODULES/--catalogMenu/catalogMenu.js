//catalogMenu Script
$('.catalogMenu').hover(function () {
    $('.ove-shade').fadeIn();
    $('.catalogMenu__list').css('display','block')
},function () {
    $('.ove-shade,.catalogMenu__list').fadeOut();
    $('.catalogMenu__list').css('display','none')
})