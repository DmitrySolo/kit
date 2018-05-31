// modalWindows
function openAuthorizePopup()
{
    $("#js_modal__login").removeClass('modalWindow--hide');

}


$(document).ready(function () {
    ;(function(){



        var modalTriggers = document.querySelectorAll('.js_modal_trigger'),
            closers = document.querySelectorAll('.modalWindow__close'),
            targetNum,
            target;

        for (var i = 0; i < modalTriggers.length; i++){

            modalTriggers[i].addEventListener('mousedown',function(){

                targetNum = this.getAttribute('id').split('__')[1];

                target = document.getElementById('js_modall__'+targetNum);
                target.classList.remove('modalWindow--hide');
                target.addEventListener('click',function () {
                    // this.classList.add('modalWindow--hide');
                })

            })
        }

        for(var i = 0; i < closers.length; i++){
            closers[i].addEventListener('click',function () {
                this.parentElement.parentElement.classList.add('modalWindow--hide');
            })
        }

    }());
});
