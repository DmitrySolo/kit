/*
 *
 */

ace.require('ace/ext/language_tools');

// Is ace a psuedo global? i.e. as should be loaded before this file is includes
// This file should be included before the js file in which your editor is defined
var ace_snippets = function(editor, session, mode, snippetText) {
    var snippet = setup(editor, session, mode, snippetText);
    snippet.manager.register(snippet.m.snippet, snippet.m.scope);
};

var getNames = function (editor, session, mode, snippetText) {
    var snippet = setup(editor, session, mode, snippetText),
        names = [];

    for (var i = 0; i < snippet.m.snippet.length; i++) {
        names.push(snippet.m.snippet[i].name);
    }

    return names;
};

var getContent = function (editor, session, mode, snippetText) {
    var snippet = setup(editor, session, mode, snippetText),
        content = [];

    for (var i = 0; i < snippet.m.snippet.length; i++) {
        content.push(snippet.m.snippet[i].content);
    }

    return content;
};

/*
 *  Helper function that sets up the snippet code
 */
function setup(editor, session, mode, snippetText) {
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
    });

    var snippetManager = ace.require("ace/snippets").snippetManager;

    var id = session.$mode.$id || "";
    var m = snippetManager.files[id];

    m.scope = mode;
    m.snippetText = snippetText;
    m.snippet = snippetManager.parseSnippetFile(snippetText, m.scope);

    return {
        manager: snippetManager,
        id: id,
        m: m
    };
}

// End of line character
var eol = '\n';

var quantScss = [
    "snippet acc",
    "	cs('accent${1:type}')",
    "snippet pri",
    "	cs('primary{1:type}')",
    "snippet sec",
    "	cs('secondary${1:type}')",
    "snippet fon",
    "	cs('font${1:type}')",
    "snippet back",
    "	cs('background${1:type}')",
    "snippet fore",
    "	cs('foreground${1:type}')",
    "snippet -e",
    "	@include space-i('element','=','','')",
    "snippet -c",
    "	@include space-i('component','=','','')",
    "snippet -m",
    "	@include space-i('module','=','','')",
    "snippet -b",
    "	@include space-i('block','=','','')",
    "snippet -for-phone-only",
    "	@include for-size(phone-only){${0:${SELECTED_TEXT:/* code */}}}",
    "snippet -for-tablet-portrait-and-up",
    "	@include for-size(tablet-p-up){${0:${SELECTED_TEXT:/* code */}}}",
    "snippet --for-tablet-landscape-and-up",
    "	@include for-size(tablet-l-up){${0:${SELECTED_TEXT:/* code */}}}",
    "snippet -for-laptop-and-up",
    "	@include for-size(desktop-up){${0:${SELECTED_TEXT:/* code */}}}",
    "snippet -for-fullHd-and-up",
    "	@include for-size(big-desktop-up){${0:${SELECTED_TEXT:/* code */}}}",
].join(eol);



