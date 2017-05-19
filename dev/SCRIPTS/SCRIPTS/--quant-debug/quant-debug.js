//  quant-debug script

$( document ).ready(function() {
$('a').removeAttr('href');
qntDragDrop( document.getElementById('ball'));


            var elements = ['ul','nav','div','h1,h2,h3,h4,h5,h6','li','.container','.block'];

            $.each(elements, function( index, elem ) {
                var mt = $(elem).css('margin-top');
                var ml = $(elem).css('margin-left');
                var mb = $(elem).css('margin-bottom');
                var mr = $(elem).css('margin-right');
                $(elem).parent().css("position","relative");
                if(mb !='0px')
                    $(elem).after( "<span style='bottom: 0; left: 45%;' class='debug-margins'>&#x2193;"+mb+"</span>" ).css("position","relative");
                if(ml !='0px')
                    $(elem).after( "<span style='bottom: 50%; left: 0%;' class='debug-margins'>&#x2190;"+ml+"</span>" ).css("position","relative");
                if(mt !='0px')
                    $(elem).after( "<span style='top: 0%; left: 45%;' class='debug-margins'>&#x2191;"+mt+"</span>" ).css("position","relative");
                if(mr !='0px')
                    $(elem).after( "<span style='top: 50%; right: 0%;' class='debug-margins'>"+mr+"&#x2192;</span>" ).css("position","relative");

            })
    $('button','.fontSelector').on('click',function () {

        var  size = $("input[name='size']").val();
        var  del = $("select[name='del']").val();
        console.log(size+del);
        $('body').css('fontSize',size+del);

    })
    $('*:not(#ball)').on('click',function (e) {


        let tmp   = document.createElement('INPUT'), // Создаём новый текстовой input
            focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

        tmp.value = $(this).attr('class'); // Временному input вставляем текст для копирования

        document.body.appendChild(tmp); // Вставляем input в DOM
        tmp.select(); // Выделяем весь текст в input
        document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
        document.body.removeChild(tmp); // Удаляем временный input
        focus.focus(); // Возвращаем фокус туда, где был
        fontSize = $(this).css('fontSize');
        $('#ball').css('fontSize',fontSize);
        $('.lh').text('Line height of font-size ='+ fontSize);
        $.notify($(this).attr('class'),{autoHideDelay: 15000});
        e.stopPropagation()

    })


});