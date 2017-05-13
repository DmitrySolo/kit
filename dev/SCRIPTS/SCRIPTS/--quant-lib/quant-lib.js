//  quant-lib script
var qntEventFuncs={};

var qntSwitchSVGIcon = function (el,icon1,icon2){

    var $currAtr = $('svg use',el).attr('xlink:href');


    if ($currAtr == icon1 && !el.hasClass('active')){
        $('svg use',el).attr('xlink:href',icon2);
        el.addClass('active');
    }
    else{
        $('svg use',el).attr('xlink:href',icon1);
        el.removeClass('active')
    }
}


$( document ).ready(function() {

    //Action starter
    var trigger = $('.js-trigger');
    var qntActionStarter = function () {

        $(trigger).on('click', function () {

           var _this = $(this);

            var action = (_this.data('action'))?_this.data('action'):false;

            if (action){

                qntEventFuncs[action](_this);

            }else{
                console.log('No data-action Attribute, Dude!');
            }
        })

    }
    qntActionStarter();




});