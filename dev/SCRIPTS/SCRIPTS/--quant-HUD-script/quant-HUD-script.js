$(document).ready(function () {


var vendorsClasses = ['debugElement','ui-draggable-handle','ui-draggable','ui-resizable','resizeble'];
var changerWatcher = {}
changerWatcher.targets = {}
var target ={};
target.save = {
	"element-vistest-mainbutton":
		{
			properties:{
				'display':'block',
				'width':'100%',
				'color':'darkcyan',
				'background_image':'url("http://home/image.jpg")'
			},
			mediaProperties:{
				phone_only:{
					properties:{
						width:'30%'
					},
					pElProperties:{
						hover:{
							background_color:'yellow'
						}
					}
				},
				desktop_up:{
					properties:{
						width:'70%',
						color:'violet'
					}
				}
			},
			pElProperties: {
				hover:{
					color:'red'
				},
				last_child:{
					margin:0
				}
			}
		}
}









function MakeEditable (elem) {

	elem.on('click',function(e){

		$('#selfProperties,#extendsSelectors,#context,#classSelector',window.parent.document).html('');
		$('.classChoser',window.parent.document).val('');console.log( $(this).attr('class'));
		$('.iconMediachoiser',window.parent.document).removeClass('active').removeClass('inList');
		$('.mediaAll',window.parent.document)



//////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////
		if($('*').is($(this).closest('*[data-qcontent=true]'))){
			var parentEl = $(this).closest('*[data-qcontent=true]');

			var context = parentEl[0].dataset.qcname;

			var context = context.split('_');

			var type = context[0].split('[>]');
			if (type[1]) var subtype = ' > '+type[1];
			type =type[0]
			var name = context[1];

			$('#context',window.parent.document).prepend('<div class="qcnt type'+type+'">'+type+subtype+' : '+name+'</div>');

		}else{
			console.log('no')
		}

		//  var qecm = $(this).closest('*[data-qcontent=true]');



		var classString = $(this).attr('class');
		if(classString){

			//classString = classString.replace

			var classStringArr = classString.split(' '),
				block = '',
				element = '',
				modifier = '',
				result =[];

			$.each(classStringArr,function (index,value) {
				if (value.indexOf('ta-')!=-1){
					if (value.indexOf('__')!=-1){
						var valueArr = value.split('__')
						block = (valueArr[0].split('-'))[1]
						if (valueArr[1].indexOf('--')!=-1){
							element = (valueArr[1].split('--')[0])
							modifier = (valueArr[1].split('--')[1])
						}else{
							element = valueArr[1]
						}
					}else{
						block = (value.split('-'))[1]
					}
					var predRes = [block,element,+modifier];
					result.push(predRes);
				}else{
					if (vendorsClasses.indexOf(value) == -1)
						$('#classSelector',window.parent.document).prepend('<div class=" cselector"><span class="classtype extClass">c</span><span class="classtype__name">'+value+'</span></div>')
				}

			})


			console.log(result)
			if (result.length >1){
				$.each(result,function (index,value) {
					$('#classSelector',window.parent.document).prepend('<div class=" cselector"><span class="classtype bem">b</span>'+value[0]+' '+value[1]+' '+value[2]+'</div>')
				})
			}
			$('.classChoser[name="block"]',window.parent.document).val(block)
			$('.classChoser[name="element"]',window.parent.document).val(element)
			$('.classChoser[name="modifier"]',window.parent.document).val(modifier)
		}else{
			$('#classSelector',window.parent.document).prepend('<div class=" cselector"><span class="classtype elemS">e</span>'+$(this).prop('tagName')+'</div>')
		}





		if($(this).hasClass('ruler')){ e.stopPropagation()}
		if (!$(this).hasClass('debugElement')){
			$(this).resizable({handles: "n, e, s, w"});
			$(this).draggable();
			$('*').removeClass('debugElement');
			$('*').remove('.mChacker');

			$('#getCode').remove();
			// $('*').removeAttr('contentEditable');
			$(this).addClass('resizable');
			//  $(this).attr('oncontextmenu',"console.log('blogged')");
			$(this).addClass('debugElement');
			$(this).attr('contenteditable','true')
			GetParents($('.debugElement'));
			var position = $('.debugElement').position();
			$('body').prepend('<div id="getCode" class=".notEdit" style="position: absolute;top: '+position.top+'px; left: '+position.left+'px; z-index:10000">Get Code</div>')
			if ( parseInt($(this).css('marginBottom'))>0 )
                $(this).prepend("<div style='position:absolute;bottom:-"+$(this).css('marginBottom')+"; height:"+$(this).css('marginBottom')+";width:100%;line-height:1' class='mChacker' >&#8681</div> ")
            if ( parseInt($(this).css('marginLeft'))>0 )
                $(this).prepend("<div style='position:absolute;left:-"+$(this).css('marginLeft')+"; width:"+$(this).css('marginLeft')+";height:100%;line-height:1' class='mChacker' >&#8681</div> ")
            if ( parseInt($(this).css('marginRight'))>0 )
				$(this).prepend("<div style='position:absolute;right:-"+$(this).css('marginRight')+"; width:"+$(this).css('marginRight')+";height:100%;line-height:1' class='mChacker' >&#8681</div> ")
            if ( parseInt($(this).css('marginTop'))>0 )
                $(this).prepend("<div style='position:absolute;top:-"+$(this).css('marginTop')+"; height:"+$(this).css('marginTop')+";width:100%;line-height:1' class='mChacker' >&#8681</div> ")
			var _this = $(this);
			//$( ".resizeble" ).resizable( "disable" );



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

			// var Classes = $(this).attr('class').replace(/resizeble/,'')
			//     .replace(/debugElement/g,'')
			//     .replace(/ui-resizable/g,'')
			//     .replace(/ui-draggable-handle/g,'')
			//     .replace(/ui-draggable/g,'');
			//
			// var tag = $(this).prop("tagName");

			// newnotifyStr = tag+'>'+Classes;

			//$(this).append("<span style='position: absolute;top:-20px; left:0;font-size:10px;'>"+newnotifyStr+"</span>")
			// if (newnotifyStr != notifyStr)
			// {$(this).notify(newnotifyStr,{autoHideDelay: 2000,style:'tagClassInfo'});
			//     notifyStr =newnotifyStr}
			// buferMsgArr = Classes.split(" ");
			// var buferMsg ='';
			// var clName ='';
			// for (clName in buferMsgArr){
			//     if (buferMsgArr[clName] != '')
			//         buferMsg+='.'+buferMsgArr[clName]+' ';
			// }
			// addToBufer(buferMsg);

			// Возвращаем фокус туда, где был
			fontSize = $(this).css('fontSize');
			if (! $('#ball',window.parent.document).hasClass('eventLock')){
				$('#ball',window.parent.document).css('fontSize',fontSize);
				$('.lh',window.parent.document).text('Line height of font-size ='+ fontSize);
			}





		}
		e.stopPropagation()
	})


}
$(document).ready(function () {

	$('#ball').draggable();
	$('.ElemMenu',window.parent.document).draggable();
	$('.spacer').resizable(

	);

})



MakeEditable($('*,spacer block-i').not($('.notEdit,body,html,.ace_editor,.ace_editor *,.rg-overlay,.rg-overlay *')).not('.notEdit *'));


var firstInTagsLine ='';
function GetParents(el) {


	if (el.tagName != 'svg'){
        $('#currentSelectorWay',$(window.parent.document)).html('');
        var parents = el.parents("*").not($('html')).not($('body')).not($('svg'));
        var selectors = "<div style='background: #2b2b2b;color:#fff'>";
        var selectorFirstFinded = false
        for (var i = parents.length-1; i >= 0; i--) {


            parents[i].classList.remove("resizeble");
            parents[i].classList.remove("ui-resizable");
            parents[i].classList.remove("ui-draggable");
            parents[i].classList.remove("ui-draggable-handle");
            // el.removeClass('resizeble')
            // el.removeClass('ui-resizable')
            // el.removeClass('ui-draggable')
            // el.removeClass('ui-draggable-handle')

            if (!selectorFirstFinded){
                firstInTagsLine = parents[i].tagName+'.'+parents[i].className;
                selectorFirstFinded = true;
            }

            selectors += "<span onclick='searchClosestofDebugElement(this)'>"+parents[i].tagName + "<i>"+parents[i].className+ "</i>></span>";
        }

        var ElCls =  el.prop("className").replace(/resizeble/g,'')
            .replace(/resizable/g,'')
            .replace(/debugElement/g,'')
            .replace(/draggable/g,'')
            .replace(/ui-/g,'')
            .replace(/-handle/g,'')



        selectors +="<span style='background: #0086b3;'>"+el.prop("tagName")+"<i>"+ElCls+"</i></span></div>";

        $('#currentSelectorWay',$(window.parent.document)).html(selectors);
	}


}














//  quant-debug-ruller script



//////////////////////////
/**
 * Unifies event handling across browsers
 *
 * - Allows registering and unregistering of event handlers
 * - Injects event object and involved DOM element to listener
 *
 * @author Mark Rolich <mark.rolich@gmail.com>
 */
var Event = function () {
	"use strict";
	this.attach = function (evtName, element, listener, capture) {
		var evt         = '',
			useCapture  = (capture === undefined) ? true : capture,
			handler     = null;

		if (window.addEventListener === undefined) {
			evt = 'on' + evtName;
			handler = function (evt, listener) {
				element.attachEvent(evt, listener);
				return listener;
			};
		} else {
			evt = evtName;
			handler = function (evt, listener, useCapture) {
				element.addEventListener(evt, listener, useCapture);
				return listener;
			};
		}

		return handler.apply(element, [evt, function (ev) {
			var e   = ev || event,
				src = e.srcElement || e.target;

			listener(e, src);
		}, useCapture]);
	};

	this.detach = function (evtName, element, listener, capture) {
		var evt         = '',
			useCapture  = (capture === undefined) ? true : capture;

		if (window.removeEventListener === undefined) {
			evt = 'on' + evtName;
			element.detachEvent(evt, listener);
		} else {
			evt = evtName;
			element.removeEventListener(evt, listener, useCapture);
		}
	};

	this.stop = function (evt) {
		evt.cancelBubble = true;

		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
	};

	this.prevent = function (evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
	}}
/**
 * This Javascript package implements drag-n-drop functionality in a browser.
 *
 * Supports:
 * - Moving an element horizontally, vertically and in both directions
 * - Snap to grid functionality
 * - Limitation of moving distance
 * - Registering of user-defined function on start, move and stop
 *
 * Tested in the following browsers: IE 6.0, FF 17, Chrome 22, Safari 5.1.1
 *
 * Dragdrop.js requires Event.js package, which can be acquired at the following links:
 * Github - https://github.com/mark-rolich/Event.js
 * JS Classes - http://www.jsclasses.org/package/212-JavaScript-Handle-events-in-a-browser-independent-manner.html
 *
 * @author Mark Rolich <mark.rolich@gmail.com>
 */
var Dragdrop = function (evt) {
	"use strict";
	var elem        = null,
		started     = 0,
		self        = this,
		moveHandler = null,
		doc         = document.documentElement,
		body        = document.body,
		gWidth      = (document.body.scrollWidth > document.documentElement.clientWidth)
			? document.body.scrollWidth
			: document.documentElement.clientWidth,
		gHeight     = Math.max(body.scrollHeight, body.offsetHeight, doc.clientHeight, doc.scrollHeight, doc.offsetHeight),
		move        = function (e) {
			var xDiff   = e.clientX - elem.posX,
				yDiff   = e.clientY - elem.posY,
				x       = xDiff - (xDiff % elem.snap) + 'px',
				y       = yDiff - (yDiff % elem.snap) + 'px';

			if (started === 1) {
				switch (elem.mode) {
					case 0:
						elem.style.top = y;
						elem.style.left = x;
						break;
					case 1:
						elem.style.left = x;
						break;
					case 2:
						elem.style.top = y;
						break;
				}

				if (elem.mode !== 2) {
					if (xDiff <= elem.minX) {
						elem.style.left = elem.minX + 'px';
					}

					if (elem.offsetLeft + elem.offsetWidth >= elem.maxX) {
						elem.style.left = (elem.maxX - elem.offsetWidth) + 'px';
					}
				}

				if (elem.mode !== 1) {
					if (yDiff <= elem.minY) {
						elem.style.top = elem.minY + 'px';
					}

					if (elem.offsetTop + elem.offsetHeight >= elem.maxY) {
						elem.style.top = (elem.maxY - elem.offsetHeight) + 'px';
					}
				}

				elem.onMove(elem);
			}
		},
		start       = function (e, src) {
			if (src.className.indexOf('draggable-r') !== -1) {

				evt.prevent(e);

				moveHandler = evt.attach('mousemove', document, move, true);
				started = 1;

				elem = src;
				elem.posX = e.clientX - elem.offsetLeft;
				elem.posY = e.clientY - elem.offsetTop;

				if (elem.mode === undefined) {
					self.set(elem);
				}

				elem.onStart(elem);

				if (elem.setCapture) {
					elem.setCapture();
				}
			}
		},
		stop        = function () {
			if (started === 1) {
				started = 0;
				elem.onStop(elem);
				evt.detach('mousemove', document, moveHandler);

				if (elem.releaseCapture) {
					elem.releaseCapture();
				}
			}
		};

	evt.attach('mousedown', document, start, false);
	evt.attach('mouseup', document, stop, false);

	this.start = start;

	this.set = function (element, elemOptions) {
		var options = elemOptions       || {};

		elem = (typeof element === 'string')
			? document.getElementById(element)
			: element;

		elem.mode           = options.mode      || 0;
		elem.minX           = options.minX      || 0;
		elem.maxX           = options.maxX      || gWidth;
		elem.minY           = options.minY      || 0;
		elem.maxY           = options.maxY      || gHeight;
		elem.snap           = options.snap      || 1;
		elem.onStart        = options.onstart   || function () {};
		elem.onMove         = options.onmove    || function () {};
		elem.onStop         = options.onstop    || function () {};

		elem.style.left     = elem.offsetLeft + 'px';
		elem.style.top      = elem.offsetTop + 'px';

		elem.unselectable   = 'on';
	};
}
/**
 * This Javascript package creates Photoshop-like guides and rulers interface on a web page.
 * Guides are created by click-and-dragging corresponding horizontal or vertical ruler.
 * Guide positions could be saved in a local storage and opened later (on a page location basis)
 * It is possible to open/save created guides as grids
 * (Note: grids will be saved on a page location basis, so it's not possible to use the same grids in another browser window/tab).
 * Rulers can be unlocked, so that one of the rulers will scroll along the page and the other will be always visible.
 * Guides can be snapped to defined number of pixels.
 * Detailed info mode is available, which shows position and size of regions created by the guides.
 * Guides can be snapped to DOM elements (experimental)
 *
 * Following hotkeys are available:
 *
 * Toggle rulers - Ctrl+Alt+R
 * Toggle guides - Ctrl+Alt+G
 * Toggle rulers and guides - Ctrl+Alt+A
 * Clear all guides - Ctrl+Alt+D
 * Save grid dialog - Ctrl+Alt+S
 * Open grid dialog - Ctrl+Alt+P
 * Lock/unlock rulers - Ctrl+Alt+L
 * Open Snap to dialog - Ctrl+Alt+C
 * Toggle detailed info - Ctrl+Alt+I
 * Snap to DOM elements - Ctrl+Alt+E
 *
 * Look-and-feel can be adjusted using CSS.
 *
 * RulersGuides.js is available as a bookmarklet, please see bookmarklet.js file
 * provided with the package
 *
 * RulersGuides.js requires Event.js and Dragdrop.js packages, which can be acquired at the following links:
 *
 * Event.js
 *
 * Github - https://github.com/mark-rolich/Event.js
 * JS Classes - http://www.jsclasses.org/package/212-JavaScript-Handle-events-in-a-browser-independent-manner.html
 *
 * Dragdrop.js
 *
 * Github - https://github.com/mark-rolich/Dragdrop.js
 * JS Classes - http://www.jsclasses.org/package/215-JavaScript-Handle-drag-and-drop-events-of-page-elements.html
 *
 * @author Mark Rolich <mark.rolich@gmail.com>
 */
var RulersGuides = function (evt, dragdrop) {
	'use strict';

	var doc         = document.documentElement,
		body        = document.body,
		wrapper     = null,
		lockHandler = null,
		locked      = 1,
		hRuler      = null,
		vRuler      = null,
		menu        = null,
		dialogs     = [],
		snapDialog  = null,
		openGridDialog = null,
		xSnap       = 0,
		ySnap       = 0,
		mode        = 2,
		guides      = {},
		guidesCnt   = 0,
		gUid        = '',
		rulerStatus = 1,
		guideStatus = 1,
		hBound      = 0,
		vBound      = 0,
		gridList    = null,
		gridListLen = 0,
		menuBtn     = null,
		gInfoBlockWrapper = null,
		detailsStatus = 0,
		domElements = [],
		domDimensions = [],
		resizeTimer = null,
		snapDom     = 0,
		cssText     = 'html,body{margin:0;padding:0}.rg-overlay{position:absolute;top:0;left:0;overflow:hidden}.guide{position:absolute;top:0;left:0;z-index:9991;font-size:0}.guide.v{width:1px;height:7000px;border-right:solid 1px #00f;cursor:col-resize}.guide.h{width:3000px;height:1px;border-bottom:solid 1px #00f;cursor:row-resize}.info{width:50px;height:25px;line-height:25px;text-align:center;position:relative;font-size:13px;background-color:#eee;border:solid 1px #ccc;color:#000}.guide.v .info{left:2px}.guide.h .info{top:2px}.unselectable{-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ruler{background-color:#ccc;position:absolute;top:0;left:0;z-index:9990}.ruler .label{font:12px Arial;color:#000}.ruler,.ruler span{font-size:0}.ruler.h{width:3000px;left:-1px;padding-top:14px;border-bottom:solid 1px #000}.ruler.v{height:7000px;top:-1px;padding-left:16px;width:25px;border-right:solid 1px #000}.ruler.h span{border-left:solid 1px #999;height:9px;width:1px;vertical-align:bottom;display:inline-block;*display:inline;zoom:1}.ruler.v span{display:block;margin-left:auto;margin-right:0;border-top:solid 1px #999;width:9px;height:1px}.ruler.v span.major{border-top:solid 1px #000;width:13px}.ruler.v span.milestone{position:relative;border-top:solid 1px #000;width:17px}.ruler.v span.label{border:0;font-size:9px;position:absolute;text-align:center;width:9px}.ruler.h span.major{border-left:solid 1px #000;height:13px}.ruler.h span.milestone{position:relative;border-left:solid 1px #000;height:17px}.ruler.h span.label{border:0;font-size:9px;position:absolute;text-align:center;top:-14px;width:9px}.ruler.h .l10{left:-5px}.ruler.h .l100{left:-7px}.ruler.h .l1000{left:-10px}.ruler.v .l10,.ruler.v .l100,.ruler.v .l1000{top:-7px}.ruler.v .l10{left:-12px}.ruler.v .l100{left:-17px}.ruler.v .l1000{left:-23px}.menu-btn{position:fixed;left:3px;top:2px;line-height:9px;z-index:9998;width:20px;height:20px;background-color:red;opacity:.5;font-size:20px;text-align:left;color:#fff;font-weight:700;cursor:pointer;border-radius:2px}.rg-menu{position:fixed;top:22px;left:3px;padding:0;margin:0;list-style:0;display:none;font:13px Arial;z-index:9999;box-shadow:2px 2px 10px #ccc}.rg-menu li{text-align:left;border-bottom:solid 1px #999;padding:0}.rg-menu a{background-color:#777;display:block;padding:5px;text-decoration:none;color:#fff;line-height:18px}.rg-menu a:hover,.rg-menu a.selected{color:#fff;background-color:#3b94ec }.rg-menu a.disabled{color:#ccc}.rg-menu .desc{display:inline-block;width:170px}.dialog{position:fixed;background-color:#777;z-index:9999;color:#fff;font-size:13px;display:none;box-shadow:2px 2px 10px #ccc}.dialog button{border:0;color:#333;cursor:pointer;background-color:#eaeaea;background-image:linear-gradient(#fafafa,#eaeaea);background-repeat:repeat-x;border-radius:3px;text-shadow:0 1px 0 rgba(255,255,255,.9)}.dialog input,.dialog select,.dialog button{font-size:13px;margin:3px;padding:3px}.dialog .title-bar{padding:5px;background-color:#aaa;font-weight:700}.dialog .wrapper{padding:10px}.open-dialog select,.open-dialog button{float:left;display:block}.open-dialog .ok-btn,.open-dialog .cancel-btn{margin:10px 3px}.open-dialog .ok-btn{clear:both}.snap-dialog label{font-weight:700;padding:3px}.snap-dialog .ok-btn{margin-left:18px}.snap-dialog .ok-btn,.snap-dialog .cancel-btn{margin-top:10px}.snap-dialog .rg-y-label{margin-left:10px}#rg-x-snap,#rg-y-snap{width:50px}.info-block-wrapper{position:absolute;z-index:9989}.info-block{position:absolute;text-align:left}.info-block.even{background:0 0;background-color:rgba(0,0,255,.2);-ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#330000FF, endColorstr=#330000FF);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#330000FF, endColorstr=#330000FF);zoom:1}.info-block.odd{background:0 0;background-color:rgba(255,0,0,.2);-ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#33FF0000, endColorstr=#33FF0000);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#33FF0000, endColorstr=#33FF0000);zoom:1}.info-block-txt{padding:5px;display:inline-block;vertical-align:top;background-color:#777;color:#fff;font-size:13px;*display:inline;zoom:1}',
		Ruler       = function (type, size) {
			var ruler       = document.createElement('div'),
				i           = 0,
				span        = document.createElement('span'),
				label       = null,
				labelTxt    = null,
				spanFrag    = document.createDocumentFragment(),
				cnt         = Math.floor(size / 2);

			ruler.className = 'ruler ' + type + ' unselectable';

			for (i; i < cnt; i = i + 1) {
				span = span.cloneNode(false);

				if (i % 25 === 0) {
					span.className = 'milestone';

					if (i > 0) {
						label = span.cloneNode(false);
						label.className = 'label';

						if (i < 50) {
							label.className += ' l10';
						} else if (i >= 50 && i < 500) {
							label.className += ' l100';
						} else if (i >= 500) {
							label.className += ' l1000';
						}

						labelTxt = document.createTextNode(i * 2);
						label.appendChild(labelTxt);
						span.appendChild(label);
					}

					span.className = 'milestone';
				} else if (i % 5 === 0) {
					span.className = 'major';
				} else {
					span.className = '';
					span.removeAttribute('class');
				}
				if(span.className == 'milestone')
					spanFrag.appendChild(span);
			}

			ruler.appendChild(spanFrag);

			return ruler;
		},
		getWindowSize = function () {
			var w = Math.max(
				body.scrollWidth,
				body.offsetWidth,
				doc.clientWidth,
				doc.scrollWidth,
				doc.offsetWidth
				),
				h = Math.max(
					body.scrollHeight,
					body.offsetHeight,
					doc.clientHeight,
					doc.scrollHeight,
					doc.offsetHeight
				);

			return [w, h];
		},
		getScrollPos = function () {
			var t = Math.max(doc.scrollTop, body.scrollTop),
				l = Math.max(doc.scrollLeft, body.scrollLeft);

			return [t, l];
		},
		getScrollSize = function () {
			var w = Math.max(doc.scrollWidth, body.scrollWidth),
				h = Math.max(doc.scrollHeight, body.scrollHeight);

			return [w, h];
		},
		closeAllDialogs = function () {
			var i = 0;

			for (i; i < dialogs.length; i = i + 1) {
				dialogs[i].close();
			}
		},
		removeInboundGuide = function (guide, gUid) {
			var scrollPos = getScrollPos();

			if (
				rulerStatus === 1 && guideStatus === 1 && (
					(guide.className === 'guide h draggable-r' && guide.offsetTop < hBound + scrollPos[0]) ||
					(guide.className === 'guide v draggable-r' && guide.offsetLeft < vBound + scrollPos[1])
				)
			) {
				wrapper.removeChild(guide);
				delete guides[gUid];
				guidesCnt = guidesCnt - 1;
			}
		},
		removeInboundGuides = function () {
			var i;

			for (i in guides) {
				if (guides.hasOwnProperty(i)) {
					removeInboundGuide(guides[i], i);
				}
			}
		},
		toggleGuides = function () {
			var i;

			guideStatus = 1 - guideStatus;

			for (i in guides) {
				if (guides.hasOwnProperty(i)) {
					guides[i].style.display = (guideStatus === 1)
						? 'block'
						: 'none';
				}
			}

			if (guideStatus === 1) {
				wrapper.style.display = 'block';
			}
		},
		toggleRulers = function () {
			rulerStatus = 1 - rulerStatus;

			if (rulerStatus === 1) {
				vRuler.style.display = 'block';
				hRuler.style.display = 'block';
				wrapper.style.display = 'block';
				removeInboundGuides();
			} else {
				vRuler.style.display = 'none';
				hRuler.style.display = 'none';
			}
		},
		removeGrid = function (gridName) {
			if (gridList[gridName] !== undefined) {
				delete gridList[gridName];
				window.localStorage.setItem('RulersGuides', JSON.stringify(gridList));
				gridListLen = gridListLen - 1;
			}
		},
		deleteGuides = function () {
			var i;

			if (guidesCnt > 0) {
				for (i in guides) {
					if (guides.hasOwnProperty(i)) {
						wrapper.removeChild(guides[i]);
						delete guides[i];
						guidesCnt = guidesCnt - 1;
					}
				}

				gInfoBlockWrapper.style.display = 'none';
			}
		},
		renderGrid = function (gridName) {
			if (gridList[gridName] !== undefined) {
				var grid        = gridList[gridName],
					guideId     = null,
					guideElem   = null;

				deleteGuides();

				for (guideId in grid) {
					if (grid.hasOwnProperty(guideId)) {
						guideElem = document.createElement('div');
						guideElem.id = guideId;
						guideElem.className = grid[guideId].cssClass;
						guideElem.style.cssText = grid[guideId].style;

						wrapper.appendChild(guideElem);

						guides[guideId] = guideElem;

						guidesCnt = guidesCnt + 1;
					}
				}
			}
		},
		OpenGridDialog = function () {
			var dialog = null,
				self = this,
				select = null,
				renderSelect = function (insertOrUpdate) {
					var gridName,
						options = '',
						i;

					gridListLen = 0;

					if (window.localStorage) {
						gridList = JSON.parse(window.localStorage.getItem('RulersGuides'));

						for (i in gridList) {
							if (gridList.hasOwnProperty(i)) {
								gridListLen = gridListLen + 1;
							}
						}
					}

					if (insertOrUpdate === 0) {
						select = document.createElement('select');
						select.id = 'grid-list';
					}

					if (gridListLen > 0) {
						for (gridName in gridList) {
							if (gridList.hasOwnProperty(gridName)) {
								options += '<option>' + gridName + '</option>';
							}
						}

						select.innerHTML = options;
					}

					return select;
				};

			this.render = function () {
				if (dialog === null) {
					dialog = document.createElement('div');
					select = renderSelect(0);

					var text = document.createTextNode(''),
						titleBar = dialog.cloneNode(false),
						dialogWrapper = dialog.cloneNode(false),
						okBtn = document.createElement('button'),
						cancelBtn = okBtn.cloneNode(false),
						delBtn = okBtn.cloneNode(false),
						titleBarTxt = text.cloneNode(false),
						okBtnTxt = text.cloneNode(false),
						cancelBtnTxt = text.cloneNode(false),
						delBtnTxt = text.cloneNode(false);

					titleBarTxt.nodeValue = 'Open grid';
					okBtnTxt.nodeValue = 'OK';
					cancelBtnTxt.nodeValue = 'Cancel';
					delBtnTxt.nodeValue = 'Delete';

					dialog.className = 'dialog open-dialog';
					titleBar.className = 'title-bar';
					dialogWrapper.className = 'wrapper';

					okBtn.className = 'ok-btn';
					cancelBtn.className = 'cancel-btn';
					delBtn.className = 'del-btn';

					titleBar.appendChild(titleBarTxt);
					okBtn.appendChild(okBtnTxt);
					cancelBtn.appendChild(cancelBtnTxt);
					delBtn.appendChild(delBtnTxt);

					dialogWrapper.appendChild(select);
					dialogWrapper.appendChild(delBtn);
					dialogWrapper.appendChild(okBtn);
					dialogWrapper.appendChild(cancelBtn);

					dialog.appendChild(titleBar);
					dialog.appendChild(dialogWrapper);

					body.appendChild(dialog);

					evt.attach('click', delBtn, function () {
						if (window.confirm('Are you sure ?')) {
							if (select.options.length > 0) {
								removeGrid(select.options[select.selectedIndex].value);

								select.removeChild(
									select.options[select.selectedIndex]
								);
							}

							if (select.options.length === 0) {
								self.close();
							}
						}
					});

					evt.attach('click', okBtn, function () {
						renderGrid(select.value);
						self.close();
					});

					evt.attach('click', cancelBtn, function () {
						self.close();
					});
				}
			};

			this.render();

			this.open = function () {
				closeAllDialogs();

				renderSelect(1);

				if (gridListLen > 0) {
					dialog.style.display = 'block';
					dialog.style.left = ((doc.clientWidth - dialog.clientWidth) / 2) + 'px';
					dialog.style.top = ((doc.clientHeight - dialog.clientHeight) / 2) + 'px';
				}
			};

			this.close = function () {
				dialog.style.display = 'none';
			};
		},
		toggleRulersLock = function () {
			if (locked === 0) {
				if (lockHandler !== null) {
					evt.detach('scroll', window, lockHandler);
				}
			} else {
				lockHandler = evt.attach('scroll', window, function () {
					var pos = getScrollPos(),
						size = getScrollSize();

					hRuler.style.top = pos[0] + 'px';
					wrapper.style.height = size[1] + 'px';

					vRuler.style.left = pos[1] + 'px';
					wrapper.style.width = size[0] + 'px';
				});
			}

			locked = 1 - locked;
		},
		saveGrid = function () {
			var data = {},
				gridData = {},
				i,
				gridName = '';

			while (gridName === '' && guidesCnt > 0) {
				gridName = window.prompt('Save grid as');

				if (gridName !== '' && gridName !== false && gridName !== null && window.localStorage) {
					for (i in guides) {
						if (guides.hasOwnProperty(i)) {
							gridData[i] = {
								'cssClass' : guides[i].className,
								'style' : guides[i].style.cssText
							};
						}
					}

					if (window.localStorage.getItem('RulersGuides') !== null) {
						data = JSON.parse(window.localStorage.getItem('RulersGuides'));
					}

					data[gridName] = gridData;
					window.localStorage.setItem('RulersGuides', JSON.stringify(data));

					gridListLen = gridListLen + 1;
				}
			}
		},
		showDetailedInfo = function () {
			var i,
				j = 0,
				hGuides = [],
				vGuides = [],
				scrollSize = getScrollSize(),
				infoBlockWrapper = document.createElement('div'),
				infoFrag = document.createDocumentFragment(),
				infoBlock = infoBlockWrapper.cloneNode(false),
				infoBlockTxt = infoBlockWrapper.cloneNode(false),
				infoData1 = document.createTextNode(''),
				infoData2 = infoData1.cloneNode(false),
				text = '',
				br = document.createElement('br');

			for (i in guides) {
				if (guides.hasOwnProperty(i)) {
					if (guides[i].type === 'h') {
						hGuides.push(guides[i].y);
					} else {
						vGuides.push(guides[i].x);
					}
				}
			}

			vGuides.unshift(0);
			vGuides.push(scrollSize[0]);

			hGuides.unshift(0);
			hGuides.push(scrollSize[1]);

			vGuides = vGuides.sort(function (a, b) {
				return a - b;
			});

			hGuides = hGuides.sort(function (a, b) {
				return a - b;
			});

			for (i = 0; i < hGuides.length - 1; i = i + 1) {
				j = 0;

				for (j; j < vGuides.length - 1; j = j + 1) {
					infoBlock = infoBlock.cloneNode(false);
					infoBlockTxt = infoBlockTxt.cloneNode(false);
					infoData1 = infoData1.cloneNode(false);
					infoData2 = infoData2.cloneNode(false);
					br = br.cloneNode();

					infoBlockWrapper.className = 'info-block-wrapper';
					infoBlock.className = 'info-block';
					infoBlockTxt.className = 'info-block-txt';

					infoBlock.className += (
						(i % 2 !== 0 && j % 2 !== 0) ||
						(i % 2 === 0 && j % 2 === 0)
					)
						? ' even'
						: ' odd';

					infoBlock.style.top = hGuides[i] + 'px';
					infoBlock.style.left = vGuides[j] + 'px';
					infoBlock.style.width = (vGuides[j + 1] - vGuides[j]) + 'px';
					infoBlock.style.height = (hGuides[i + 1] - hGuides[i]) + 'px';

					text = (vGuides[j + 1] - vGuides[j]) + ' x ' + (hGuides[i + 1] - hGuides[i]);

					infoData1.nodeValue = text;

					text = hGuides[i] + ' : ' + vGuides[j];

					infoData2.nodeValue = text;

					infoBlockTxt.appendChild(infoData1);
					infoBlockTxt.appendChild(br);
					infoBlockTxt.appendChild(infoData2);

					infoBlock.appendChild(infoBlockTxt);

					infoBlockTxt.style.marginTop = (i === 0) ? '31px' : '0';
					infoBlockTxt.style.marginLeft = (j === 0) ? '42px' : '0';

					infoFrag.appendChild(infoBlock);
				}
			}

			infoBlockWrapper.appendChild(infoFrag);

			if (detailsStatus === 1) {
				wrapper.replaceChild(infoBlockWrapper, gInfoBlockWrapper);
				gInfoBlockWrapper = infoBlockWrapper;
			} else {
				gInfoBlockWrapper.style.display = 'none';
			}
		},
		calculateDomDimensions = function () {
			var x = [],
				y = [],
				dm = [],
				i = 0,
				len = domElements.length,
				findDimensions = function (elem) {
					var t = 0,
						l = 0,
						w = elem.offsetWidth,
						h = elem.offsetHeight;

					while (elem) {
						l += (elem.offsetLeft - elem.scrollLeft + elem.clientLeft);
						t += (elem.offsetTop - elem.scrollTop + elem.clientTop);
						elem = elem.offsetParent;
					}

					return [l, t, l + w, t + h];
				},
				getUnique = function (arr) {
					var u = {}, a = [], idx = 0, arrLen = arr.length;

					for (idx; idx < arrLen; idx = idx + 1) {
						if (u.hasOwnProperty(arr[idx]) === false) {
							a.push(arr[idx]);
							u[arr[idx]] = 1;
						}
					}

					return a;
				};

			for (i; i < len; i = i + 1) {
				dm = findDimensions(domElements[i]);

				x.push(dm[0]);
				x.push(dm[2]);

				y.push(dm[1]);
				y.push(dm[3]);
			}

			x = getUnique(x).sort(function (a, b) {
				return a - b;
			});

			y = getUnique(y).sort(function (a, b) {
				return a - b;
			});

			return [x, y];
		},
		Menu = function () {
			var menuList = null,
				status   = 0,
				toggles = {},
				menuItemsList  = [{
					'text': 'Hide rulers',
					'hotkey': 'Ctrl + Alt + R',
					'alias': 'rulers'
				}, {
					'text': 'Hide guides',
					'hotkey': 'Ctrl + Alt + G',
					'alias': 'guides'
				}, {
					'text': 'Hide all',
					'hotkey': 'Ctrl + Alt + A',
					'alias': 'all'
				}, {
					'text': 'Unlock rulers',
					'hotkey': 'Ctrl + Alt + L',
					'alias': 'lock'
				}, {
					'text': 'Clear all guides',
					'hotkey': 'Ctrl + Alt + D',
					'alias': 'clear'
				}, {
					'text': 'Open grid',
					'hotkey': 'Ctrl + Alt + O',
					'alias': 'open'
				}, {
					'text': 'Save grid',
					'hotkey': 'Ctrl + Alt + G',
					'alias': 'save'
				}, {
					'text': 'Snap to',
					'hotkey': 'Ctrl + Alt + C',
					'alias': 'snap'
				}, {
					'text': 'Show detailed info',
					'hotkey': 'Ctrl + Alt + I',
					'alias': 'details'
				}, {
					'text': 'Snap to DOM',
					'hotkey': 'Ctrl + Alt + E',
					'alias': 'snapdom'
				}],
				i = 0;

			this.render = function () {
				menuBtn = document.createElement('div');
				menuBtn.className = 'menu-btn unselectable';
				menuBtn.appendChild(document.createTextNode('\u250C'));

				menuList = document.createElement('ul');
				menuList.className = 'rg-menu';

				var menuItems = document.createDocumentFragment(),
					li = document.createElement('li'),
					liLink = document.createElement('a'),
					liDesc = document.createElement('span'),
					liHotKey = liDesc.cloneNode(false),
					liDescTxt = document.createTextNode(''),
					liHotKeyTxt = liDescTxt.cloneNode(false);

				liLink.href = 'javascript:';
				liDesc.className = 'desc';
				liHotKey.className = 'hotkey';

				for (i; i < menuItemsList.length; i = i + 1) {
					li = li.cloneNode(false);
					liLink = liLink.cloneNode(false);
					liDesc = liDesc.cloneNode(false);
					liHotKey = liHotKey.cloneNode(false);
					liDescTxt = liDescTxt.cloneNode(false);
					liHotKeyTxt = liHotKeyTxt.cloneNode(false);

					liDescTxt.nodeValue = menuItemsList[i].text;
					liHotKeyTxt.nodeValue = menuItemsList[i].hotkey;

					liDesc.appendChild(liDescTxt);
					liHotKey.appendChild(liHotKeyTxt);

					liLink.appendChild(liDesc);
					liLink.appendChild(liHotKey);

					li.appendChild(liLink);

					menuItems.appendChild(li);

					toggles[menuItemsList[i].alias] = {
						obj: liLink,
						txt: liDescTxt
					};
				}

				evt.attach('mousedown', toggles.rulers.obj, function () {
					toggleRulers();
				});

				evt.attach('mousedown', toggles.guides.obj, function () {
					toggleGuides();
				});

				evt.attach('mousedown', toggles.all.obj, function () {
					if (rulerStatus === 1 || guideStatus === 1) {
						rulerStatus = guideStatus = 1;
						wrapper.style.display = 'none';
					} else {
						rulerStatus = guideStatus = 0;
						wrapper.style.display = 'block';
					}

					toggleRulers();
					toggleGuides();
				});

				evt.attach('mousedown', toggles.lock.obj, function () {
					toggleRulersLock();
				});

				evt.attach('mousedown', toggles.clear.obj, function () {
					deleteGuides();
				});

				evt.attach('mousedown', toggles.open.obj, function () {
					openGridDialog.open();
				});

				evt.attach('mousedown', toggles.save.obj, function () {
					saveGrid();
				});

				evt.attach('mousedown', toggles.snap.obj, function () {
					snapDialog.open();
				});

				evt.attach('mousedown', toggles.details.obj, function () {
					detailsStatus = 1 - detailsStatus;
					showDetailedInfo();
				});

				evt.attach('mousedown', toggles.snapdom.obj, function () {
					snapDom = 1 - snapDom;

					if (snapDom === 1) {
						domDimensions = calculateDomDimensions();
					}
				});

				menuList.appendChild(menuItems);

				body.appendChild(menuBtn);
				body.appendChild(menuList);

				evt.attach('mousedown', menuBtn, function () {
					toggles.rulers.txt.nodeValue = (rulerStatus === 1)
						? 'Hide rulers'
						: 'Show rulers';

					if (guidesCnt > 0) {
						toggles.guides.obj.className = '';
						toggles.clear.obj.className = '';
						toggles.save.obj.className = '';

						toggles.guides.txt.nodeValue = (guideStatus === 1)
							? 'Hide guides'
							: 'Show guides';
					} else {
						toggles.guides.obj.className = 'disabled';
						toggles.clear.obj.className = 'disabled';
						toggles.save.obj.className = 'disabled';
					}

					toggles.all.txt.nodeValue = (rulerStatus === 1 || guideStatus === 1)
						? 'Hide all'
						: 'Show all';

					toggles.lock.txt.nodeValue = (locked === 0) ? 'Lock rulers' : 'Unlock rulers';
					toggles.details.txt.nodeValue = (detailsStatus === 0) ? 'Show detailed info' : 'Hide detailed info';
					toggles.snapdom.txt.nodeValue = (snapDom === 0) ? 'Snap to DOM' : 'Turn off snap to DOM';
					toggles.open.obj.className = (gridListLen > 0) ? '' : 'disabled';

					menuList.style.display = (status === 0) ? 'inline-block' : 'none';

					status = 1 - status;
				});
			};

			this.render();

			this.close = function () {
				if (menuList !== null) {
					menuList.style.display = 'none';
					status = 0;
				}
			};
		},
		SnapDialog = function () {
			var dialog = null,
				xInput = null,
				yInput = null,
				self   = this;

			this.render = function () {
				if (dialog === null) {
					dialog = document.createElement('div');
					xInput = document.createElement('input');
					yInput = xInput.cloneNode(false);

					var text = document.createTextNode(''),
						okBtn = document.createElement('button'),
						xLabel = document.createElement('label'),
						titleBar = dialog.cloneNode(false),
						dialogWrapper = dialog.cloneNode(false),
						inputWrapper = dialog.cloneNode(false),
						btnWrapper = dialog.cloneNode(false),
						resetBtn = okBtn.cloneNode(false),
						cancelBtn = okBtn.cloneNode(false),
						yLabel = xLabel.cloneNode(false),
						titleBarTxt = text.cloneNode(false),
						xLabelTxt = text.cloneNode(false),
						yLabelTxt = text.cloneNode(false),
						okBtnTxt = text.cloneNode(false),
						resetBtnTxt = text.cloneNode(false),
						cancelBtnTxt = text.cloneNode(false);

					titleBarTxt.nodeValue = 'Snap guides to';
					xLabelTxt.nodeValue = 'X';
					yLabelTxt.nodeValue = 'Y';
					okBtnTxt.nodeValue = 'OK';
					resetBtnTxt.nodeValue = 'Reset';
					cancelBtnTxt.nodeValue = 'Cancel';

					dialog.className = 'dialog snap-dialog';
					titleBar.className = 'title-bar';
					dialogWrapper.className = 'wrapper';

					xLabel.className = 'rg-x-label';
					xLabel.setAttribute('for', 'rg-x-snap');

					yLabel.className = 'rg-y-label';
					yLabel.setAttribute('for', 'rg-y-snap');

					xInput.setAttribute('type', 'number');
					xInput.value = '100';
					xInput.id = 'rg-x-snap';

					xInput.setAttribute('type', 'number');
					yInput.value = '100';
					yInput.id = 'rg-y-snap';

					okBtn.className = 'ok-btn';
					resetBtn.className = 'reset-btn';
					cancelBtn.className = 'cancel-btn';

					titleBar.appendChild(titleBarTxt);

					xLabel.appendChild(xLabelTxt);
					yLabel.appendChild(yLabelTxt);
					okBtn.appendChild(okBtnTxt);
					resetBtn.appendChild(resetBtnTxt);
					cancelBtn.appendChild(cancelBtnTxt);

					inputWrapper.appendChild(xLabel);
					inputWrapper.appendChild(xInput);
					inputWrapper.appendChild(yLabel);
					inputWrapper.appendChild(yInput);
					inputWrapper.appendChild(resetBtn);

					btnWrapper.appendChild(okBtn);
					btnWrapper.appendChild(cancelBtn);

					dialogWrapper.appendChild(inputWrapper);
					dialogWrapper.appendChild(btnWrapper);

					dialog.appendChild(titleBar);
					dialog.appendChild(dialogWrapper);

					body.appendChild(dialog);

					evt.attach('mousedown', okBtn, function () {
						xSnap = parseInt(xInput.value, 10);
						ySnap = parseInt(yInput.value, 10);

						self.close();
					});

					evt.attach('mousedown', resetBtn, function () {
						xSnap = 0;
						ySnap = 0;
						self.close();
					});

					evt.attach('mousedown', cancelBtn, function () {
						self.close();
					});
				}
			};

			this.render();

			this.open = function () {
				closeAllDialogs();

				dialog.style.display = 'block';
				dialog.style.left = ((doc.clientWidth - dialog.clientWidth) / 2) + 'px';
				dialog.style.top = ((doc.clientHeight - dialog.clientHeight) / 2) + 'px';
			};

			this.close = function () {
				dialog.style.display = 'none';
			};
		},
		prepare     = function () {
			var style = document.createElement('style'),
				size = getWindowSize(),
				elements = document.getElementsByTagName('*'),
				len = elements.length,
				i = 0;

			for (i; i < len; i = i + 1) {
				domElements.push(elements[i]);
			}

			style.setAttribute('type', 'text/css');

			if (style.styleSheet) {
				style.styleSheet.cssText = cssText;
			} else {
				style.appendChild(document.createTextNode(cssText));
			}

			body.appendChild(style);

			setTimeout(function () {
				hRuler = new Ruler('h', 3000);
				vRuler = new Ruler('v', 7000);

				wrapper = document.createElement('div');
				gInfoBlockWrapper = wrapper.cloneNode(false);

				wrapper.className = 'rg-overlay';
				gInfoBlockWrapper.className = 'info-block-wrapper';

				wrapper.style.width = (size[0]) + 'px';
				wrapper.style.height = (size[1]) + 'px';

				wrapper.appendChild(hRuler);
				wrapper.appendChild(vRuler);
				wrapper.appendChild(gInfoBlockWrapper);

				body.appendChild(wrapper);

				domDimensions = calculateDomDimensions();

				menu = new Menu();
				snapDialog = new SnapDialog();
				openGridDialog = new OpenGridDialog();

				dialogs = [snapDialog, openGridDialog];
			}, 10);
		};

	prepare();

	this.status = 1;

	this.disable = function () {
		if (vRuler !== null) {
			deleteGuides();

			vRuler.style.display = 'none';
			hRuler.style.display = 'none';
			wrapper.style.display = 'none';
			menuBtn.style.display = 'none';
		}

		rulerStatus = 0;
		this.status = 0;
	};

	this.enable = function () {
		if (vRuler !== null) {
			vRuler.style.display = 'block';
			hRuler.style.display = 'block';
			wrapper.style.display = 'block';
			menuBtn.style.display = 'block';
		}

		rulerStatus = 1;
		this.status = 1;
	};

	evt.attach('mousedown', document, function (e, src) {
		var x               = e.clientX,
			y               = e.clientY,
			guide           = null,
			guideInfo       = null,
			guideInfoText   = null,
			scrollPos       = getScrollPos(),
			snap            = 0;

		// if (src.classNa	me.indexOf('menu-btn') === -1) {
		// 	menu.close();
		// }

		if (vBound === 0) {
			vBound = vRuler.offsetWidth;
			hBound = hRuler.offsetHeight;
		}

		if (
			(
				(x > vBound && y < hBound) ||
				(y > hBound && x < vBound)
			) && rulerStatus === 1
		) {
			guide = document.createElement('div');
			guideInfo = guide.cloneNode(false);
			guideInfoText = document.createTextNode('');

			gUid = 'guide-' + guidesCnt;

			guideInfo.className = 'info';

			guideInfo.appendChild(guideInfoText);
			guide.appendChild(guideInfo);

			if (x > vBound && y < hBound) {
				guide.className = 'guide h draggable-r';
				guide.style.top = (e.clientY + scrollPos[0]) + 'px';
				guideInfo.style.left = (x + scrollPos[1] + 10) + 'px';
				guide.type = 'h';
				snap = ySnap;
				mode = 2;
			} else if (y > hBound && x < vBound) {
				guide.className = 'guide v draggable-r';
				guide.style.left = (x + scrollPos[1]) + 'px';
				guideInfo.style.top = ((y + scrollPos[0]) - 35) + 'px';
				guide.type = 'v';
				snap = xSnap;
				mode = 1;
			}

			guide.id = gUid;
			guide.info = guideInfo;
			guide.text = guideInfoText;
			guide.x    = 0;
			guide.y    = 0;

			guides[gUid] = guide;

			wrapper.appendChild(guide);

			dragdrop.set(guide, {
				mode: mode,
				onstart: function (elem) {
					var text = (elem.mode === 1)
						? parseInt(elem.style.left, 10) + 2
						: parseInt(elem.style.top, 10) + 2;

					elem.text.nodeValue = text + 'px';

					if (elem.over !== undefined) {
						evt.detach('mouseover', elem, elem.over);
						evt.detach('mouseout', elem, elem.out);
					}
				},
				onmove: function (elem) {
					var text    = '',
						pos     = 0,
						dims    = [],
						len     = 0,
						i       = 0;

					pos = (elem.mode === 1) ? elem.style.left : elem.style.top;
					pos = parseInt(pos, 10);

					if (snapDom === 1) {
						dims = domDimensions[elem.mode - 1];

						for (i, len = dims.length; i < len; i = i + 1) {
							if (pos <= dims[i]) {
								pos = dims[i];
								break;
							}
						}
					}

					text = pos + 'px';

					if (elem.mode === 1) {
						elem.style.left = (pos - 2) + 'px';
						elem.x = pos;
					} else {
						elem.style.top = (pos - 2) + 'px';
						elem.y = pos;
					}

					elem.text.nodeValue = text;
				},
				onstop: function (elem) {
					elem.over = evt.attach('mouseover', elem, function (e, src) {
						if (src.className === 'guide v draggable-r') {
							elem.info.style.top = ((e.clientY + scrollPos[0]) - 35) + 'px';
						} else if (src.className === 'guide h draggable-r') {
							elem.info.style.left = (e.clientX + scrollPos[1] + 10) + 'px';
						}

						elem.info.style.display = 'block';
					});

					elem.out = evt.attach('mouseout', elem, function () {
						elem.info.style.display = 'none';
					});
				},
				snap: snap
			});

			dragdrop.start(e, guide);

			guidesCnt = guidesCnt + 1;
		}
	});

	evt.attach('mouseup', document, function (e, src) {
		removeInboundGuide(src, src.id);

		if (detailsStatus === 1) {
			showDetailedInfo();
		}
	});

	evt.attach('keyup', document, function (e) {
		if (e.ctrlKey === true && e.altKey === true) {
			switch (e.keyCode) {
				case 83:
					saveGrid();
					break;
				case 82:
					toggleRulers();
					break;
				case 79:
					openGridDialog.open();
					break;
				case 76:
					toggleRulersLock();
					break;
				case 73:
					detailsStatus = 1 - detailsStatus;
					showDetailedInfo();
					break;
				case 71:
					toggleGuides();
					break;
				case 69:
					snapDom = 1 - snapDom;

					if (snapDom === 1) {
						domDimensions = calculateDomDimensions();
					}
					break;
				case 68:
					deleteGuides();
					break;
				case 67:
					snapDialog.open();
					break;
				case 65:
					if (rulerStatus === 1 || guideStatus === 1) {
						rulerStatus = guideStatus = 1;
						wrapper.style.display = 'none';
					} else {
						rulerStatus = guideStatus = 0;
						wrapper.style.display = 'block';
					}

					toggleRulers();
					toggleGuides();

					break;
			}
		}
	});

	evt.attach('resize', window, function () {
		var size = getWindowSize();

		wrapper.style.width = size[0] + 'px';
		wrapper.style.height = size[1] + 'px';

		if (resizeTimer !== null) {
			window.clearTimeout(resizeTimer);
		}

		if (snapDom === 1) {
			resizeTimer = window.setTimeout(function () {
				domDimensions = calculateDomDimensions();
			}, 100);
		}
	});
}
var evt         = new Event(),
	dragdrop    = new Dragdrop(evt),
	rg          = new RulersGuides(evt, dragdrop);


});