//  quant-debug script

$( document ).ready(function() {

$('a').removeAttr('href');
//qntDragDrop( document.getElementById('ball'));
    $('#ball').draggable();
    $('.spacer').resizable();

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
    var notifyStr = '';
    $('*,spacer block-i').not('#ball,#ball *,.debugPannel,.debugPannel *').on('click',function (e) {
        $('*').removeClass('debugElement');
        $(this).addClass('resizeble');
        $(this).addClass('debugElement');
        var _this = $(this);
        //$( ".resizeble" ).resizable( "disable" );
        $(this).resizable({stop: function( event, ui ) {
            _this.css("lineHeight",_this.height()+'px');
            _this.resizable( "destroy" );
        }}).draggable();
        let tmp   = document.createElement('INPUT'), // Создаём новый текстовой input
            focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

        var Classes = $(this).attr('class').replace(/resizeble/,'')
            .replace(/debugElement/g,'')
            .replace(/ui-resizable/g,'')
            .replace(/ui-draggable-handle/g,'')
            .replace(/ui-draggable/g,'');
        var tag = $(this).prop("tagName");
        newnotifyStr = tag+'>'+Classes;
        if (newnotifyStr != notifyStr)
        {$.notify(newnotifyStr,{autoHideDelay: 5000});
            notifyStr =newnotifyStr}
        buferMsgArr = Classes.split(" ");
        var buferMsg ='';
        var clName ='';
        for (clName in buferMsgArr){
            if (buferMsgArr[clName] != '')
            buferMsg+='.'+buferMsgArr[clName]+' ';
        }

        tmp.value =buferMsg;  // Временному input вставляем текст для копирования
        document.body.appendChild(tmp); // Вставляем input в DOM
        tmp.select(); // Выделяем весь текст в input
        document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
        document.body.removeChild(tmp); // Удаляем временный input
        focus.focus(); // Возвращаем фокус туда, где был
        fontSize = $(this).css('fontSize');
        $('#ball').css('fontSize',fontSize);
        $('.lh').text('Line height of font-size ='+ fontSize);



        e.stopPropagation()

    })

///////////////
    $('#spacerSwitcher').on('click',function () {
        $('#ball').toggleClass('hidden');
    })
    $('#debugViewSwitcher').on('click',function () {
        $('body').toggleClass('debug');
    })

});