//  quant-lib script
var qntEventFuncs={};

////////////////////////////////////////////////////// ACTION STARTER

$( document ).ready(function() {


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

/////////////////////////////////////////////////////// GET ELEMENT DATASET

var qntGetDataBySelector = function ( selector,concretData = 0) {

    var elem = document.querySelector(selector);

        if( concretData ) {  return elem.dataset.concretData };
        return elem.dataset
}
var qntGetThisData = function (_this,concretData = 0) {



    if( concretData && _this.dataset.hasOwnProperty(concretData)) {  return _this.dataset[concretData] };
    // return _this.dataset
}


///////////////////////////////////////////////////////GET COORDINARTES OF ELEMENT

function qntGetCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
/////////////////////////////////////////////////////////////////////////////////////////

////SWITCH SVG ICON
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
