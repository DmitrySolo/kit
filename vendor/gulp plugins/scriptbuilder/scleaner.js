'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const del = require('del');
var Sync = require('sync');
const fs = require('fs');
var rimraf = require('rimraf');
var callback = function () {
    
}
module.exports = (options) => {
    // Какие-то действия с опциями. Например, проверка их существования,
    // задание значения по умолчанию и т.д.

    return through.obj(function(file, enc, cb) {
        // Если файл не существует
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        // Если файл представлен потоком
        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
            return;
        }

        ///////////////////////////////////

        fs.truncateSync(file.path);
        
        ///////////////////////////////////

        // Возвращаем обработанный файл для следующего плагина
        this.push(file);
        cb();
    },function () {

    });
};
