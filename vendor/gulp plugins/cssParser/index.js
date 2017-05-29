'use strict';
var css = require('css');

// MESSAGES
var cssParser = function (path) {
    var options = {source:path};
    var obj = css.parse('body { font-size: 12px; }', {source:path});
    css.stringify(obj, options);

}



module.exports.vendorCssParser = cssParser;