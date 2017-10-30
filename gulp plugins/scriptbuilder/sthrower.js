'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const del = require('del');
var Sync = require('sync');
var fs = require('fs');
var vfs = require('vinyl-fs');
var foreach = require('gulp-foreach');
var concat = require('gulp-concat');
const fse = require('fs-extra');
var path = require('path');
var insert = require('gulp-insert');
var rimraf = require('rimraf');
var qM = require('./../q_functions');
var callback = function () {
console.log('test-deleted');
}

module.exports = (options) => {

	if(process.platform == 'win32'){
		var delim = '\\';
	}else{
	   var delim = '/';
	};


	// Какие-то действия с опциями. Например, проверка их существования,
	// задание значения по умолчанию и т.д.
	var dist = options.dist
	var dev = options.dev
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
		var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

		//delete old
		var deleteFolderRecursive = function(path) {
			if( fs.existsSync(path) ) {
				fs.readdirSync(path).forEach(function(file,index){
					var curPath = path + "/" + file;
					if(fs.lstatSync(curPath).isDirectory()) { // recurse
						deleteFolderRecursive(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		};




		//fs.unlink('./dev/SCRIPTS/scriptMap.json');

		deleteFolderRecursive(dist+'/scripts');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_top.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_libs.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_libs+.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_init.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_init+.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/FOOTER/_bottom.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_top.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_libs.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_libs+.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_init.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_init+.pug');
		fs.truncateSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/HEAD/_bottom.pug');


			var scriptsMap = {};

		for(var index in data.LIBS) {
			var mod_deps = data.LIBS[index];
			var js_deps =mod_deps['js'];
			var css_deps = mod_deps['css'];

			for (var index in js_deps){

					var js_dep = js_deps[index];
					if (js_dep.container){
						var pathtoScript = js_dep.src;
						var container = js_dep.container;

						if (!scriptsMap.hasOwnProperty(container)){

							scriptsMap[container] = [pathtoScript];

						}else {
							scriptsMap[container].push(pathtoScript);
						}
					}



			}

			for (var index in css_deps){

				var css_dep = css_deps[index];
				var pathtoScript = css_dep.src;
				var container = css_dep.container;
				if (css_dep.container && css_dep.src){
					if (!scriptsMap.hasOwnProperty(container)){

						scriptsMap[container] = [pathtoScript];

					}else {
						scriptsMap[container].push(pathtoScript);
					}
				}

			}
		}///throw to container




		for (var scontainer in scriptsMap){


			if (scontainer && scontainer !='undefined'){

				var srcArr = scriptsMap[scontainer];
				var scontainerArr = scontainer.split('/');
				console.log(scontainerArr);
				var path1 = scontainerArr[0];
				var path2 = scontainerArr[1];

				if (scontainerArr.length == 3 && scontainerArr[2] != ''){

					var file = scontainerArr[2];

					//Add to Pug
					var strCtn ="\nscript(src='scripts/"+file+".js' type='text/javascript')";
					fs.appendFileSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/'+path1+'/_'+path2+'.pug',strCtn);

					vfs.src(srcArr)
						.pipe(concat(file+'.js')).pipe(vfs.dest(dist+'/scripts'));

				}else{

					for (var index in srcArr){

							var filePathArr = srcArr[index].split('/');
							var file = filePathArr[filePathArr.length -1];
							if (file){

                                if(delim == '\\') srcArr[index]=srcArr[index].replace(/\//ig,'\\');
                                var fileNameArr = file.split('.')

                                if (fileNameArr[fileNameArr.length-1] == 'js'){
                                    var strCtn ="\nscript(src='scripts/"+file+"' type='text/javascript')";
                                    if(srcArr[index] != '')
                                        fse.copy(srcArr[index], dist+'/scripts/'+file);
                                }

                                else{
                                    var strCtn ="\nlink(rel='stylesheet', href='styles/"+file+"')";
                                    if(srcArr[index] != '')
                                        fse.copy(srcArr[index], dist+'/styles/'+file);
                                }


                                fs.appendFileSync(dev+'template/PAGESYSTEM/SCRIPTS-STYLES/'+path1+'/_'+path2+'.pug',strCtn);


                            }


					}


				}


			}


		}
		scriptsMap.DateTime = new Date().toLocaleString();
		var str = JSON.stringify(scriptsMap);
		fs.writeFileSync('./dev/SCRIPTS/scriptMap.json', str , { encoding: "utf8",
			flag: "w+"},function () {
			qM.ok('Scripts was Builded');
		});


		///////////////////////////////////

		// Возвращаем обработанный файл для следующего плагина

		cb();
	},function () {



	});
};
