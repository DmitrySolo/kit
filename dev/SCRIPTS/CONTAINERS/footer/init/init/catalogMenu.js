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