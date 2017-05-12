//  quant-lib script
var quantFuncs={};
$( document ).ready(function() {

    //Action starter
    var trigger = $('.js-trigger');
    var actionStarter = function () {

        $(trigger).on('click', function () {

           var _this = $(this);

            var action = (_this.data('action'))?_this.data('action'):false;

            if (action){

                quantFuncs[action](_this);

            }else{
                console.log('No data-action Attribute, Dude!');
            }
        })

    }
    actionStarter();

});