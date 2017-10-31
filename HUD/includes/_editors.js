	var useWebWorker = window.location.search.toLowerCase().indexOf('noworker') == -1;
	console.log(useWebWorker);

	//create editor
	var editorJs = ace.edit("editorJs");

		editorJs.getSession().setUseWorker(useWebWorker);


// set to false to prevent using worker, which is needed to run this from local html file due to browser security restritions
var useWebWorker = window.location.search.toLowerCase().indexOf('noworker') == -1;


//create editor

editorJs.getSession().setUseWorker(useWebWorker);

//setModeFromHash(); //set editor content for demo only

//#region not relevant to tern, just some deafults I prefer
editorJs.setTheme("ace/theme/twilight");
editorJs.getSession().setUseWrapMode(true)
editorJs.getSession().setMode("ace/mode/javascript");
editorJs.getSession().setWrapLimitRange(null, null);
editorJs.setShowPrintMargin(false);
editorJs.$blockScrolling = Infinity;//prevents ace from logging annoying warnings
//#endregion

	var mycontext={
		name:"quant",
		qnt:{
			"!type": "fn(selector: string, context?: frameElement) -> jQuery.fn",
			"!url": "http://api.jquery.com/jquery/",
			"!doc": "Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.",

		search: {
			"type": "fn(selector?: string) -> qnt.fn",
				"url": "http://api.jquery.com/addBack/",
				"doc": "Add the previous set of elements on the stack to the current set, optionally filtered by a selector."
		},
		gogog: {
			"type": "fn(className: string) -> qnt.fn",
				"url": "http://api.jquery.com/addClass/",
				"doc": "Adds the specified class(es) to each of the set of matched elements."
		}
	}
	}


ace.config.loadModule('ace/ext/tern', function () {
	editorJs.setOptions({
		/**
		 * Either `true` or `false` or to enable with custom options pass object that
		 * has options for tern server: http://ternjs.net/doc/manual.html#server_api
		 * If `true`, then default options will be used
		 */
		enableTern: {
			/* http://ternjs.net/doc/manual.html#option_defs */
			defs: ['browser', 'ecma5','jquery',mycontext],
			/* http://ternjs.net/doc/manual.html#plugins */
			plugins: {
				doc_comment: {
					fullDocs: true
				}
			},
			/**
			 * (default is true) If web worker is used for tern server.
			 * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
			 */
			useWorker: useWebWorker,
			/* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
			switchToDoc: function (name, start) {
				console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
			},
			/**
			 * if passed, this function will be called once ternServer is started.
			 * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
			 */
			startedCb: function () {
				//once tern is enabled, it can be accessed via editor.ternServer
				console.log('editor.ternServer:', editorJs.ternServer);
			},
		},
		/**
		 * when using tern, it takes over Ace's built in snippets support.
		 * this setting affects all modes when using tern, not just javascript.
		 */
		enableSnippets: true,
		/**
		 * when using tern, Ace's basic text auto completion is enabled still by deafult.
		 * This settings affects all modes when using tern, not just javascript.
		 * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
		 */
		enableBasicAutocompletion: true,
	});
});

//#region not relevant to tern (custom beautify plugin) and demo loading
ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
	editorJs.setOptions({
		// beautify when closing bracket typed in javascript or css mode
		autoBeautify: true,
		// this enables the plugin to work with hotkeys (ctrl+b to beautify)
		htmlBeautify: true,
	});

	//modify beautify options as needed:
	window.beautifyOptions = beautify.options;
	console.log('beautifyOptions:', beautifyOptions);
});

function GetFile(file, c) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", file, true);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) c(xhr.responseText, xhr.status);
	};
}