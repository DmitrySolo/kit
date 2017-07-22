//  quant-lib script
var qntEventFuncs={};
/////////////////////////////////////////////////////// CONSOLE LOG
var ql = function(msg,del=''){
    console.log('%cQDebug','color:blue;font-weight:bold',del);
    console.log(msg);
    console.log('_____________________________________________________________');
}
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
////FIND IN OBJECT////////////////////////////////////////////////////////////////////
function qntGetObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(qntGetObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}