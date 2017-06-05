//  quant-debug script

$( document ).ready(function() {
    function getObjects(elemClassStr) {

        elemClassStr= elemClassStr.trim();
        var result={};
        result.selectors=[];
        result.styles=[];
        result.position = []
        for (var i in jsonCss.stylesheet.rules){
            selObj = jsonCss.stylesheet.rules[i];
            //console.log(selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr))
            if(selObj.hasOwnProperty('selectors') && selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr) != -1){
                console.log(selObj)
                result.position.push(selObj.position.start.column)
                result.position.push(selObj.position.start.line)
                result.selectors.push(selObj.selectors.toString());
                var stylesArr=[];
                for(var zi in selObj.declarations){

                    var dec = selObj.declarations[zi];
                    var propVal ={
                        propery:dec.property,
                        value : dec.value
                    }
                    stylesArr.push(propVal)
                }
                result.styles.push(stylesArr)
            }
        }
        return result;
    }
    //console.log(jsonCss.stylesheet.rules);


    //Viewport Resizer

    //$('body').wrapInner( "<div id='project-debug'></div>");
    $('a').not($('.tabAnchr')).removeAttr('href');
    $( "#__bs_script__" ).insertAfter( "body" );



var engP = 'Platy bonito oceanic whitetip shark orangespine unicorn fish loach goby rockweed gunnel turkeyfish Port Jackson shark buffalofish, southern grayling. Arapaima viperfish eeltail catfish pearl danio Black swallower, Atlantic trout sailfin silverside. Tang, marlin tui chub Indian mul flashlight fish, skilfish loosejaw lenok porcupinefish bandfish. Clownfish eeltail catfish: freshwater hatchetfish codlet tenpounder ladyfish scissor-tail rasbora lancetfish tigerperch king of herring. Grideye Mozambique tilapia oceanic whitetip shark clingfish North American darter mail-cheeked fish lamprey bramble shark. Parrotfish loweye catfish squaretail. Lighthousefish yellowhead jawfish shark mola mola sunfish.';
var eHead = 'This is Header';
var mediaMap = {
    phoneBreakpoint: parseInt($('#phone-upper-boundary').text(),10),
    tabletPortraitBreakpoint:parseInt($('#tablet-portrait-upper-boundary').text(),10),
    tabletLandscapeBreakpoint:parseInt($('#tablet-landscape-upper-boundary').text(),10),
    desktopBreakpoint:parseInt($('#desktop-upper-boundary').text(),10),
    desktoplBreakpoint:parseInt($('#desktopl-upper-boundary').text(),10)
}
var mediaBreakPoinsChecker= function () {
    $( window ).resize(function(){
        var size = window.innerWidth;
        console.log(size > mediaMap.desktoplBreakpoint)
        var icon=''
        switch (true){
            case (size > mediaMap.desktoplBreakpoint): icon='#arrow';
                break;
            case (size > mediaMap.desktopBreakpoint): icon='#computer';
                break;
            case (size > mediaMap.tabletLandscapeBreakpoint): icon='#computer1';
                break;
            case (size > mediaMap.tabletPortraitBreakpoint): icon='#computer2';
                break;
            default:
                icon='#computer3';

        }
        $('use','.icon-breakpoits').attr('xlink:href',icon);
        $('#widthOf').text(size)
    })
}
mediaBreakPoinsChecker();

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
///////////////////////////////////////////////////////////////////
    function MakeEditable (elem) {

    elem.on('click',function(e){
        if (!$(this).hasClass('debugElement')){
            $('*').removeClass('debugElement');
            $('#getCode').remove();
           // $('*').removeAttr('contentEditable');
            $(this).addClass('resizeble');
            $(this).addClass('debugElement');
                var position = $('.debugElement').position();
                $('body').prepend('<div id="getCode" class=".notEdit" style="position: absolute;top: '+position.top+'px; left: '+position.left+'px; z-index:1000000000000000000000">Get Code</div>')

            var _this = $(this);
            //$( ".resizeble" ).resizable( "disable" );
            $(this).resizable({stop: function( event, ui ) {
                //_this.css("lineHeight",_this.height()+'px');
                //_this.resizable( "destroy" );
            }}).draggable();

            $('.debugElement').keypress(function (e) {
                if (e.keyCode === 0 || e.keyCode === 32) {
                    e.preventDefault()
                    console.log('ewe')
                    classStr =  $(this).attr('class').replace(/resizeble/,'')
                        .replace(/debugElement/g,'')
                        .replace(/ui-resizable/g,'')
                        .replace(/ui-draggable-handle/g,'')
                        .replace(/ui-draggable/g,'');
                    getObjects(classStr);

                    $('body').prepend('<div id="modPannel">'+$(this).css('color')+'</div>');
                    e.stopPropagation();
                }
            })


            // $('.debugElement').contextmenu(function(e) {
            //     classStr =  $(this).attr('class').replace(/resizeble/,'')
            //         .replace(/debugElement/g,'')
            //         .replace(/ui-resizable/g,'')
            //         .replace(/ui-draggable-handle/g,'')
            //         .replace(/ui-draggable/g,'');
            //    var resMap = getObjects(classStr);
            //    console.log(resMap)
            //         var cssModPanelText ='';
            //         var mapLine = resMap.position[1];
            //         var mapCol = resMap.position[0];
            //         for (var i in resMap.selectors){
            //             cssModPanelText+=resMap.selectors[i]+'{';
            //             for (var zi in resMap.styles[i]){
            //                 cssModPanelText+=resMap.styles[i][zi].propery+':'+resMap.styles[i][zi].value+';'
            //             }cssModPanelText+='}';
            //         }
            //
            //     $('body').prepend('<div id="modPannel">'+cssModPanelText+'</div>');
            //     e.stopPropagation();
            //     download('msg.qnt',mapLine+'-'+mapCol)
            // });
            //$(this).attr('contentEditable','true');

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
        e.stopPropagation()
        })


    }




    MakeEditable($('*,spacer block-i').not($('.notEdit,body,html,.ace_editor,.ace_editor *')).not('.notEdit *'));

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
        MakeEditable($('*',clone));


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
        localStorage.setItem('save', $('#project-debug').html());


    })

    $('#load').on('click',function () {
        $('#project-debug').html(localStorage.getItem('save'));

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
    $('#startMediaTest').on('click',function () {
        $('*').not($('.debug')).not($('.mediaMap')).not($('.mediaMap *')).not($('.debugPannel__wrapper')).not($('html')).not($('body')).not($('.debugPannel__wrapper *')).css('display','none')
        $('body').css('background','#3c3f41').prepend(
            "<div class='iframeWrapper'> <iframe id='project-debug' name='content' frameborder='0' src='http://localhost:3000/' scrolling='no' style='background-color: rgb(49, 32, 52)' width='100%'height='1000px'></iframe>")

        var v_options = {
            viewports : [
                {
                    size: '320',
                    name:  'Mobile'
                },
                {
                    size: '768',
                    name:  'Tablet'
                },
                {
                    size: '1024',
                    name: 'Horizontal Tablet'
                },
                {
                    size: '1280',
                    name: 'Desktop'
                }
            ],
            showName: true,
            reset: 'Original',
            animation: '',
            wrapper:'project-debug'
        };
        viewpr(v_options);

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
    //download('inf.inf', '/Applications/PhpStorm.app/Contents/MacOS/phpstorm /Users/admin/Desktop/QUANT/kit --line 3 /Users/admin/Desktop/QUANT/kit/scss/main.css');
    var getCode = function () {
        console.log('hekol')
        classStr =  $('.debugElement').attr('class').replace(/resizeble/,'')
            .replace(/debugElement/g,'')
            .replace(/ui-resizable/g,'')
            .replace(/ui-draggable-handle/g,'')
            .replace(/ui-draggable/g,'');
        var resMap = getObjects(classStr);
        console.log(resMap)
        var cssModPanelText ='';
        var mapLine = resMap.position[1];
        var mapCol = resMap.position[0];
        for (var i in resMap.selectors){
            cssModPanelText+=resMap.selectors[i]+'{';
            for (var zi in resMap.styles[i]){
                cssModPanelText+=resMap.styles[i][zi].propery+':'+resMap.styles[i][zi].value+';'
            }cssModPanelText+='}';
        }

        $.ajax({
            url: "http://localhost:8181/?line="+(mapLine)+"&col="+(mapCol-1),
        })
            .done(function( data ) {
                var dataArr = data.split('=')
                var rsourse = dataArr[0];
                var line = dataArr[1];

                $.getJSON("maps/main.css.map", function (dataMap) {


                    var filetoEditIndex = dataMap.sources.indexOf(rsourse)

                    filetoEdit = dataMap.sourcesContent[filetoEditIndex];
                    editor.insert(filetoEdit);
                    editor.$blockScrolling = Infinity
                    editor.gotoLine(line);
                });

            });

    }
    $("body").on('click','#getCode',function () {

        console.log('hekol')
        classStr =  $('.debugElement').attr('class').replace(/resizeble/,'')
            .replace(/debugElement/g,'')
            .replace(/ui-resizable/g,'')
            .replace(/ui-draggable-handle/g,'')
            .replace(/ui-draggable/g,'');
        var resMap = getObjects(classStr);
        console.log(resMap)
        var cssModPanelText ='';
        var mapLine = resMap.position[1];
        var mapCol = resMap.position[0];
        for (var i in resMap.selectors){
            cssModPanelText+=resMap.selectors[i]+'{';
            for (var zi in resMap.styles[i]){
                cssModPanelText+=resMap.styles[i][zi].propery+':'+resMap.styles[i][zi].value+';'
            }cssModPanelText+='}';
        }

        $.ajax({
            url: "http://localhost:8181/?line="+(mapLine)+"&col="+(mapCol-1),
        })
            .done(function( data ) {
                var dataArr = data.split('[^]')
                var rsourse = dataArr[0];
                var line = dataArr[1];
                var pugContent = dataArr[2];
                var jsContent = dataArr[3];
                $.getJSON("maps/main.css.map", function (dataMap) {


                    var filetoEditIndex = dataMap.sources.indexOf(rsourse)

                    filetoEdit = dataMap.sourcesContent[filetoEditIndex];
                    editor.insert(filetoEdit);
                    editor.$blockScrolling = Infinity
                    editor.gotoLine(line);
                    console.log(pugContent)
                    editorPug.insert(pugContent);
                    editorJs.insert(jsContent);
                });

            });



    });

});