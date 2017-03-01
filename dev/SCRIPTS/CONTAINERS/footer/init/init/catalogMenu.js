//catalogMenu Script


$('.catalogMenu').hover(function () {
    $('.ove-shade').fadeIn();
    $('.catalogMenu__wrapper').css('display','block')

    var height = $('.catalogMenu__list--L1').height();
    $('.catalogMenu__list--L2,.catalogMenu__list--L3').css('min-height',height+'px');

    console.log(height);
},function () {
    $('.ove-shade').fadeOut();
    $('.catalogMenu__wrapper').css('display','none')
})


var walkMenu = function () {


    var menuId = this.id;
    if (menuId){
        var menuLevel = parseInt(menuId.split('--')[1])+1;
        var nextLevel = menuLevel+1;
        var menuTarget = menuId.split('--')[2];
        // console.log('#catalogMenuLevel--'+menuLevel+'--'+menuTarget);
        //$('.catalogMenu__list__item').css('display','none');

        var menuLevels = 3;



        var el = $(this);

        for(var curL = (menuLevel-1); curL <= menuLevels; curL++){
            $('.catalogMenu__list--L'+curL+' .catalogMenu__list__item--active').removeClass('catalogMenu__list__item--active');
        }
        $("[id^='catalogMenuLevel--"+menuLevel+"'],[id^='catalogMenuLevel--"+nextLevel+"']").css('display','none');
        el.addClass('catalogMenu__list__item--active');
        $('#catalogMenuLevel--'+menuLevel+'--'+menuTarget).css('display','block');


    }


}



$('.catalogMenu__list__item').hover( walkMenu);