//  quant-lib script
var qntEventFuncs={};
////GET COORDINARTES OF ELEMENT

function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
//// DRAG AND DROP EFFECT
var qntDragDrop = function (ball) {


    ball.onmousedown = function(e) {

        var coords = getCoords(ball);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        ball.style.position = 'absolute';
        document.body.appendChild(ball);
        moveAt(e);

        ball.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            ball.style.left = e.pageX - shiftX + 'px';
            ball.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        ball.onmouseup = function() {
            document.onmousemove = null;
            ball.onmouseup = null;
        };

    }

    ball.ondragstart = function() {
        return false;
    };
}

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