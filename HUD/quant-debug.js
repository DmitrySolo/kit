//  quant-debug script

$( document ).ready(function() {
    var mediaMap = {
        phoneBreakpoint: parseInt($('#phone-upper-boundary').text(),10),
        tabletPortraitBreakpoint:parseInt($('#tablet-portrait-upper-boundary').text(),10),
        tabletLandscapeBreakpoint:parseInt($('#tablet-landscape-upper-boundary').text(),10),
        desktopBreakpoint:parseInt($('#desktop-upper-boundary').text(),10),
        desktoplBreakpoint:parseInt($('#desktopl-upper-boundary').text(),10)
    }
    window.searchClosestofDebugElement = function (searchableEl) {
        var arr = ($(searchableEl).html()).split('<i>');
        var tag = arr[0]
        var classes = arr[1].replace(/<\/i>/,'').replace(/ /g,'.').replace(/&gt;/g,'');
        var searchElem = tag+'.'+classes;

        var newDebug = frameEl('.debugElement').closest(frameEl(searchElem));
        console.log(newDebug)
        $('.debugElement').removeClass('debugElement');
        newDebug.trigger('click');
    }
    var mediaRules = qntGetObjects(jsonCss,'type','media');
    var curentEditable;
    function getObjects(elemClassStr) {

        elemClassStr= elemClassStr.trim();
        var result={};
        result.selectors=[];
        result.styles=[];
        result.position = [];
        result.media =[];
        console.log(mediaRules);
        
        $.each(mediaRules,function (i, mediaObj) {

            $.each(mediaObj.rules,function (i1,rule1) {
                if(rule1.hasOwnProperty('selectors') && rule1.selectors.toString().replace(/\./g,'').indexOf(elemClassStr) != -1){
                    var mediaPoint = mediaRules[i].media;
                    console.log(rule1,'qqqq',mediaRules[i].media)
                    result.media.push([mediaPoint,rule1])
                }
            })

        })
        
        
        
        for (var i in jsonCss.stylesheet.rules){
            selObj = jsonCss.stylesheet.rules[i];
            //console.log(selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr))
            if(selObj.hasOwnProperty('selectors') && selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr) != -1){
                console.log(selObj);
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
        console.log(result)
        return result;
    }
//READ SELECTORS
    $('body').on('mousedown','.classtype__name',function () {
        var searchableSelector = $(this).text();
        var regExpss =new RegExp(searchableSelector, 'g');
        console.log(searchableSelector);
        var selectorType = '';

        var elOject = getObjects(searchableSelector)

           var ownStylesProperties={
                ownStyles:[],
                pseudoSelectors:{
                    hover:[],
                    active:[],
                    focus:[]
                }
            }

        var getProps = function () {
            var properties = '';
            for (var i in elOject.styles[index]){
                var rule = elOject.styles[index][i];
                properties += rule.propery+':'+rule.value+'<br>';
            }
            return properties
        }
            for (var index in elOject.selectors){

                if (elOject.selectors[index] == '.'+searchableSelector){
                    var selectorType = 'self';
                    console.log(selectorType)
                    var props = getProps();
                    ownStylesProperties.ownStyles.push(props)
                    $('#selfProperties').prepend('<div class="ownProperties">'+props+'</div>')
                    console.log('IN1')
                }
                else if (elOject.selectors[index].split(',').length >= 2){

                    var groupPart = elOject.selectors[index].split(',');
                    var selectorType = 'group';
                    for (var i in groupPart){

                        if (groupPart[i].split(':').length > 1 && groupPart[i].split(':')[0] =='.'+searchableSelector ){
                            console.log('IN2')
                            var props = getProps();
                            console.log('IN2',props)
                         switch (groupPart[i].split(':')[1]){
                             case 'hover': ownStylesProperties.pseudoSelectors.hover=props;
                             break;
                             case 'active': ownStylesProperties.pseudoSelectors.active=(props);
                             break;
                             case 'focus': ownStylesProperties.pseudoSelectors.focus=props;
                                 break;
                         }
                        }

                    }

                    $('#extendsSelectors').prepend('<div class="selectorHeader selectorGroup">'+elOject.selectors[index].replace(regExpss,'<span class="chosenSelector">'+'.'+searchableSelector+'</span>')+'<div class="propertyGroup">'+props+'</div></div>')

                }else if (elOject.selectors[index].split(' ').length>1){
                    var selectorType = 'ParentChild';
                    console.log(selectorType)
                    var props = getProps()
                    $('#extendsSelectors').prepend('<div class="selectorHeader selectorExt">'+elOject.selectors[index].replace(regExpss,'<span class="chosenSelector">'+'.'+searchableSelector+'</span>')+'<div class="propertyGroup">'+props+'</div></div>')

                }else if (elOject.selectors[index].replace('.'+searchableSelector,'').split('.').length>1){
                    var selectorType = 'Extends';
                    console.log(selectorType)
                    getProps()
                }
                else if (elOject.selectors[index].split(':').length>=1){
                    var selectorType = 'Own';
                    console.log(selectorType)
                    var props = getProps()
                    console.log('in3')
                    switch (elOject.selectors[index].split(':')[1]){
                        case 'hover': ownStylesProperties.pseudoSelectors.hover=props;
                            break;
                        case 'active': ownStylesProperties.pseudoSelectors.active=(props);
                            break;
                        case 'focus': ownStylesProperties.pseudoSelectors.focus=props;
                            break;
                    }
                }


            }

                ownStylesProperties.media=elOject.media
        if(ownStylesProperties.media.length){
                //get prams from mainParamscreen and
            for( var i in ownStylesProperties.media){
                    var breakPoint = parseInt(ownStylesProperties.media[i][0].replace(/\D/g,''));
                console.log(breakPoint,'9090',mediaMap.phoneBreakpoint-1);
                switch(breakPoint){
                    case(mediaMap.desktoplBreakpoint): $('.mediaDesctopLarge').addClass('inList');
                    break;
                    case(mediaMap.desktopBreakpoint): $('.mediaDesctop').addClass('inList');
                    break;
                    case(mediaMap.tabletLandscapeBreakpoint): $('.mediaTabletL').addClass('inList');
                    break;
                    case(mediaMap.tabletPortraitBreakpoint): $('.mediaTabletP').addClass('inList');
                    break;
                    case(mediaMap.phoneBreakpoint-1): $('.mediaMobile').addClass('inList');
                    break;
                }
            }




                //add class to tabber




                console.log('media',ownStylesProperties.media)
        }else{
            console.log('noMedia',ownStylesProperties.media)
        }


            console.log('+',ownStylesProperties,'+')

        $('.iconMediachoiser').on('click',function () {
            var _this = $(this);
            if(_this.hasClass('inList')){

                var classList = _this.attr('class');
                var breakpoint = '';
                switch(true){
                    case(classList.indexOf('Mobile')>0): getMediaCss(mediaMap.phoneBreakpoint-1);
                        break;
                    case (classList.indexOf('TabletP')>0): getMediaCss(mediaMap.tabletPortraitBreakpoint);
                        break;
                    case(classList.indexOf('TabletL')>0): getMediaCss(mediaMap.tabletLandscapeBreakpoint);
                        break;
                    case(classList.indexOf('Desctop')>0): getMediaCss(mediaMap.desktopBreakpoint);
                        break;
                    case(classList.indexOf('DesctopLarge')>0): getMediaCss(mediaMap.desktoplBreakpoint);
                        break;

                }
            }
        })

        var getMediaCss = function (bpoint) {

            for (var i in ownStylesProperties.media){
                if(ownStylesProperties.media[i][0].indexOf(bpoint)>0){
                var props = ownStylesProperties.media[i][1]['declarations'];

                var prop = '';
                var val = '';

                var stringPropVal = '';

                    for (var i in props){
                    prop = props[i]['property'];
                    val = props[i]['value'];
                    stringPropVal +=prop+' : '+val+'<br>';
                }
                    $('.ownProperties').html(stringPropVal);

                }
            }
        }

    })



    function getObjectStyles(className) {

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
    //rea$('.editorsContainer').resizable();


var engP = 'Platy bonito oceanic whitetip shark orangespine unicorn fish loach goby rockweed gunnel turkeyfish Port Jackson shark buffalofish, southern grayling. Arapaima viperfish eeltail catfish pearl danio Black swallower, Atlantic trout sailfin silverside. Tang, marlin tui chub Indian mul flashlight fish, skilfish loosejaw lenok porcupinefish bandfish. Clownfish eeltail catfish: freshwater hatchetfish codlet tenpounder ladyfish scissor-tail rasbora lancetfish tigerperch king of herring. Grideye Mozambique tilapia oceanic whitetip shark clingfish North American darter mail-cheeked fish lamprey bramble shark. Parrotfish loweye catfish squaretail. Lighthousefish yellowhead jawfish shark mola mola sunfish.';
var eHead = 'This is Header';

console.log('MEDIAMAP',mediaMap)
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




//qntDragDrop( document.getElementById('ball'));

    $('.editorsContainer').resizable({
        handles: "n,s",minHeight: 257
    });
    $('button','.fontSelector').on('click',function () {

        var  size = $("input[name='size']").val();
        var  del = $("select[name='del']").val();
        console.log(size+del);
        $('body').css('fontSize',size+del);

    })
///////////////////////////////////////////////////////////////////


    $('.grid,.grid *').unbind('click');

///////////////
    $('#spacerSwitcher').on('click',function () {
        frameEl('#ball').toggleClass('hidden');
        $(this).toggleClass('on')
    })
    $('#gridb').on('click',function () {
        frameEl('#grid').toggleClass('hidden')
        $(this).toggleClass('on')
    })
    $('#debugViewSwitcher').on('click',function () {
        frameEl('body').toggleClass('debug');
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
            .resizable({
                handles: "n, e, s, w"
            });
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
        frameEl( ".debugElement" ).css('backgroundColor',$(this).css('backgroundColor'));


    })
    $('#lock').on('click',function () {
        frameEl( ".debugElement" ).toggleClass('eventLock');
        $(this).toggleClass('on')


    })





    $('#unlock').on('click',function () {
        $( frameEl(".eventLock") ).not('#ball').removeClass("eventLock");
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
    $('#getinnerView').on('click',function (){
       var clone = frameEl('.debugElement').clone().removeAttr('style');
       $('*',clone).removeAttr('style');
       $('.ui-draggable-handle',clone).removeClass('ui-draggable-handle');
        $('.ui-resizable-e,.ui-resizable-s,.ui-resizable-se',clone).remove();
        var html = $("<div />").append(clone).html().replace(/resizeble/g,'')
            .replace(/eventLock/g,'')
            .replace(/ui-resizable/g,'')
            .replace(/ui-resizable-handle/g,'')
            .replace(/class='mod header' contenteditable='true'/g,'')
            .replace(/ui-draggable/g,'')
            .replace(/ui-draggable-handle/g,'')
            .replace(/debugElement/g,'')
            .replace(/-handle/g,'');
            console.log(html);
        $.ajax({
            url: "http://localhost:8181/?action=html2jade&html=" + (html)})

            .done(function (data) {

                console.log(data)
                editorPug.insert(data)


            })

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
        };
        viewpr(v_options);

    })

   var auto_media =  function () {

        var v_options = {
            viewports : [
                {
                    size: '520',
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
        };
        viewpr(v_options);

    }
    //auto_media()








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
        classStr =  frameEl('.debugElement').attr('class').replace(/resizeble/,'')
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
    //
    $(window.frames[0]).on('click',$('#getCode'),function () {

        console.log('hekol')
        classStr =   frameEl('.debugElement').attr('class').replace(/resizeble/,'')
            .replace(/debugElement/g,'')
            .replace(/ui-resizable/g,'')
            .replace(/ui-draggable-handle/g,'')
            .replace(/ui-draggable/g,'');
        var tagStr = frameEl('.debugElement')[0].tagName;
        console.log(tagStr);
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
            url: "http://localhost:8181/?action=getSourceCode&line="+(mapLine)+"&col="+(mapCol-1),
        })
            .done(function( data ) {
                console.log(data)
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
    $('.elAdder').on('click',function () {

        var elem = qntGetThisData(this, 'el')
        elem = $(elem).css('min-height', '20px');
       // MakeEditable(elem);
        frameEl('.debugElement').prepend(elem);
    })




    $('#currentSelectorWay span').on('click',function () {
        console.log(this)
    })

    ///////////////////////////////////////////////////Panel Right
    $('.debug-Pannel-Right-content').accordion({
        active: 0,
        collapsible: true

    });
    $('#textAC').on('click',function () {
        frameEl('.debugElement').css(
            {'textAlign':'center'}
        )

    })
    $('#textAL').on('click',function () {
        frameEl('.debugElement').css(
            {'textAlign':'left'}
        )

    })
    $('#textAR').on('click',function () {
        frameEl('.debugElement').css(
            {'textAlign':'right'}
        )

    })

//padder
    window.padder = function (value) {

        frameEl('.debugElement').css(
            {
                'padding':value+'em'
            }
        )


    }
    window.paddertb = function (value) {

        frameEl('.debugElement').css(
            {
                'padding-top':value+'em',
                'padding-bottom':value+'em',
            }
        )


    }
    window.padderrl = function (value) {

        frameEl('.debugElement').css(
            {
                'padding-right':value+'em',
                'padding-left':value+'em',
            }
        )


    }
    window.marginer = function (value) {

        frameEl('.debugElement').css(
            {
                'margin':value+'em',

            }
        )


    }
    window.marginertb = function (value) {

        frameEl('.debugElement').css(
            {
                'margin-top':value+'em',
                'margin-bottom':value+'em',
            }
        )


    }
    window.marginerrl = function (value) {

        frameEl('.debugElement').css(
            {
                'margin-right':value+'em',
                'margin-left':value+'em',
            }
        )


    }
    window.gridder = function (intName,rangeVal) {
        console.log(this)

        $('input[name ="'+intName+'"]').val(rangeVal);


    }
    $(document.body).on('click','.cselector',function () {
            $('.cselector').removeClass('active')
            $('.cselector').css('opacity','.2');
            $(this).toggleClass('active');

    })


//////////////Modal
        $( ".debug-Dialog" ).dialog({
            modal: true,
            title: "Create New:",
            autoOpen: false
        });

    $( ".debug-Dialog-start").dialog({
        modal: true,
        dialogClass: "starter_dialog"

    });



    $('#cn').on('click',function () {
        $( ".debug-Dialog" ).dialog( "open" );
    })
        $('.debug-registrator-active .creator').on('click',function () {
            var creation = $('.debug-registrator-active #contentType').val();
            switch (creation) {
                case 'element':{

                    var elementTitle = $('#elname').val(),
                        elementType =  $('#eltype').val(),
                        elementExtends = $('#elementExtends').val(),
                        elementParent = $("#elementParent").val(),
                        saveToGlobal = $("input[name='saveto']:checked").val();

                    if (elementTitle && elementType &&elementExtends && elementParent && saveToGlobal){


                        $.ajax({
                            url: "http://localhost:8181/?action=creator&element=element&title="+elementTitle+
                            "&elementType="+elementType+"&extends="+elementExtends+"&parent="+elementParent+
                            "&saveToGlobal="+saveToGlobal})

                            .done(function (data) {

                                console.log('ok')
                                editorPug.insert(data)



                            })

                    }





                }

            }
        })







});