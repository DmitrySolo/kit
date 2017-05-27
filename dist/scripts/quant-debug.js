//  quant-debug script

$( document ).ready(function() {
var engP = 'Platy bonito oceanic whitetip shark orangespine unicorn fish loach goby rockweed gunnel turkeyfish Port Jackson shark buffalofish, southern grayling. Arapaima viperfish eeltail catfish pearl danio Black swallower, Atlantic trout sailfin silverside. Tang, marlin tui chub Indian mul flashlight fish, skilfish loosejaw lenok porcupinefish bandfish. Clownfish eeltail catfish: freshwater hatchetfish codlet tenpounder ladyfish scissor-tail rasbora lancetfish tigerperch king of herring. Grideye Mozambique tilapia oceanic whitetip shark clingfish North American darter mail-cheeked fish lamprey bramble shark. Parrotfish loweye catfish squaretail. Lighthousefish yellowhead jawfish shark mola mola sunfish.';
var eHead = 'This is Header';

var addToBufer= function (content) {
    let tmp   = document.createElement('INPUT'), // Создаём новый текстовой input
        focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)
    tmp.value =content;

    // Временному input вставляем текст для копирования
    document.body.appendChild(tmp); // Вставляем input в DOM
    tmp.select(); // Выделяем весь текст в input
    document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
    document.body.removeChild(tmp); // Удаляем временный input
    focus.focus();

}
    function paste(elem) {
             elem.focus();
        document.execCommand('paste');
        console.log(elem.val())
        return elem.val();



    }
    function handlePaste (e) {
        var clipboardData, pastedData;

        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');

        // Do whatever with pasteddata
        alert(pastedData);
    }

    document.getElementById('editableDiv').addEventListener('paste', handlePaste);

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

    function MakeEditable (elem) {
    elem.on('click',function(e){
        if (!$(this).hasClass('debugElement')){
            $('*').removeClass('debugElement');
            $('*').removeAttr('contentEditable');
            $(this).addClass('resizeble');
            $(this).addClass('debugElement');
            var _this = $(this);
            //$( ".resizeble" ).resizable( "disable" );
            $(this).resizable({stop: function( event, ui ) {
                //_this.css("lineHeight",_this.height()+'px');
                //_this.resizable( "destroy" );
            }}).draggable();


            $(this).attr('contentEditable','true');

            var Classes = $(this).attr('class').replace(/resizeble/,'')
                .replace(/debugElement/g,'')
                .replace(/ui-resizable/g,'')
                .replace(/ui-draggable-handle/g,'')
                .replace(/ui-draggable/g,'');

            var tag = $(this).prop("tagName");

            newnotifyStr = tag+'>'+Classes;

            //$(this).append("<span style='position: absolute;top:-20px; left:0;font-size:10px;'>"+newnotifyStr+"</span>")
            if (newnotifyStr != notifyStr)
            {$(this).notify(newnotifyStr,{autoHideDelay: 2000,style:'tagClassInfo'});
                notifyStr =newnotifyStr}
            buferMsgArr = Classes.split(" ");
            var buferMsg ='';
            var clName ='';
            for (clName in buferMsgArr){
                if (buferMsgArr[clName] != '')
                    buferMsg+='.'+buferMsgArr[clName]+' ';
            }
            addToBufer(buferMsg);

            // Возвращаем фокус туда, где был
            fontSize = $(this).css('fontSize');
            if (! $('#ball').hasClass('eventLock')){
                $('#ball').css('fontSize',fontSize);
                $('.lh').text('Line height of font-size ='+ fontSize);
            }





        }
        e.stopPropagation() })


    }




    MakeEditable($('*,spacer block-i').not($('.debug,.debugPannel,.debugPannel__wrapper,body,html,.debugPannel *,#ball,#ball *')));

    $('.grid,.grid *').unbind('click');

///////////////
    $('#spacerSwitcher').on('click',function () {
        $('#ball').toggleClass('hidden');
        $(this).toggleClass('on')
    })
    $('#gridb').on('click',function () {
        $('#grid').toggleClass('hidden')
        $(this).toggleClass('on')
    })
    $('#debugViewSwitcher').on('click',function () {
        $('body').toggleClass('debug');
        $(this).toggleClass('on');

    })
    $('#addRect').on('click',function () {
        $(".debugElement").append( "<div class='mod rect'></div>" );
        MakeEditable($('.mod.rect'));
    })
    $('#addHeader').on('click',function () {
        $(".debugElement").append( "<h1 class='mod header' contenteditable='true'>"+eHead+"</h1><h2 class='mod header'>"+eHead+"</h2><h3 class='mod header'>"+eHead+"</h3><h4 class='mod header'>"+eHead+"</h4><h5 class='mod header'>"+eHead+"</h5><h6 class='mod header'>"+eHead+"</h6>" );
        MakeEditable($('.mod.header'));
    })
    $('#addP').on('click',function () {
        $(".debugElement").append( "<p class='mod prgph'>"+engP+"</p>" );
        MakeEditable($('.mod.prgph'));
    })

    $('#addImg').on('click',function () {
       var url = paste($('#imginpt'));
        $("body").append( "<div class='mod img' style='width:200px; height: 200px;'><img  src='"+window.clipboardData+"' width='100%'></div>" );
        //var iframe = $('#pugIfrm').contents().find( "a" ).css( "background-color", "#6bdabd" );
        MakeEditable($('.mod.img'));
    })
    $('#addBkg').on('click',function () {
        console.log("url='"+$('#imginpt').val()+"'");
        $(".debugElement").css( "background","url("+$('#imginpt').val()+")");
    })



    $('#clone').on('click',function () {
        var clone = $( ".debugElement" ).clone().appendTo( "body" ).css({"position":"absolute","top":"0"}).removeClass("debugElement")
            .draggable()
            .resizable();
        MakeEditable($(clone));


    })

    $('#del').on('click',function () {
        $(".debugElement").remove();
    })

    $('#colorPicker').on('change',function () {
        $(".debugElement").css('opacity','1').css('backgroundColor',$(this).val());
    })
    $('#colorPickerFont').on('change',function () {
        $(".debugElement").css('opacity','1').css('color',$(this).val());
    })
    $('#100p').on('click',function () {
        $(".debugElement").css('width','100%');
    })

    $('#getHtml').on('click',function () {

        $('.notifyjs-wrapper').remove();
        $('.ui-resizable-handle').remove();

        var topug = $(".debugElement").parent().html()
      // $(".notifyjs-wrapper",$(".debugElement").parent()).remove();
        topug = topug.replace(/resizeble/g,'')
                .replace(/eventLock/g,'')
                .replace(/ui-resizable/g,'')
                .replace(/ui-resizable-handle/g,'')
                .replace(/class='mod header' contenteditable='true'/g,'')
                .replace(/ui-draggable/g,'')
                .replace(/ui-draggable-handle/g,'')
                .replace(/debugElement/g,'');
       addToBufer(topug );

       if (document.getElementById('htmlToPugctn') == null){
           $('body').append('<div id="htmlToPugctn" class="htmlToPug"><iframe id="pugIfrm" src="http://jumplink.github.io/jade2html2jade/" width="400" height="700" align="left"></iframe><span class="js-trigger">close</span></div>');
       }



       //Html2Jade.convertDocument(document, {}, function (err, jade) {
            // do your thing
        //});

    })
    $('#down').on('click',function () {
        $( ".debugElement" ).css('zIndex',$( ".debugElement" ).css('zIndex')-10000000000000000);


    })
    $('#up').on('click',function () {
        $( ".debugElement" ).css('zIndex',$( ".debugElement" ).css('zIndex')+10000000000000000);


    })
    $('.pb-colorBox').on('click',function () {
        $( ".debugElement" ).css('backgroundColor',$(this).css('backgroundColor'));


    })
    $('#lock').on('click',function () {
        $( ".debugElement" ).toggleClass('eventLock');
        $(this).toggleClass('on')


    })
    $('#unlock').on('click',function () {
        $( ".eventLock" ).not('#ball').removeClass("eventLock");
            $('#lock').removeClass('on');

    })

    $('#lockSpacer').on('click',function () {
        $( "#ball" ).toggleClass('eventLock');
        $(this).toggleClass('on');


    })


    $('#save').on('click',function () {
        localStorage.setItem('save', $('body').not($('#__bs_script__')).html());


    })

    $('#load').on('click',function () {
        $('body').html(localStorage.getItem('save'));

        console.log(localStorage.getItem('save'))
    })

    $('#showAllTags--').on('click',function () {

        $('*').each(function () {
            MakeEditable($(this));
            if ($( this ).attr('class')){
                console.log('hello');
            var Classes = $( this ).attr('class').replace(/resizeble/,'')
                .replace(/debugElement/g,'')
                .replace(/ui-resizable/g,'')
                .replace(/ui-draggable-handle/g,'')
                .replace(/ui-draggable/g,'');

            var tag = $( this ).prop("tagName");

            var newnotifyStr = tag+'>'+Classes;
            $( this ).prepend("<div style='position: relative';><span class='tagChecker' style='background:"+$(this).css('background')+"'>"+newnotifyStr+"</span></div>")

        }})

    })
    $('#unsplash').on('click',function () {

        $('body').append('<div id="imagesOnline" class="htmlToPug"><iframe id="pugIfrm" src="http://allthefreestock.com/" width="1200" height="800" align="left"></iframe><span class="js-trigger">close</span></div>');
        $('#imagesOnline .js-trigger-close').on('click',function () {
            $('#imagesOnline').remove();


        })
        $('#imagesOnline').closest('.js-trigger-hide').on('click',function () {
            $('#imagesOnline').css('left',"-"+$(this).width)*0.9+"px";


        })


    })
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }
    //download('test.txt', 'Hello world!');

});