WebFont.load({
	google: {
		families: ['Pacifico', 'Droid Serif']
	},
	context: frames['viewport']
});

var loadProjectPath = function (path, placeTo) {

	$.ajax({
		url: "http://localhost:8181?action=loadProjectPath&path=" + path

	}).done(function (data) {

		var pthJson = JSON.parse(data);
		ql(pthJson)
		for (var i in pthJson.children) {

			//ql(pthJson.children[i].name);s
			//if(pthJson.children[i].type == 'directory' || pthJson.children[i].name != '_templates' )
			$(placeTo + ' ul').append('<li class="fs_list" data-path="' + pthJson.children[i].path + '">' + pthJson.children[i].name + '</li>')

			if (path == 'dev/ELEMENTS' || path == 'Projects/' + $("span.projectTitle").text() + '/dev/qContent/ELEMENTS') {

				ql(pthJson.children[i].name);

				if (pthJson.children[i].type == 'directory' && pthJson.children[i].name != '_templates') {

					var parent = pthJson.children[i];

					for (var elem in parent.children) {
						$(placeTo + ' ul').append('<li class="fs_list fs_list--child" data-path="' + parent.children[elem].path + '">' + parent.children[elem].name + '</li>')
					}
				}
			}
		}
		$('.fs').accordion({
			active: 4,
			header: "h3",
			collapsible: false
		});

	})


}
function editorsListner() {


	editor.on('change', function (e) {
		ql(scssChangeCounter, 'CHNGEINCOUNT');
		scssChangeCounter++;
		if (scssChangeCounter == 4) {
			scssChanged = true;
			ql('SCSS CHANGED');
			$('#editorScss').addClass('edited');
		}


	})
	editorPug.on('change', function (e) {
		pugChangeCounter++;
		if (pugChangeCounter == 4) {
			ql('PUG CHANGED');
			pugChanged = true;
			$('#editorPug').addClass('edited');
		}


	})
	editorJs.on('change', function (e) {
		JSChangeCounter++;
		if (JSChangeCounter == 4) {
			jsChanged = true;
			$('#editorJs').addClass('edited');

		}

	})


}

var scssChangeCounter = -1;
var pugChangeCounter = -1;
var JSChangeCounter = -1;//  quant-debug script
var pugChanged = false;
var scssChanged = false;
var jsChanged = false;

function addToBufer(content) {
	let tmp = document.createElement('INPUT'), // Создаём новый текстовой input
		focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)
	tmp.value = content;

	// Временному input вставляем текст для копирования
	document.body.appendChild(tmp); // Вставляем input в DOM
	tmp.select(); // Выделяем весь текст в input
	document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
	document.body.removeChild(tmp); // Удаляем временный input
	focus.focus();

}

function showQcontent(pos) {
	if (pos) {
		$('*[data-qcontent^=level]', window.frames['index'].contentDocument).css({
			outline: 'dashed 2px #00e7ff'
		});
		$('*[data-qcontent^=module]', window.frames['index'].contentDocument).css({
			outline: 'dashed 2px tomato'
		});
		$('*[data-qcontent^=element]', window.frames['index'].contentDocument).css({
			outline: 'dashed 2px #fffd78'
		});
		$('*[data-qcontent^=layout]', window.frames['index'].contentDocument).css({
			outline: 'dashed 2px #000'
		});
	} else {
		$('*[data-qcontent]', window.frames['index'].contentDocument).css({
			outline: 'none'
		});
	}

}
$('#layers').on('mousedown', function () {
	if ($(this).hasClass('on')) {
		showQcontent(false);
		$(this).removeClass('on')
	} else {
		showQcontent(true);
		$(this).addClass('on')
	}


})


function loadToQuant() {


	ql('LOAD  TRIGGERED');
	$('*', window.frames['index'].contentDocument).on('mousedown', function (e) {

		//editorsListner();
		ql(JSChangeCounter, 'qwweqrwqrwqr!!!');
		e.stopPropagation();
		$('#contentNavigator__type input,#contentNavigator__stype input,#contentNavigator__name input').val('');


		var content1 = $(this).closest('*[data-qcontent]').data('qcontent');
		ql(content1, 'QC');

		var _this = this;
		if (content1) {
			content1 = content1.split('__');

			if (content1.length == 2) {
				if (content1[0] == 'layout') {
					if (content1[1] == 'layout') {
						$('#contentNavigator__type input').val(content1[0]);
						$('#contentNavigator__name input').val(content1[1] + '.pug');
					} else {
						$('#contentNavigator__type input').val(content1[0]);
						$('#contentNavigator__name input').val('_' + content1[1] + '.pug');
					}

				} else {
					$('#contentNavigator__type input').val(content1[0]);
					$('#contentNavigator__name input').val(content1[1]);
				}


			} else if (content1.length == 3) {
				$('#contentNavigator__type input').val(content1[0]);
				$('#contentNavigator__stype input').val(content1[1]);
				$('#contentNavigator__name input').val(content1[2]);
			}

			var type = $('#contentNavigator__type input').val();
			var stype = $('#contentNavigator__stype input').val();
			var name = $('#contentNavigator__name input').val();
			ql(type, stype, name)

			$.ajax({
				url: "http://localhost:8181?action=loadByDOM&type=" + type + "&stype=" + stype + "&name=" + name

			}).done(function (data) {
				if (data !== '') {
					var res = JSON.parse(data);

					editorPug.selectAll();
					editorJs.selectAll();
					editor.selectAll();
					if (res.pug) editorPug.insert(res.pug);
					else editorPug.insert('');
					if (res.JS) editorJs.insert(res.JS);
					else editorJs.insert('');
					if (res.scss) editor.insert(res.scss);
					else editor.insert('');
					//$(".hud-bottom").css('display', 'block')
					ql($(_this).attr('class'), 'ee');
					if (_this.tagName != "svg") {
						var target = $(_this).attr('class').split(' ')[0];
						editor.find(target);
						editorPug.find(target);
						editorJs.find(target);
					}

					scssChangeCounter = 1;
					pugChangeCounter = 1;
					JSChangeCounter = 1;//
					$('#editorPug').removeClass('edited');
					pugChanged = false;
					scssChanged = false;
					$('#editorScss').removeClass('edited');
					jsChanged = false;
					$('#editorJs').removeClass('edited');


				}
				//
			})

		}
        $('.classtype__name').trigger('mousedown')
	})

}
document.getElementById('index').onload = function () {

	$('button#savecode').removeClass('classLoading')
	loadToQuant();
	$('.fs__modules ul,.fs__p_modules ul,.fs__p_elements ul,.fs__pages ul,.fs__levels ul,.fs__options ul,.fs__layout ul').html('');
	loadProjectPath('dev/MODULES/PROJECT_MODULES', '.fs__modules');
	loadProjectPath('dev/ELEMENTS', '.fs__elements');
	loadProjectPath('dev/MIXES', '.fs__mixes');
	loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/template/PAGESYSTEM/LAYOUT', '.fs__layout');
	loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/qContent/MODULES', '.fs__p_modules');
	loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/qContent/ELEMENTS', '.fs__p_elements');
	loadProjectPath('dev/scss/MASTER_OPTIONS', '.fs__options');
	loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/template/PAGESYSTEM/PAGES', '.fs__pages');
	loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/template/PAGESYSTEM/LEVELS', '.fs__levels');
	scssChangeCounter = 1;
	pugChangeCounter = 1;
	JSChangeCounter = 1;
	pugChanged = false;
	$('#editorPug').removeClass('edited');
	scssChanged = false;
	$('#editorScss').removeClass('edited');
	jsChanged = false;
	$('#editorJs').removeClass('edited');
	editorsListner();
	$('.hud-Button').not('#editorSwitcher').filter($('.on')).trigger('mousedown').addClass('on');
};
$(document).ready(function () {







	//getViewport
	var viewports = {
		mobile: '320',
		tablet: '768',
		tabletL: '1024',
		laptop: '1280',
		desktop: '1980'

	}

	$('#viewpr-content').css('width', qntGetCookie('viewport'));

	function swap(json) {
		var ret = {};
		for (var key in json) {
			ret[json[key]] = key;
		}
		return ret;
	}

	var viewPortsFlip = swap(viewports);
	//ql($('.viewportSwitch[data-viewport="'+viewPortsFlip[qntGetCookie('viewport').slice(0,-2)]+'"]'),234234)
	$('.viewportSwitch[data-viewport="' + viewPortsFlip[qntGetCookie('viewport').slice(0, -2)] + '"]')
		.css('background', 'rgb(0, 179, 239)')
		.find('.icon').css('fill', '#fff');


	//editorsListner();


	//Default settings
	var switchedEditor = 'quant';


	$('.getFile').on('click', function () {
		ql('ads');
		$.ajax({
			url: "http://localhost:8181?action=openFilesByPhpStorm"
		});

	})


	// $('.editor').draggable();
	$('.step').draggable().resizable();


	var mediaMap = {
		phoneBreakpoint: parseInt($('#phone-upper-boundary').text(), 10),
		tabletPortraitBreakpoint: parseInt($('#tablet-portrait-upper-boundary').text(), 10),
		tabletLandscapeBreakpoint: parseInt($('#tablet-landscape-upper-boundary').text(), 10),
		desktopBreakpoint: parseInt($('#desktop-upper-boundary').text(), 10),
		desktoplBreakpoint: parseInt($('#desktopl-upper-boundary').text(), 10)
	}
	window.searchClosestofDebugElement = function (searchableEl) {
		var arr = ($(searchableEl).html()).split('<i>');
		var tag = arr[0]
		var classes = arr[1].replace(/<\/i>/, '').replace(/ /g, '.').replace(/&gt;/g, '');
		var classesArray = classes.split(' ');
		var target = classesArray[0];
		var searchElem = tag + '.' + classes;

		var newDebug = frameEl('.debugElement').closest(frameEl(searchElem));
		editor.find(target);
		editorPug.find(target);
		editorJs.find(target);
		console.log(newDebug)
		$('.debugElement').removeClass('debugElement');
		newDebug.trigger('click');
	}
	var mediaRules = qntGetObjects(jsonCss, 'type', 'media');
	var curentEditable;

	function getObjects(elemClassStr) {

		elemClassStr = elemClassStr.trim();
		var result = {};
		result.selectors = [];
		result.styles = [];
		result.position = [];
		result.media = [];
		console.log(mediaRules);

		$.each(mediaRules, function (i, mediaObj) {

			$.each(mediaObj.rules, function (i1, rule1) {
				if (rule1.hasOwnProperty('selectors') && rule1.selectors.toString().replace(/\./g, '').indexOf(elemClassStr) != -1) {
					var mediaPoint = mediaRules[i].media;
					console.log(rule1, 'qqqq', mediaRules[i].media)
					result.media.push([mediaPoint, rule1])
				}
			})

		})


		for (var i in jsonCss.stylesheet.rules) {
			selObj = jsonCss.stylesheet.rules[i];
			//console.log(selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr))
			if (selObj.hasOwnProperty('selectors') && selObj.selectors.toString().replace(/\./g, '').indexOf(elemClassStr) != -1 && selObj.selectors.toString().indexOf('debug') == -1) {
				console.log(selObj);
				result.position.push(selObj.position.start.column + '_' + selObj.position.start.line)
				result.selectors.push(selObj.selectors.toString());
				var stylesArr = [];
				for (var zi in selObj.declarations) {

					var dec = selObj.declarations[zi];
					var propVal = {
						propery: dec.property,
						value: dec.value
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

	var currentSelectorsData = {};
	currentSelectorsData.selectorName = [];
	currentSelectorsData.selectorData = [];
	var CURRENTSWITCHER;
///////////////////////////////////////////CHANGER
	$('body').on('mousedown', '.classtype__name', function () {
		$('#extendsSelectors').empty();
		CURRENTSWITCHER = {};
		CURRENTSWITCHER.selector = '';
		CURRENTSWITCHER.media = 'all';
		CURRENTSWITCHER.pseudoEllements = '';

		$('.iconMediachoiser').removeClass('active');
		$('.iconMediachoiser').removeClass('inList');
		var searchableSelector = $(this).text();
		var indexE = currentSelectorsData.selectorName.indexOf(searchableSelector);

		if (indexE > -1) {

			ql(indexE, 'GGGG')

			var styles = currentSelectorsData.selectorData[indexE];
			CURRENTSWITCHER.selector = currentSelectorsData.selectorName[indexE];
			$('#selfProperties').empty();


			styles.ownStyles[0] = styles.ownStyles[0];

			var string = '';

			for (var i in styles.stylesObject) {

				string += styles.stylesObject[i].propery + ':' + styles.stylesObject[i].value + '<br>';

			}
			$('#selfProperties').prepend('<div class="ownProperties">' + string + '</div>')

			markMedia(styles.media);


		} else {
			ql('add new');

			$('body').on('click', '.properties', function () {

				var indexOf = qntGetThisData(this, 'index');
				$('.properties').removeClass('half');
				$('.properties').not(this).addClass('half');

				ql(elOject.selectors[indexOf]);
				goToObjects(indexOf);

			})


			var regExpss = new RegExp(searchableSelector, 'g');
			console.log(searchableSelector);
			var selectorType = '';

			var elOject = getObjects(searchableSelector)

			var ownStylesProperties = {
				selectorName: '',
				ownStyles: [],
				position: '',
				stylesObject: {},
				pseudoSelectors: {
					hover: [],
					active: [],
					focus: []
				}
			}


			var getProps = function () {
				var properties = '';
				for (var i in elOject.styles[index]) {
					var rule = elOject.styles[index][i];
					properties += rule.propery + ':' + rule.value + '<br>';
				}
				return properties
			}

			function goToObjects(index) {
				CURRENTSWITCHER.selector = elOject.selectors[index];
				ownStylesProperties.selectorName = elOject.selectors[index];
				ownStylesProperties.position = elOject.position[index];
				ownStylesProperties.ownStyles.push(props);
				ownStylesProperties.stylesObject = elOject.styles[index];
				ql(ownStylesProperties);
			}


			for (var index in elOject.selectors) {


				if (elOject.selectors[index] == '.' + searchableSelector) {
					var selectorType = 'self';
					console.log(selectorType)
					var props = getProps();
					$('#selfProperties').empty()
					$('#selfProperties').prepend('<div class="ownProperties properties" data-index="' + index + '">' + props + '</div>')
					console.log('IN1');
				}
				else if (elOject.selectors[index].split(',').length >= 2) {

					var groupPart = elOject.selectors[index].split(',');
					var selectorType = 'group';
					for (var i in groupPart) {

						if (groupPart[i].split(':').length > 1 && groupPart[i].split(':')[0] == '.' + searchableSelector) {
							console.log('IN2')
							var props = getProps();
							console.log('IN2', props)
							switch (groupPart[i].split(':')[1]) {
								case 'hover':
									ownStylesProperties.pseudoSelectors.hover = props;
									break;
								case 'active':
									ownStylesProperties.pseudoSelectors.active = (props);
									break;
								case 'focus':
									ownStylesProperties.pseudoSelectors.focus = props;
									break;
							}
						}

					}
					var props = getProps();
					$('#extendsSelectors').prepend('<div class="selectorHeader selectorGroup properties" data-index="' + index + '"">' + elOject.selectors[index].replace(regExpss, '<span class="chosenSelector">' + searchableSelector + '</span>') + '<div class="propertyGroup">' + props + '</div></div>')

				} else if (elOject.selectors[index].split(' ').length > 1) {
					var selectorType = 'ParentChild';
					console.log(selectorType)
					var props = getProps();

					$('#extendsSelectors').prepend('<div class="selectorHeader selectorExt properties" data-index="' + index + '"">' + elOject.selectors[index].replace(regExpss, '<span class="chosenSelector">' + searchableSelector + '</span>') + '<div class="propertyGroup">' + props + '</div></div>')

				} else if (elOject.selectors[index].search(/[a-z]+.mainHeader/) >= 0) {
					var selectorType = 'Extends';
					var props = getProps();
					$('#extendsSelectors').prepend('<div class="selectorHeader selectorExt properties" data-index="' + index + '"">' + elOject.selectors[index].replace(regExpss, '<span class="chosenSelector">' + searchableSelector + '</span>') + '<div class="propertyGroup">' + props + '</div></div>')
					console.log(selectorType)

				}
				else if (elOject.selectors[index].split(':').length >= 1) {
					var selectorType = 'Own';
					console.log(selectorType)
					var props = getProps()
					console.log('in3')
					switch (elOject.selectors[index].split(':')[1]) {
						case 'hover':
							ownStylesProperties.pseudoSelectors.hover = props;
							break;
						case 'active':
							ownStylesProperties.pseudoSelectors.active = (props);
							break;
						case 'focus':
							ownStylesProperties.pseudoSelectors.focus = props;
							break;
					}
					$('#extendsSelectors').prepend('<div class="selectorHeader selectorExt properties" data-index="' + index + '"">' + elOject.selectors[index].replace(regExpss, '<span class="chosenSelector">' + searchableSelector + '</span>') + '<div class="propertyGroup">' + props + '</div></div>')

				}


			}

			ownStylesProperties.media = elOject.media
			if (ownStylesProperties.media.length) {
				//get prams from mainParamscreen and
				markMedia(ownStylesProperties.media);


				//add class to tabber


				console.log('media', ownStylesProperties.media)
			} else {
				console.log('noMedia', ownStylesProperties.media)
			}


			currentSelectorsData.selectorName.push(elOject.selectors[index]);
			currentSelectorsData.selectorData.push(ownStylesProperties);


			console.log('+', currentSelectorsData);

			$('.iconMediachoiser').on('click', function () {
				$('.iconMediachoiser').removeClass('active')

				$(this).addClass('active')
				var _this = $(this);


				var classList = _this.attr('class');
				var breakpoint = '';
				switch (true) {
					case(classList.indexOf('All') > 0):
						CURRENTSWITCHER.media = 'all';
						$('.window').css('width', '100%');
						break;
					case(classList.indexOf('Mobile') > 0):
						getMediaCss(mediaMap.phoneBreakpoint - 1);
						CURRENTSWITCHER.media = mediaMap.phoneBreakpoint;
						break;
					case (classList.indexOf('TabletP') > 0):
						getMediaCss(mediaMap.tabletPortraitBreakpoint);
						CURRENTSWITCHER.media = mediaMap.tabletPortraitBreakpoint;
						break;
					case(classList.indexOf('TabletL') > 0):
						getMediaCss(mediaMap.tabletLandscapeBreakpoint);
						CURRENTSWITCHER.media = mediaMap.tabletLandscapeBreakpoint;
						break;
					case(classList.indexOf('Desctop') > 0):
						getMediaCss(mediaMap.desktopBreakpoint);
						CURRENTSWITCHER.media = mediaMap.desktopBreakpoint;
						break;
					case(classList.indexOf('DesctopLarge') > 0):
						getMediaCss(mediaMap.desktoplBreakpoint);
						CURRENTSWITCHER.media = mediaMap.desktoplBreakpoint;
						break;

				}
				ql(CURRENTSWITCHER, 'QS');

			})

			var getMediaCss = function (bpoint) {

				$('.window').css('width', bpoint + 'px')
				;
				for (var i in ownStylesProperties.media) {
					if (ownStylesProperties.media[i][0].indexOf(bpoint) > 0) {
						var props = ownStylesProperties.media[i][1]['declarations'];

						var prop = '';
						var val = '';

						var stringPropVal = '';

						for (var i in props) {
							prop = props[i]['property'];
							val = props[i]['value'];
							stringPropVal += prop + ' : ' + val + '<br>';
						}
						$('.ownProperties').empty();
						$('.ownProperties').html(stringPropVal);

					}
				}
			}
		}
		ql(CURRENTSWITCHER, 'QS')
	})
//////////////////////////////////////////////////////////////////////////////////////////////////
/////END OF CHANGER
	ql(CURRENTSWITCHER, 'QS')


///ClassChanngerButton

	$('.propChangerButton ').on('click', function () {
		var val = $(this).text();
		var delimetr = $(this).siblings('.propChanger__propertyDelimetr').val();
		var propName = $(this).siblings(".propChanger__propertyName").val();
		var changes = propName + val + delimetr;
		sendToCurrent(changes);
	})
/// Send changes to current
	var sendToCurrent = function (changes) {
		var changesArr = changes.split(':');
		var prop = changesArr[0];
		var val = changesArr[1];


		var selector = CURRENTSWITCHER.selector;
		var media = CURRENTSWITCHER.media;
		var indexE = currentSelectorsData.selectorName.indexOf(selector);
		if (indexE > -1) {
			var styles = currentSelectorsData.selectorData[indexE];
			ql(styles, 'ATTENTION')
			if (CURRENTSWITCHER.media == 'all') {
				var styles = styles.stylesObject;


				var newProp = true;
				for (var i in styles) {

					if (styles[i].propery == prop) {
						styles[i].value = val;
						newProp = false;
					}
				}
				if (newProp) {
					currentSelectorsData.selectorData[indexE].stylesObject.push({propery: prop, value: val});
				}


				currentSelectorsData.selectorData[indexE].ownStyles[0] = styles;
			} else {
				var point = CURRENTSWITCHER.media;
				var media = styles.media;
				for (var i in media) {
					if (media[i][0].indexOf(point) != -1) {
						currentSelectorsData.selectorData[indexE].media[i][1].declarations.push(changes)
					}
				}
			}
		}
		ql(currentSelectorsData, 'Oject to send for api server');
	}

	$('#saveToServer').on('mousedown', function () {

		$.ajax({
			url: "http://localhost:8181"
			, type: 'POST'
			, data: JSON.stringify(currentSelectorsData)
			, success: function (res) {

			}
		});
	})

	//EXEC
	$('#openDownload').on('mousedown', function () {

		$.ajax({
			url: "http://localhost:8181?action=execute&command=open__downloads"
		});
	})
	$('#openSVGforSrite').on('mousedown', function () {

		$.ajax({
			url: "http://localhost:8181?action=execute&command=open__svgs"
		});
	})


	function markMedia(media) {
		for (var i in media) {
			var breakPoint = parseInt(media[i][0].replace(/\D/g, ''));
			console.log(breakPoint, '9090', mediaMap.phoneBreakpoint - 1);
			switch (breakPoint) {
				case(mediaMap.desktoplBreakpoint):
					$('.mediaDesctopLarge').addClass('inList');
					break;
				case(mediaMap.desktopBreakpoint):
					$('.mediaDesctop').addClass('inList');
					break;
				case(mediaMap.tabletLandscapeBreakpoint):
					$('.mediaTabletL').addClass('inList');
					break;
				case(mediaMap.tabletPortraitBreakpoint):
					$('.mediaTabletP').addClass('inList');
					break;
				case(mediaMap.phoneBreakpoint - 1):
					$('.mediaMobile').addClass('inList');
					break;
			}
		}
	}

	function getObjectStyles(className) {

		elemClassStr = elemClassStr.trim();
		var result = {};
		result.selectors = [];
		result.styles = [];
		result.position = []
		for (var i in jsonCss.stylesheet.rules) {
			selObj = jsonCss.stylesheet.rules[i];
			//console.log(selObj.selectors.toString().replace(/\./g,'').indexOf(elemClassStr))
			if (selObj.hasOwnProperty('selectors') && selObj.selectors.toString().replace(/\./g, '').indexOf(elemClassStr) != -1) {
				console.log(selObj)
				result.position.push(selObj.position.start.column)
				result.position.push(selObj.position.start.line)
				result.selectors.push(selObj.selectors.toString());
				var stylesArr = [];
				for (var zi in selObj.declarations) {

					var dec = selObj.declarations[zi];
					var propVal = {
						propery: dec.property,
						value: dec.value
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
	$('a').not($('.tabAnchr')).not($('.tabAnchr', window.frames['index'].contentDocument)).removeAttr('href');
	$("#__bs_script__").insertAfter("body");
	//rea$('.editorsContainer').resizable();


	var engP = 'Platy bonito oceanic whitetip shark orangespine unicorn fish loach goby rockweed gunnel turkeyfish Port Jackson shark buffalofish, southern grayling. Arapaima viperfish eeltail catfish pearl danio Black swallower, Atlantic trout sailfin silverside. Tang, marlin tui chub Indian mul flashlight fish, skilfish loosejaw lenok porcupinefish bandfish. Clownfish eeltail catfish: freshwater hatchetfish codlet tenpounder ladyfish scissor-tail rasbora lancetfish tigerperch king of herring. Grideye Mozambique tilapia oceanic whitetip shark clingfish North American darter mail-cheeked fish lamprey bramble shark. Parrotfish loweye catfish squaretail. Lighthousefish yellowhead jawfish shark mola mola sunfish.';
	var eHead = 'This is Header';

	console.log('MEDIAMAP', mediaMap)
	var mediaBreakPoinsChecker = function () {
		$(window).resize(function () {
			var size = window.innerWidth;
			console.log(size > mediaMap.desktoplBreakpoint)
			var icon = ''
			switch (true) {
				case (size > mediaMap.desktoplBreakpoint):
					icon = '#arrow';
					break;
				case (size > mediaMap.desktopBreakpoint):
					icon = '#computer';
					break;
				case (size > mediaMap.tabletLandscapeBreakpoint):
					icon = '#computer1';
					break;
				case (size > mediaMap.tabletPortraitBreakpoint):
					icon = '#computer2';
					break;
				default:
					icon = '#computer3';

			}
			$('use', '.icon-breakpoits').attr('xlink:href', icon);
			$('#widthOf').text(size)
		})
	}
	mediaBreakPoinsChecker();


	function paste(elem) {
		elem.focus();
		document.execCommand('paste');
		console.log(elem.val())
		return elem.val();


	}

	function handlePaste(e) {
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
		handles: "n,s", minHeight: 257
	});
	$('button', '.fontSelector').on('click', function () {

		var size = $("input[name='size']").val();
		var del = $("select[name='del']").val();
		console.log(size + del);
		$('body').css('fontSize', size + del);

	})
///////////////////////////////////////////////////////////////////


	$('.grid,.grid *').unbind('click');

///////////////
// 	$('#spacerSwitcher').on('click', function () {
// 		$('#ball').toggleClass('hidden');
// 		$(this).toggleClass('on')
// 		$('.spacer,#ball').draggable().resizable();
// 	})
	$('#gridb').on('mousedown', function () {
		frameEl('#grid').toggleClass('hidden')
		$(this).toggleClass('on')
	})
	$('#debugViewSwitcher').on('mousedown', function () {
		frameEl('body').toggleClass('debug');
		$(this).toggleClass('on');

	})

	$('div#testing').on('mousedown', function () {
		frameEl('body').toggleClass('testBlackWhite');
		$(this).toggleClass('on');

	})


	$('#addRect').on('click', function () {
		$(".debugElement").append("<div class='mod rect'></div>");
		MakeEditable($('.mod.rect'));
	})
	$('#addHeader').on('click', function () {
		$(".debugElement").append("<h1 class='mod header' contenteditable='true'>" + eHead + "</h1><h2 class='mod header'>" + eHead + "</h2><h3 class='mod header'>" + eHead + "</h3><h4 class='mod header'>" + eHead + "</h4><h5 class='mod header'>" + eHead + "</h5><h6 class='mod header'>" + eHead + "</h6>");
		MakeEditable($('.mod.header'));
	})
	$('#addP').on('click', function () {
		$(".debugElement").append("<p class='mod prgph'>" + engP + "</p>");
		MakeEditable($('.mod.prgph'));
	})

	$('#addImg').on('click', function () {
		var url = paste($('#imginpt'));
		$("body").append("<div class='mod img' style='width:200px; height: 200px;'><img  src='" + window.clipboardData + "' width='100%'></div>");
		//var iframe = $('#pugIfrm').contents().find( "a" ).css( "background-color", "#6bdabd" );
		MakeEditable($('.mod.img'));
	})
	$('#addBkg').on('click', function () {
		console.log("url='" + $('#imginpt').val() + "'");
		$(".debugElement").css("background", "url(" + $('#imginpt').val() + ")");
	})


	$('#clone').on('click', function () {
		var clone = $(".debugElement").clone().appendTo("body").css({
			"position": "absolute",
			"top": "0"
		}).removeClass("debugElement")
			.draggable()
			.resizable({
				handles: "n, e, s, w"
			});
		MakeEditable($(clone));
		MakeEditable($('*', clone));


	})

	$('#del').on('click', function () {
		$(".debugElement").remove();
	})

	$('#colorPicker').on('change', function () {
		$(".debugElement").css('opacity', '1').css('backgroundColor', $(this).val());
	})
	$('#colorPickerFont').on('change', function () {
		$(".debugElement").css('opacity', '1').css('color', $(this).val());
	})
	$('#100p').on('click', function () {
		$(".debugElement").css('width', '100%');
	})

	$('#getHtml').on('click', function () {

		$('.notifyjs-wrapper').remove();
		$('.ui-resizable-handle').remove();

		var topug = $(".debugElement").parent().html()
		// $(".notifyjs-wrapper",$(".debugElement").parent()).remove();
		topug = topug.replace(/resizeble/g, '')
			.replace(/eventLock/g, '')
			.replace(/ui-resizable/g, '')
			.replace(/ui-resizable-handle/g, '')
			.replace(/class='mod header' contenteditable='true'/g, '')
			.replace(/ui-draggable/g, '')
			.replace(/ui-draggable-handle/g, '')
			.replace(/debugElement/g, '');
		addToBufer(topug);

		if (document.getElementById('htmlToPugctn') == null) {
			$('body').append('<div id="htmlToPugctn" class="htmlToPug"><iframe id="pugIfrm" src="http://jumplink.github.io/jade2html2jade/" width="400" height="700" align="left"></iframe><span class="js-trigger">close</span></div>');
		}


		//Html2Jade.convertDocument(document, {}, function (err, jade) {
		// do your thing
		//});

	})
	$('#down').on('click', function () {
		$(".debugElement").css('zIndex', $(".debugElement").css('zIndex') - 10000000000000000);


	})
	$('#up').on('click', function () {
		$(".debugElement").css('zIndex', $(".debugElement").css('zIndex') + 10000000000000000);


	})
	$('.pb-colorBox').on('click', function () {
		frameEl(".debugElement").css('backgroundColor', $(this).css('backgroundColor'));


	})
	$('#lock').on('click', function () {
		frameEl(".debugElement").toggleClass('eventLock');
		$(this).toggleClass('on')


	})


	$('#unlock').on('click', function () {
		$(frameEl(".eventLock")).not('#ball').removeClass("eventLock");
		$('#lock').removeClass('on');

	})

	$('#lockSpacer').on('click', function () {
		$("#ball").toggleClass('eventLock');
		$(this).toggleClass('on');
	})


	$('#save').on('click', function () {
		localStorage.setItem('save', $('#project-debug').html());


	})

	$('#load').on('click', function () {
		$('#project-debug').html(localStorage.getItem('save'));

		console.log(localStorage.getItem('save'))
	})
	$('#getinnerView').on('click', function () {
		var clone = frameEl('.debugElement').clone().removeAttr('style');
		$('*', clone).removeAttr('style');
		$('.ui-draggable-handle', clone).removeClass('ui-draggable-handle');
		$('.ui-resizable-e,.ui-resizable-s,.ui-resizable-se', clone).remove();
		var html = $("<div />").append(clone).html().replace(/resizeble/g, '')
			.replace(/eventLock/g, '')
			.replace(/ui-resizable/g, '')
			.replace(/ui-resizable-handle/g, '')
			.replace(/class='mod header' contenteditable='true'/g, '')
			.replace(/ui-draggable/g, '')
			.replace(/ui-draggable-handle/g, '')
			.replace(/debugElement/g, '')
			.replace(/-handle/g, '');
		console.log(html);
		$.ajax({
			url: "http://localhost:8181/?action=html2jade&html=" + (html)
		})

			.done(function (data) {

				console.log(data)
				editorPug.insert(data)


			})

	})

	$('#showAllTags--').on('click', function () {

		$('*').each(function () {
			MakeEditable($(this));
			if ($(this).attr('class')) {
				console.log('hello');
				var Classes = $(this).attr('class').replace(/resizeble/, '')
					.replace(/debugElement/g, '')
					.replace(/ui-resizable/g, '')
					.replace(/ui-draggable-handle/g, '')
					.replace(/ui-draggable/g, '');

				var tag = $(this).prop("tagName");

				var newnotifyStr = tag + '>' + Classes;
				$(this).prepend("<div style='position: relative';><span class='tagChecker' style='background:" + $(this).css('background') + "'>" + newnotifyStr + "</span></div>")

			}
		})

	})
	$('#unsplash').on('click', function () {

		$('body').append('<div id="imagesOnline" class="htmlToPug"><iframe id="pugIfrm" src="http://allthefreestock.com/" width="1200" height="800" align="left"></iframe><span class="js-trigger">close</span></div>');
		$('#imagesOnline .js-trigger-close').on('click', function () {
			$('#imagesOnline').remove();


		})
		$('#imagesOnline').closest('.js-trigger-hide').on('click', function () {
			$('#imagesOnline').css('left', "-" + $(this).width) * 0.9 + "px";


		})


	})


	$('.Qnt__dropMenu__spacer').on('mousedown', function () {
		var classNameofSpacer = qntGetThisData(this, 'content');
		$(this).toggleClass('Qnt__dropMenu--off')
		$("." + classNameofSpacer).toggle();
	})
	$('.Qnt__dropMenu__item').on('mousedown', function () {

		var iframe = document.getElementById('index');
		iframe.src = qntGetThisData(this, 'content');
	})
	$(".Qnt__dropMenu__TRIGGER", "#spacerSwitcher").on('mousedown', function () {
		console.log($(this).next('.Qnt__dropMenu'))
		//$('#Qnt__dropMenu').toggleClass('on');
		$(this).next('.Qnt__dropMenu').toggle().draggable();
		$('#ball').toggleClass('hidden');
		$(this).closest('.hud-Button').toggleClass('on');
		$('.spacer,#ball').draggable().resizable();


	})
	$('.Qnt__dropMenu__TRIGGER', "#openInternet").on('mousedown', function () {

		$(this).next('.Qnt__dropMenu').toggle();
		$(this).closest('.hud-Button').toggleClass('on');

	})


	$('#startMediaTest').on('click', function () {

		var v_options = {
			viewports: [
				{
					size: '320',
					name: 'Mobile'
				},
				{
					size: '640',
					name: 'IP4 Portrait'
				},
				{
					size: '768',
					name: 'Tablet'
				},
				{
					size: '1024',
					name: 'Horizontal Tablet'
				},
				{
					size: '1280',
					name: 'Desktop'
				},
				{
					size: '1980',
					name: 'Desktop HD'
				}
			],
			showName: true,
			reset: 'Original',
			animation: '',
			svg: true
		};
		viewpr(v_options);

	})

	var auto_media = function () {

		var v_options = {
			viewports: [
				{
					size: '520',
					name: 'Mobile'
				},
				{
					size: '768',
					name: 'Tablet'
				},
				{
					size: '1024',
					name: 'Horizontal Tablet'
				},
				{
					size: '1280',
					name: 'Desktop1'
				},
				{
					size: '1980',
					name: 'DesktopHD'
				}
			],
			showName: true,
			reset: 'Original',
			animation: '',
		};
		viewpr(v_options);

	}


	var changeViewport = function () {


		$('.viewportSwitch').on('mousedown', function () {

			var vP = qntGetThisData(this, 'viewport');
			$('#viewpr-content').css('width', viewports[vP] + 'px');
			qntSetCookie('viewport', viewports[vP] + 'px', 1);
			$('.viewportSwitch').css('background', 'initial');
			$('.icon', '.viewportSwitch').css('fill', '#00b3ee')
			$(this).css('background', 'rgb(0, 179, 239)');
			$(this).find('.icon').css('fill', '#fff')

		})


	}

	changeViewport();


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
		classStr = frameEl('.debugElement').attr('class').replace(/resizeble/, '')
			.replace(/debugElement/g, '')
			.replace(/ui-resizable/g, '')
			.replace(/ui-draggable-handle/g, '')
			.replace(/ui-draggable/g, '');
		var resMap = getObjects(classStr);
		console.log(resMap)
		var cssModPanelText = '';
		var mapLine = resMap.position[1];
		var mapCol = resMap.position[0];
		for (var i in resMap.selectors) {
			cssModPanelText += resMap.selectors[i] + '{';
			for (var zi in resMap.styles[i]) {
				cssModPanelText += resMap.styles[i][zi].propery + ':' + resMap.styles[i][zi].value + ';'
			}
			cssModPanelText += '}';
		}

		$.ajax({
			url: "http://localhost:8181/?line=" + (mapLine) + "&col=" + (mapCol - 1),
		})
			.done(function (data) {
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

	//  GETCODE LOCK FUNC
	// $(window.frames[0]).on('click', $('#getCode'), function () {
	//
	// 	console.log('hekol')
	// 	classStr = frameEl('.debugElement').attr('class').replace(/resizeble/, '')
	// 		.replace(/debugElement/g, '')
	// 		.replace(/ui-resizable/g, '')
	// 		.replace(/ui-draggable-handle/g, '')
	// 		.replace(/ui-draggable/g, '');
	// 	var tagStr = frameEl('.debugElement')[0].tagName;
	// 	console.log(tagStr);
	// 	var resMap = getObjects(classStr);
	// 	console.log(resMap)
	// 	var cssModPanelText = '';
	// 	var mapLine = resMap.position[1];
	// 	var mapCol = resMap.position[0];
	// 	for (var i in resMap.selectors) {
	// 		cssModPanelText += resMap.selectors[i] + '{';
	// 		for (var zi in resMap.styles[i]) {
	// 			cssModPanelText += resMap.styles[i][zi].propery + ':' + resMap.styles[i][zi].value + ';'
	// 		}
	// 		cssModPanelText += '}';
	// 	}
	//
	// 	$.ajax({
	// 		url: "http://localhost:8181/?action=getSourceCode&line=" + (mapLine) + "&col=" + (mapCol - 1),
	// 	})
	// 		.done(function (data) {
	// 			console.log(data)
	// 			var dataArr = data.split('[^]')
	// 			var rsourse = dataArr[0];
	// 			var line = dataArr[1];
	// 			var pugContent = dataArr[2];
	// 			var jsContent = dataArr[3];
	// 			$.getJSON("maps/main.css.map", function (dataMap) {
	//
	//
	// 				var filetoEditIndex = dataMap.sources.indexOf(rsourse)
	//
	// 				filetoEdit = dataMap.sourcesContent[filetoEditIndex];
	// 				editor.insert(filetoEdit);
	// 				editor.$blockScrolling = Infinity
	// 				editor.gotoLine(line);
	// 				console.log(pugContent)
	// 				editorPug.insert(pugContent);
	// 				editorJs.insert(jsContent);
	// 			});
	//
	// 		});
	//
	//
	// });
	$('.elAdder').on('click', function () {

		var elem = qntGetThisData(this, 'el')
		elem = $(elem).css('min-height', '20px');
		// MakeEditable(elem);
		frameEl('.debugElement').prepend(elem);
	})


	$('#currentSelectorWay span').on('click', function () {
		console.log(this)
	})

	///////////////////////////////////////////////////Panel Right
	$('.debug-Pannel-Right-content').accordion({
		active: 0,
		collapsible: true

	});
	$('#textAC').on('click', function () {
		frameEl('.debugElement').css(
			{'textAlign': 'center'}
		)

	})
	$('#textAL').on('click', function () {
		frameEl('.debugElement').css(
			{'textAlign': 'left'}
		)

	})
	$('#textAR').on('click', function () {
		frameEl('.debugElement').css(
			{'textAlign': 'right'}
		)

	})

//padder
	window.padder = function (value) {

		frameEl('.debugElement').css(
			{
				'padding': value + 'em'
			}
		)


	}
	window.paddertb = function (value) {

		frameEl('.debugElement').css(
			{
				'padding-top': value + 'em',
				'padding-bottom': value + 'em',
			}
		)


	}
	window.padderrl = function (value) {

		frameEl('.debugElement').css(
			{
				'padding-right': value + 'em',
				'padding-left': value + 'em',
			}
		)


	}
	window.marginer = function (value) {

		frameEl('.debugElement').css(
			{
				'margin': value + 'em',

			}
		)


	}
	window.marginertb = function (value) {

		frameEl('.debugElement').css(
			{
				'margin-top': value + 'em',
				'margin-bottom': value + 'em',
			}
		)


	}
	window.marginerrl = function (value) {

		frameEl('.debugElement').css(
			{
				'margin-right': value + 'em',
				'margin-left': value + 'em',
			}
		)


	}
	window.gridder = function (intName, rangeVal) {
		console.log(this)

		$('input[name ="' + intName + '"]').val(rangeVal);


	}
	$(document.body).on('click', '.cselector', function () {
		$('.cselector').removeClass('active')
		$('.cselector').css('opacity', '.2');
		$(this).toggleClass('active');

	})


//////////////Modal
	$(".debug-Dialog").dialog({
		modal: true,
		title: "Create New:",
		autoOpen: false
	});
	$(".debug-colorManager").dialog({
		modal: true,
		title: "Color System:",
		autoOpen: false,
		draggable: true
	});

	$('div#colorSystem').on('mousedown', function () {
		$(this).toggleClass('on');
		$(".debug-colorManager").dialog("open");
	})


	$('div#addContent').on('mousedown', function () {

		$(".debug-Dialog").dialog("open");
	})
	$('div#editorSwitcher').on('mousedown', function () {
		$(this).toggleClass('on');
		$(".hud-bottom").toggle();
	})
	$('div#rulerSwitcher').on('mousedown', function () {
		$(this).toggleClass('on');
		$('.ruler.v,.ruler.h', window.frames['index'].contentDocument).toggle();
	})

	$(".debug-Dialog").dialog("close"); //


	$(".debug-Dialog-start").dialog({
		modal: true,
		dialogClass: "starter_dialog"

	});


	$("#optionSwitcher").not('.active').on('mousedown', function () {

		$.ajax({
			url: "http://localhost:8181/?action=loadOption"
		})

			.done(function (data) {

				var jsonOpt = JSON.parse(data);
				ql(jsonOpt);

				$('input[name="project_title"]').val(jsonOpt.mainOpt.title);
				$('input[name="project_prefix"]').val(jsonOpt.mainOpt.prefix);
				$('select[name="project_language"]').val(jsonOpt.mainOpt.lang);
				$('input[name="primary_color"]').val(jsonOpt.colorsOpt.primary);
				$('input[name="secondary_color"]').val(jsonOpt.colorsOpt.secondary);
				$('input[name="foreground_color"]').val(jsonOpt.colorsOpt.foreground);
				$('input[name="background_color"]').val(jsonOpt.colorsOpt.background);
				$('input[name="accent_color"]').val(jsonOpt.colorsOpt.accent);
				$('input[name="font_color"]').val(jsonOpt.colorsOpt.font);
				$('input[name="color_lighterIndex"]').val(jsonOpt.colorsOpt.index);

				$('input[name="screen_font"]').val(jsonOpt.typography.screen_font);
				$('input[name="mobile_font"]').val(jsonOpt.typography.mobile_font);
				$('input[name="lh_ratio"]').val(jsonOpt.typography.lh_ratio);

				for (var i in jsonOpt.typography.linkFontsArr) {

					if (i == 0) {

						$('input[name="link_font__1_link"]').val(jsonOpt.typography.linkFontsArr[i].link);
						$('input[name="link_font__1_name"]').val(jsonOpt.typography.linkFontsArr[i].name);
						$('select[name="link_font__1_role"]').val(jsonOpt.typography.linkFontsArr[i].role);
						$('select[name="link_font__1_typeface"]').val(jsonOpt.typography.linkFontsArr[i].typeface);
						$('select[name="link_font__1_weight"]').val(jsonOpt.typography.linkFontsArr[i].weight);

					} else {

						var _it = i + 1;
						var clone = $('.fl_group').first().clone();
						$.each($('*[name]', clone), function (key, val) {
							var attr = $(this).attr('name').replace('1', '+_it+');
							$(this).attr('name', attr);
						})
						$('#font_option').append(clone)

						$('input[name="link_font__' + _it + '_link"]').val(jsonOpt.typography.linkFontsArr[i].link);
						$('input[name="link_font__' + _it + '_name"]').val(jsonOpt.typography.linkFontsArr[i].name);
						$('select[name="link_font__' + _it + '_role"]').val(jsonOpt.typography.linkFontsArr[i].role);
						$('select[name="link_font__' + _it + '_typeface"]').val(jsonOpt.typography.linkFontsArr[i].typeface);
						$('select[name="link_font__' + _it + '_weight"]').val(jsonOpt.typography.linkFontsArr[i].weight);


					}

				}

				$('select[name="response"]').val(jsonOpt.media.response);
				$('input[name="width"]').val(jsonOpt.media.width);
				$('input[name="colums"]').val(jsonOpt.media.colums);
				$('input[name="gutter"]').val(jsonOpt.media.gutter);
				$('select[name="vRhythm"]').val(jsonOpt.media.vRhythm);
				$('input[name="m_c"]').val(jsonOpt.media.m_c);
				$('input[name="m_b"]').val(jsonOpt.media.m_b);
				$('input[name="tp_c"]').val(jsonOpt.media.tp_c);
				$('input[name="tp_b"]').val(jsonOpt.media.tp_b);
				$('input[name="tl_c"]').val(jsonOpt.media.tl_c);
				$('input[name="tl_b"]').val(jsonOpt.media.tl_b);
				$('input[name="d_c"]').val(jsonOpt.media.d_c);
				$('input[name="d_b"]').val(jsonOpt.media.d_b);

				$('select[name="unit"]').val(jsonOpt.media.unit);
				$('select[name="spacer_principle"]').val(jsonOpt.spacer.spacer_principle);
				$('input[name="progressive_unit"]').val(jsonOpt.spacer.progressive_unit);
				$('input[name="b_i"]').val(jsonOpt.spacer.b_i);
				$('input[name="b_o"]').val(jsonOpt.spacer.b_i);
				$('input[name="c_i"]').val(jsonOpt.spacer.c_i);
				$('input[name="c_o"]').val(jsonOpt.spacer.c_o);
				$('input[name="m_i"]').val(jsonOpt.spacer.m_i);
				$('input[name="m_o"]').val(jsonOpt.spacer.m_o);
				$('input[name="e_i"]').val(jsonOpt.spacer.e_i);
				$('input[name="e_o"]').val(jsonOpt.spacer.e_o);


				$(".debug-changeProp").dialog({
					modal: true,
					title: "Options:",
					dialogClass: "option_dialog"

				});
				$(this).addClass('active')


			})


	})


	$("#optionSwitcher.active").on('click', function () {
		$(".debug-changeProp").dialog('close');
		$(this).removeClass('active')
	})

	$('#cn').on('click', function () {
		$(".debug-Dialog").dialog("open");
	})
	$('.debug-registrator-active .creator').on('mousedown', function () {

		var creation = $('.debug-registrator-active #contentType').val().toLowerCase();

		var elementTitle = $('#elname').val(),
			elementType = $('#eltype').val(),
			elementExtends = $('#elementExtends').val(),
			elementParent = $("#elementParent").val(),
			saveToGlobal = $("input[name='saveto']:checked").val(),
			slug = $("#slug").val(),
			layout = $("#layout").val(),
			mainMenu = $("#mainMenu").val(),
			group = $("#group").val(),
			dop_class = $("#dop_class").val();

		if (elementTitle && elementType) {


			$.ajax({
				url: "http://localhost:8181/?action=creator&element=" + creation + "&title=" + elementTitle +
				"&elementType=" + elementType + "&extends=" + elementExtends + "&parent=" + elementParent +
				"&saveToGlobal=" + saveToGlobal + "&slug=" + slug + "&layout=" + layout + "&mainMenu=" + mainMenu +
				"&group=" + group + "&dop_class=" + dop_class
			})

				.done(function (data) {
					loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/template/PAGESYSTEM/LAYOUT', '.fs__layout');
					loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/qContent/MODULES', '.fs__p_modules');
					loadProjectPath('Projects/' + $("span.projectTitle").text() + '/dev/qContent/ELEMENTS', '.fs__p_elements');
					console.log('ok')
					editorPug.insert(data)


				})

		}

	})

	$('body').on('mousedown', '.windowMark', function () {
		var activeMark = $(this).text();
		ql('sdsdsdssdsdsd--s-s')
		$('.window').css('z-index', '0');
		$('.windowMark').removeClass('active');
		$(this).addClass('active');
		$('.window[window="' + activeMark + '"]').css('z-index', '1');
	})


	$('.ace_rightAlignedText:contains("snippet")').css('color', 'red');


	//Projects Load
	var loadProjects = function loadProjects() {

		$.ajax({
			url: "http://localhost:8181/?action=getProjects"
		})
			.done(function (data) {
				ql(data);
				data = data.split(',');
				for (var i in data) {
					$('#projectsCtn', 'body').prepend("<div class='projectItem col-2-tp'><span>" + data[i] + "</span></div>");
				}
			});

	}
	var removeStarterDialog = function () {
		$(".debug-Dialog-start").dialog('destroy')
	}


	qntCheckCookie('project', loadProjects, removeStarterDialog);


	$('body').on('click', '.projectItem', function () {
		var pName = $('span', this).text();

		$.ajax({
			url: "http://localhost:8181/?action=loadProject&projectName=" + pName
		}).done(function (data) {
			qntSetCookie('project', pName, 1);

		});

	})

	function starterTabber(classTrigger, classTab) {
		$(classTrigger).on('mousedown', function () {
			$(classTrigger + '.active').removeClass('active');
			$(this).addClass('active');
			var start = this.className.indexOf('starterTabTrigger');
			var sliced = parseInt(this.className.slice(start + 19, start + 19 + 2));

			$(classTab).hide();
			$(classTab + '_' + sliced).show();

		})
	}

	starterTabber('.createTitle', '.starterTab');
	starterTabber('.cpP__tab', '.cpP__tabContent');

	$('#addLink,#addLink1').on('mousedown', function () {
		var cnt = document.getElementsByClassName('fl_group').length;
		var clone = $('.fl_group').first().clone();
		$.each($('*[name]', clone), function (key, val) {
			var attr = $(this).attr('name').replace('1', cnt + 1);
			$(this).attr('name', attr);
		})
		$('#font_option').append(clone)
	})

	/// TEST API SERVER

	var testServer = function () {
		try {
			var request = $.ajax({
				url: "http://localhost:8181?action=test",
			});

			request.done(function (msg) {
				$('#apitest').css('background', '#25b14a');
				ql(msg, 'DONE');
				if (msg == '1') {
					var iframe = document.getElementById('index');
					iframe.src = iframe.src;

				}
			});

			request.fail(function (jqXHR, textStatus) {
				$('#apitest').css('background', '#ff3300')
			});
		} catch (e) {
			$('#apitest').css('background', '#ff3300')
		}
	}
	testServer();
	setInterval(testServer, 200)

///////////////// CREATE PROJECT

	$('.CreateProject').on('mousedown', function () {
		qntDeleteAllCookies();
		ql($('input[name="project_title"]').val());
		var projectOptions = {};
		if ($('input[name="project_title"]').val() !== '' && !$('input[name="project_prefix"]').val() !== '') {
			ql($('input[name="project_title"]').val());
			projectOptions.mainOpt = {

				"title": $('input[name="project_title"]').val(),
				"prefix": $('input[name="project_prefix"]').val(),
				"lang": $('select[name="project_language"]').val()
			};
			projectOptions.colorsOpt = {
				"primary": $('input[name="primary_color"]').val(),
				"secondary": $('input[name="secondary_color"]').val(),
				"foreground": $('input[name="foreground_color"]').val(),
				"background": $('input[name="background_color"]').val(),
				"accent": $('input[name="accent_color"]').val(),
				"font": $('input[name="font_color"]').val(),
				"index": $('input[name="color_lighterIndex"]').val(),
			};


			var linksObjArr = [];
			$.each($('.fl_group'), function (key, val) {
				var linkObj = {}
				key++;
				linkObj.name = $('input[name="link_font__' + key + '_name"]').val();
				linkObj.link = $('input[name="link_font__' + key + '_link"]').val();
				linkObj.role = $('select[name="link_font__' + key + '_role"]').val();
				linkObj.weight = $('select[name="link_font__' + key + '_weight"]').val();
				linkObj.typeface = $('select[name="link_font__' + key + '_typeface"]').val();
				linksObjArr.push(linkObj);
			})


			projectOptions.typography = {
				"screen_font": $('input[name="screen_font"]').val(),
				"mobile_font": $('input[name="mobile_font"]').val(),
				"lh_ratio": $('input[name="lh_ratio"]').val(),
				"linkFontsArr": linksObjArr

			};

			projectOptions.media = {
				"response": $('select[name="response"]').val(),
				"width": $('input[name="width"]').val(),
				"colums": $('input[name="colums"]').val(),
				"gutter": $('input[name="gutter"]').val(),
				"vRhythm": $('select[name="vRhythm"]').val(),
				"m_c": $('input[name="m_c"]').val(),
				"m_b": $('input[name="m_b"]').val(),
				"tp_c": $('input[name="tp_c"]').val(),
				"tp_b": $('input[name="tp_b"]').val(),
				"tl_c": $('input[name="tl_c"]').val(),
				"tl_b": $('input[name="tl_b"]').val(),
				"d_c": $('input[name="d_c"]').val(),
				"d_b": $('input[name="d_b"]').val()
			};
			projectOptions.spacer = {
				"unit": $('select[name="unit"]').val(),
				"spacer_principle": $('select[name="spacer_principle"]').val(),
				"progressive_unit": $('input[name="progressive_unit"]').val(),
				"e_i": $('input[name="e_i"]').val(),
				"e_o": $('input[name="e_o"]').val(),
				"c_i": $('input[name="c_i"]').val(),
				"c_o": $('input[name="c_o"]').val(),
				"m_i": $('input[name="m_i"]').val(),
				"m_o": $('input[name="m_o"]').val(),
				"b_i": $('input[name="b_i"]').val(),
				"b_o": $('input[name="b_o"]').val(),

			};
			ql(projectOptions, 'Popt')
			projectOptions.type = "create";

			$.ajax({
				url: "http://localhost:8181"
				, type: 'POST'
				, data: JSON.stringify(projectOptions)
				, success: function (res) {

				}
			});

		} else {
			Notification.requestPermission(function (permission) {
// переменная permission содержит результат запроса
				console.log('Результат запроса прав:', permission);
			});
			var notification = new Notification('PLEASE FILL THE TITLE AND PREFIX',
				{body: '<h1>ugug</h1>', dir: 'auto', icon: 'icon.jpg'}
			);
		}

	})


	// ql('Projects/' + $("span.projectTitle").text() + '/dev/template/PGESYSTEM/LAYOUT', 'HAHAHA')

	var loadContent = function () {

		$('.fs').on('mousedown', '.fs_list', function (e) {

			var path1 = $(this).data('path');


			$.ajax({
				url: "http://localhost:8181?action=openFilesByEditor&path=" + path1 + "&editor=" + switchedEditor

			}).done(function (data) {

				var arr = path1.split('/');
				if (arr.length == 1)
					arr = path1.split('\\');

				ql(arr);

				if (arr.indexOf('ELEMENTS') != -1) {

					var name = arr[arr.length - 1];
					var stype = arr[arr.length - 2];
					var type = 'element';

					ql(name, stype, type, 'OOOOOOO')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)

				} else if (arr.indexOf('MASTER_OPTIONS') != -1) {

					var name = arr[arr.length - 1];
					var stype = "";
					var type = 'options';

					ql(name, stype, type, 'OOOOOOO')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)

				}
				else if (arr.indexOf('PAGES') != -1) {

					var name = arr[arr.length - 1];
					var redirName = name.slice(0, -3) + 'html';
					ql('HELLO I M HERE');
					document.getElementById('index').src = redirName;
					$('span.projectPage').text(redirName);
					$('a#playhref').attr('href', redirName);

					var stype = "";
					var type = 'page';


					ql(name, stype, type, 'OOOOOOO')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)

				}
				else if (arr.indexOf('LEVELS') != -1) {

					var name = arr[arr.length - 1].split('-')[1];
					var stype = "";
					var type = 'level';

					ql(name, stype, type, 'OO')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)

				}
				else if (arr.indexOf('LAYOUT') != -1) {

					var name = arr[arr.length - 1];
					var stype = "";
					var type = 'layout';

					ql(name, stype, type, 'OOOOOOO')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)

				}


				else if (arr.indexOf('MODULES') != -1) {
					var name = arr[arr.length - 1];
					var stype = '';
					var type = 'module';
					ql(name, stype, type, 'RRRRRRR')
					$('#contentNavigator__type input').val(type)
					$('#contentNavigator__stype input').val(stype)
					$('#contentNavigator__name input').val(name)


				}


				var res = JSON.parse(data);
				editorPug.selectAll();
				editorJs.selectAll();
				editor.selectAll();
				if (res.pug) editorPug.insert(res.pug);
				else editorPug.insert('');
				if (res.js) editorJs.insert(res.js);
				else editorJs.insert('');
				if (res.scss) editor.insert(res.scss);
				else editor.insert('');
				$(".hud-bottom").css('display', 'block');


			})


		})
	}

	loadContent();
	editorsListner();


	$('.contentNavigator').draggable();


	var loadByDOM = function (auto, path) {
		ql(path, '//////////////////=////');
		console.log(scssChangeCounter + '--sss--s')

		if (auto) {
			$('#contentNavigator__type input').val(path.type);

			if (path.stype != '') $('#contentNavigator__stype input').val(path.stype);
			$('#contentNavigator__name input').val(path.name);

			var type = path.type;
			var stype = path.stype;
			var name = path.name
			$.ajax({
				url: "http://localhost:8181?action=loadByDOM&type=" + type + "&stype=" + stype + "&name=" + name

			}).done(function (data) {
				scssChangeCounter = 1;
				pugChangeCounter = 1;
				JSChangeCounter = 1;
				ql(JSChangeCounter, 'qwweqrwqrwqr!!!');
				savedCursors = JSON.parse(qntGetCookie('cursors'));
				if (data !== '') {
					var res = JSON.parse(data);

					editorPug.selectAll();
					editorJs.selectAll();
					editor.selectAll();
					if (res.pug) {
						editorPug.insert(res.pug);
						if (savedCursors.hasOwnProperty('PugCursor')) {
							editorPug.gotoLine(savedCursors.PugCursor.row + 1, savedCursors.PugCursor.column,)
							editorPug.scrollToRow(savedCursors.PugCursor.row + 5)
						}


					}
					else editorPug.insert('');
					if (res.JS) {
						editorJs.insert(res.JS);
						if (savedCursors.hasOwnProperty('JSCursor')) {
							editorJs.gotoLine(savedCursors.JSCursor.row + 1, savedCursors.JSCursor.column,)
							editorJs.scrollToRow(savedCursors.JSCursor.row + 5)
						}

					}
					else editorJs.insert('');
					if (res.scss) {
						editor.insert(res.scss);
						if (savedCursors.hasOwnProperty('scssCursor')) {
							editor.gotoLine(savedCursors.scssCursor.row + 1, savedCursors.scssCursor.column,)
							editor.scrollToRow(savedCursors.scssCursor.row + 5)
						}

					}
					else editor.insert('');

					$(".hud-bottom").css('display', 'block')
				}
				//
			})


		} else if (auto === false) {

			$('#contentNavigator__load').on('mousedown', function () {

				scssChangeCounter = 1;
				pugChangeCounter = 1;
				JSChangeCounter = 1;
				ql(JSChangeCounter, 'qwweqrwqrwqr!!!');

				var type = $('#contentNavigator__type input').val();
				var stype = $('#contentNavigator__stype input').val();
				var name = $('#contentNavigator__name input').val();
				ql(type, stype, name)

				$.ajax({
					url: "http://localhost:8181?action=loadByDOM&type=" + type + "&stype=" + stype + "&name=" + name

				}).done(function (data) {


					if (data !== '') {
						var res = JSON.parse(data);

						editorPug.selectAll();
						editorJs.selectAll();
						editor.selectAll();
						if (res.pug) editorPug.insert(res.pug);
						else editorPug.insert('');
						if (res.JS) editorJs.insert(res.JS);
						else editorJs.insert('');
						if (res.scss) editor.insert(res.scss);
						else editor.insert('');
						$(".hud-bottom").css('display', 'block')
					}
					//
				})


			})


		}
	}
	loadByDOM(false);

	var saveCode = function () {
		$('button#savecode').on('mousedown', function () {


			var cursorsObj = {};

			ql(pugChanged, '||||');
			if (scssChanged) {
				var scssContent = editor.getSession().getValue();
				cursorsObj.scssCursor = editor.getCursorPosition();
			} else var scssContent = 'notChanged';
			if (pugChanged) {
				var PugContent = editorPug.getSession().getValue();
				cursorsObj.PugCursor = editorPug.getCursorPosition();
			} else var PugContent = 'notChanged';
			if (jsChanged) {
				var JsContent = editorJs.getSession().getValue();
				cursorsObj.JSCursor = editorJs.getCursorPosition();
			} else var JsContent = 'notChanged';


			//	editor.navigateTo(12,10);
			//	editor.focus();


			var path = {
				type: $('#contentNavigator__type input').val(),
				stype: $('#contentNavigator__stype input').val(),
				name: $('#contentNavigator__name input').val()
			};

			//   path = JSON.stringify(path);

			var data = {
				path: path,
				scss: scssContent,
				pug: PugContent,
				js: JsContent
			}


			// $.ajax({
			//     url:"http://localhost:8181?action=saveFomQuant&path="+path+"&scss="+scssContent+"&js="+JsContent+"&pug="+PugContent
			// })
			var codeForCookies = encodeURIComponent(JSON.stringify(path));
			var cursors = encodeURIComponent(JSON.stringify(cursorsObj));

			qntSetCookie('lastCode', codeForCookies, 1);
			qntSetCookie('cursors', cursors, 1);

			$.ajax({
				url: "http://localhost:8181"
				, type: 'POST'
				, data: JSON.stringify(data)
				, success: function (res) {
					$('button#savecode ').addClass('classLoading');
				}
			});


		})
	}
	saveCode();
	$('div#add\content').on('click', function () {


	})


	qntCheckCookie('lastCode', function () {
		ql('no cookies')
	}, function () {


		loadByDOM(true, JSON.parse(qntGetCookie('lastCode')));
		$('#editorSwitcher').addClass('on')
		;
	})

	shortcut.add("Ctrl+Alt", function () {
		// alert("Hi there!q");
		$('button#savecode').trigger('mousedown')
	})


	// LOAD TO QUANT!

	loadToQuant();


	var switchEditor = function () {

		$('.switcherLoaderButton button').on('mousedown', function () {

			switchedEditor = $(this).text().toLowerCase();
			$('.switcherLoaderButton button').removeClass('on');
			$(this).addClass('on');
			ql(switchedEditor);

		})
	}
	switchEditor();

	$('.createTitle').on('mousedown', function () {

		var elementType = $('span', $(this)).text();

		$('.debug-registrator input').val('');
		$('input#contentType').val(elementType);

		if (elementType == 'Page') {

			$('label:contains(Slug),' +
				'label:contains(Main menu),' +
				'label:contains(Layout),' +
				'label:contains(Additional),' +
				'label:contains(Group)'
			).css('display', 'block');

		}

		if (elementType != 'Page') {

			$('label:contains(Slug),' +
				'label:contains(Main menu),' +
				'label:contains(Layout),' +
				'label:contains(Additional),' +
				'label:contains(Group)'
			).css('display', 'none');

		}


		if (elementType == 'Module' || elementType == 'Page') {

			$('label:contains(TYPE),' +
				'label:contains(EXTENDS),' +
				'label:contains(PARENT)'
			).css('display', 'none');

		}
		if (elementType == 'Level') {

			$('label:contains(TYPE),' +
				'label:contains(EXTENDS)'
			).css('display', 'none');

			$('label:contains(PARENT)'
			).css('display', 'block');


		}
		if (elementType == 'Element') {

			$('label:contains(TYPE),' +
				'label:contains(EXTENDS),' +
				'label:contains(PARENT)'
			).css('display', 'block');

		}


	})
	loadFont = function (fName) {
		WebFont.load({
			google: {
				families: [fName]
			},
			context: frames['viewport']
		});
		$('link[href$="' + fName + '"', window.frames['index'].contentDocument).attr('href', $('link[href$="' + fName + '"', window.frames['index'].contentDocument).attr('href') + ':400,700i,900');
		frameEl('.debugElement').css(
			{
				'font-family': fName,
			}
		)
	}

	var fontFilter={


	}


	var loadFonts = function () {
		fontFilter1 =swap(fontFilter)
		var filteredFonts =[];
		$.ajax({
			url: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBXP7OaLUJZWwHwDdwCbAFIo79kA3PZlnw"

		}).done(function (data) {
			for (var i in data.items) {

				var searchable = true;
				for(var i1 in fontFilter){
					console.log(fontFilter[i1])
					console.log(data.items[i][fontFilter[i1]])
					if(i1=='category'){
						if(fontFilter[i1] != data.items[i][i1]) searchable = false;
					}else {
						console.log(data.items[i][i1]+'mass of subsset')
						console.log(!data.items[i][i1].indexOf(fontFilter[i1])+'RESULT')
						if(data.items[i][i1].indexOf(fontFilter[i1])==-1) searchable = false;
					}

				}if(searchable){
					$('.fontList ul').append('<li>'+data.items[i].family+'</li>');
					console.log(data.items[i])
				}
			}

		})


	}
	$('.fontList ul ').on('mousedown','li',function () {

	   if(!$(this).hasClass('on')){
		   $(this).addClass('on')
		   loadFont($(this).text())
	   }else{
		   $('link[href$="' + $(this).text() + ':400,700i,900"', window.frames['index'].contentDocument).remove();
		   $(this).removeClass('on')
	   }

	})

	////Right Panel
	$('div#font').on('mousedown', function () {
		$('.hud-rightPanel .hud-Button').removeClass('on')
		$(this).addClass('on');
		$('.rightPlTab').css(
			'display', 'none'
		);
		$('.showFonts').css(
			'display', 'block'
		)

		loadFonts();

	})
	$('div#css').on('mousedown', function () {
		$('.hud-rightPanel .hud-Button').removeClass('on')
		$(this).addClass('on');
		$('.rightPlTab').css(
			'display', 'none'
		);
		$('.classMaker').css(
			'display', 'block'
		)


	})
  var setFontsFilter = function () {

		$('span.filterButton').on('mousedown',function () {

			var filterRule = $(this).text().toLowerCase()
			if (!$(this).hasClass('on')){

				if (filterRule == 'latin' || filterRule == 'cyrillic') {
					fontFilter.subsets=filterRule
					$('.filterButton--lan').removeClass('on')
				};


				if(filterRule == 'display' || filterRule == 'serif' || filterRule == 'sans-serif'|| filterRule == 'handwriting') {
					fontFilter.category=filterRule
					$('.filterButton--cat').removeClass('on')
				};

				$(this).addClass('on')

			}else{

				if (filterRule == 'latin' || filterRule == 'cyrillic')
				{delete fontFilter.subsets};

				if(filterRule == 'display' || filterRule == 'serif' || filterRule == 'sans-serif')
				{delete fontFilter.category};

				$(this).removeClass('on')
			}


			console.log(fontFilter);
			$('.fontList ul').html('')
			loadFonts();
	  })

  };setFontsFilter()
})