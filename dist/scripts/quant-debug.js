//  quant-debug script

$( document ).ready(function() {

$('a').removeAttr('href');
//qntDragDrop( document.getElementById('ball'));
    $('#ball').draggable();
    $('.spacer').resizable();

    $('button','.fontSelector').on('click',function () {

        var  size = $("input[name='size']").val();
        var  del = $("select[name='del']").val();
        console.log(size+del);
        $('body').css('fontSize',size+del);

    })
    var notifyStr = '';
            $.notify.addStyle('tagClassInfo',{html:
    "<div class='tagClassInfo'>" +
    "<span data-notify-text>dsd</span>" +
    "</div>"
            })


    $('*,spacer block-i').not($('.debugPannel,.debugPannel__wrapper,body,html,.debugPannel *,#ball,#ball *')).on('click',function (e) {

        if (!$(this).parents('section').hasClass('grid') || !$(this).hasClass('grid')){
            console.log(!$(this).parents('section').hasClass('grid') || !$(this).hasClass('grid'));

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
        {$(this).notify(newnotifyStr,{autoHideDelay: 200000000000000,style:'tagClassInfo'});
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



        e.stopPropagation()}

    })
    $('.grid,.grid *').unbind('click');

///////////////
    $('#spacerSwitcher').on('click',function () {
        $('#ball').toggleClass('hidden');
    })
    $('#gridb').on('click',function () {
        $('#grid').toggleClass('hidden')
    })
    $('#debugViewSwitcher').on('click',function () {
        $('body').toggleClass('debug');
    })
    $('#addRect').on('click',function () {
        $('body').append( "<div class='mod rect'></div>" );
        $('.mod.rect').draggable();
        $('.mod.rect').resizable();
    })
    $('#addHeader').on('click',function () {
        $('body').append( "<h1 class='mod header'>This is H1 title</h1><h2 class='mod header'>This is H1 title</h2><h3 class='mod header'>This is H1 title</h3><h4 class='mod header'>This is H1 title</h4><h5 class='mod header'>This is H1 title</h5><h6 class='mod header'>This is H1 title</h6>" );
        $('.mod.header').draggable();
        $('.mod.header').resizable();
    })
    $('#addP').on('click',function () {
        $('body').append( "<p class='mod prgph'>Platy bonito oceanic whitetip shark orangespine unicorn fish loach goby rockweed gunnel turkeyfish Port Jackson shark buffalofish, southern grayling. Arapaima viperfish eeltail catfish pearl danio Black swallower, Atlantic trout sailfin silverside. Tang, marlin tui chub Indian mul flashlight fish, skilfish loosejaw lenok porcupinefish bandfish. Clownfish eeltail catfish: freshwater hatchetfish codlet tenpounder ladyfish scissor-tail rasbora lancetfish tigerperch king of herring. Grideye Mozambique tilapia oceanic whitetip shark clingfish North American darter mail-cheeked fish lamprey bramble shark. Parrotfish loweye catfish squaretail. Lighthousefish yellowhead jawfish shark mola mola sunfish.</p>" );
        $('.mod.prgph').draggable();
        $('.mod.prgph').resizable();
    })
    $('#clone').on('click',function () {
        $( ".debugElement" ).clone().appendTo( "body" ).css({"position":"absolute","top":"0"}).removeClass("debugElement")
            .draggable()
            .resizable();

    })

});