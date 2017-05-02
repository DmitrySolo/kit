'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const del = require('del');
var Sync = require('sync');
const fs = require('fs');
var vfs = require('vinyl-fs');
var data = require('./../../data.json');
var foreach = require('gulp-foreach');
var concat = require('gulp-concat');
var path = require('path');
var insert = require('gulp-insert');
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
            cb(new gutil.PluginError('sthrower', 'Streaming not supported'));
            return;
        }

        ///////////////////////////////////
        rimraf('dev/SCRIPTS/CONTAINERS/FOOTER/',callback);
        rimraf('dev/SCRIPTS/CONTAINERS/HEAD/',callback);
        rimraf('dist/scripts',callback);

            var scriptsMap = {};

        for(var index in data.LIBS) {
            var mod_deps = data.LIBS[index];
            //console.log(mod_deps)
            var js_deps =mod_deps['js'];
            //console.log(js_deps)
            var css_deps = mod_deps['css'];
            //console.log(css_deps)
            for (var index in js_deps){
                var js_dep = js_deps[index];
                var pathtoScript = js_dep.src;
                console.log(js_dep.container)
                    var container = js_dep.container
                var dist = 'dev/SCRIPTS/CONTAINERS/'+container+'/';
                console.log(dist);
                if (!scriptsMap.hasOwnProperty(container)){

                    scriptsMap[container] = [pathtoScript];

                }else {
                    scriptsMap[container].push(pathtoScript);
                }

                vfs.src(pathtoScript).pipe(vfs.dest(dist));


            }}///throw to container

                console.log(scriptsMap);

        ///////////////////////////////////

        // Возвращаем обработанный файл для следующего плагина

        cb();
    },function () {

        function buildscripts(){

            console.log('ghyhju');

            var scriptFiles = [];
            var strCtn = "";
            var strHeader = "";
            var strFooter = "";





            var concatAndDist=function (e, cnt) {

                vfs.src('dev/SCRIPTS/CONTAINERS/'+cnt+'/*.js')
                    .pipe(foreach(function(stream, file){

                        var name = path.basename(file.path, '.js');

                        if(scriptFiles.indexOf(name)==-1){
                            var ctnArr = cnt.split('/');
                            var ctn1 = ctnArr[0];
                            var ctn2 = ctnArr[1];



                            strCtn ="\nscript(src='scripts/"+name+".js' type='text/javascript')";
                            fs.appendFileSync('dev/templates/PAGESYSTEM/SCRIPTS-STYLES/'+ctn1+'/_'+ctn2+'.pug',strCtn);



                            scriptFiles.push(name);

                        }
                        vfs.src('dev/templates/PAGESYSTEM/INCLUDES/_scriptsHeader.pug').pipe(insert.append(strHeader)).pipe(vfs.dest('dev/templates/PAGESYSTEM/INCLUDES/'));
                        return stream
                    }))
                    .pipe(vfs.dest('dist/scripts'));//write to pugs and throw to dist scripts

                for(var index in e) {
                    vfs.src('dev/SCRIPTS/CONTAINERS/'+cnt+'/'+e[index]+'/*.js')
                        .pipe(concat(e[index]+'.js')).pipe(vfs.dest('dist/scripts'));

                    var name = e[index];


                    if(scriptFiles.indexOf(name)==-1){
                        var ctnArr = cnt.split('/');
                        var ctn1 = ctnArr[0];
                        var ctn2 = ctnArr[1];



                        strCtn ="\nscript(src='scripts/"+name+".js' type='text/javascript')";
                        fs.appendFileSync('dev/templates/PAGESYSTEM/SCRIPTS-STYLES/'+ctn1+'/_'+ctn2+'.pug',strCtn);



                        scriptFiles.push(name);

                    }





                }


            }

            var getDirs = function(rootDir, cb, cnt) {




                if (fs.existsSync(rootDir)){
                    console.log('OK');
                    var files =  fs.readdirSync(rootDir);
                    var dirs = [];
                    for (var index = 0; index < files.length; ++index) {
                        var file = files[index];
                        if (file[0] !== '.') {
                            var filePath = rootDir + '/' + file;
                            fs.stat(filePath, function(err, stat) {
                                if (stat.isDirectory()) {
                                    dirs.push(this.file);
                                }
                                if (files.length === (this.index + 1)) {
                                    return cb(dirs, cnt);
                                }
                            }.bind({index: index, file: file}));
                        }
                    }
                }










            }









            getDirs('dev/SCRIPTS/CONTAINERS/footer/top',concatAndDist,'FOOTER/top');
            getDirs('dev/SCRIPTS/CONTAINERS/footer/libs',concatAndDist,'FOOTER/libs');
            getDirs('dev/SCRIPTS/CONTAINERS/footer/libsExts',concatAndDist,'FOOTER/libsExts');
            getDirs('dev/SCRIPTS/CONTAINERS/footer/init',concatAndDist,'FOOTER/INIT');
            getDirs('dev/SCRIPTS/CONTAINERS/footer/initext',concatAndDist,'FOOTER/initExt');
            getDirs('dev/SCRIPTS/CONTAINERS/footer/bottom',concatAndDist,'FOOTER/bottom');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/TOP',concatAndDist,'HEAD/top');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/LIBS',concatAndDist,'HEAD/libs');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/LIBSEXT',concatAndDist,'HEAD/libsExts');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/INIT',concatAndDist,'HEAD/init');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/INITEXT',concatAndDist,'HEAD/initExt');
            getDirs('dev/SCRIPTS/CONTAINERS/HEAD/BOTTOM',concatAndDist,'HEAD/bottom');
        }

        setTimeout( buildscripts,2000);



    });
};
