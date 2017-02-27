var gulp = require('gulp');
var foreach = require('gulp-foreach');
var wait = require('gulp-wait');
var path = require('path');
var runSequence  = require('run-sequence');
const template = require('gulp-template');
var merge = require('gulp-merge-json');
var data = require('./data.json');
htmlv = require('gulp-html-validator');
var Vinyl = require('vinyl');
var shell = require('gulp-shell');
var sassJson = require('gulp-sass-json');
var fs = require('fs');
var GulpSSH = require('gulp-ssh');
var htmlsplit = require('gulp-htmlsplit');
var pug = require('gulp-pug');
var gm = require('gulp-gm');
var insert = require('gulp-insert');
var imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
var minimist = require('minimist');
var sass = require('gulp-sass');
var htmlhint = require("gulp-htmlhint");
var clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var file = require('gulp-file');
var uncss = require('gulp-uncss');
var rename = require("gulp-rename");
var unquote = require('unquote');
gulp.task('views', function buildHTML() {
    var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    gulp.src('dev/templates/PAGESYSTEM/PAGES/*.pug')
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('dist'));
    var str ="include ../templates/PAGESYSTEM/INCLUDES/_includes\n";
    gulp.src('dev/templates/projectboard.pug').pipe(insert.prepend(str)).pipe(rename(function (path) {
        path.basename='index';
        }))
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('projectboard/'));
});
gulp.task('validate',function () {
    gulp.src("dist/*service.html")
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());
});
gulp.task('default', function() {
    gulp.watch('dev/**/*.pug', ['views','browserreload']);
    gulp.src('dist/main.css')
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bro', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('PAGESYSTEM', function() {
    for(var index in data.pages) {
        var attr = data.pages[index];
        if(attr.layout == 'default')
            var str = "//- "+attr.slug+".pug\nextends ../LAYOUT/layout.pug\nblock title\n\t-var page={slug:'"+attr.slug+"',title:'"+attr.title+"'};\n\ttitle "+attr.title;
        else
            var str = "//- "+attr.slug+".pug\nextends ../LAYOUT/"+attr.layout+"/layout.pug\nblock title\n\t-var page={slug:'"+attr.slug+"',title:'"+attr.title+"'};\n\ttitle "+attr.title;
        if (!fs.existsSync('dev/templates/PAGESYSTEM/PAGES/'+attr.slug+'.pug')) {
            file(attr.slug+'.pug', str)
                .pipe(gulp.dest('dev/templates/PAGESYSTEM/PAGES'));
        }

    }

});
gulp.task('BUILDMODULE', function() {
    for(var index in data.modules) {
        var attr = data.modules[index];
        if (!fs.existsSync('dev/MODULES/PROJECT MODULES/'+attr.name)) {
            ///INCLUDE PUG
            var str = "include _mixin\n+"+attr.name+"()";
            file('_include.pug', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));
            ///INCLUDE SCSS
            var str = "@include "+attr.name+"();";

            file('_starter.scss', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));

            ///MIXIN PUG
            var str = "mixin "+attr.name+"()";
            file('_mixin.pug', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));
            ///MIXIN SCSS
            var str = "@mixin "+attr.name+"(){\n\t\n}";
            file('_style.scss', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));
            ///DATA
            var str = "{}";
            file('data.json', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));
            ///JS
            var str ="//"+attr.name+" Script";
            file('script.js',str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/'+attr.name+'/'));
        }

    }

});





gulp.task('own-js', function() {
    gulp.src(['dev/SCRIPTS/_*js'])
        .pipe(concat({ path: 'script.js', stat: { mode: 0666 }}))
        .pipe(gulp.dest('dist/scripts'));
});
gulp.task('build-script-js', function() {
    gulp.src(['dev/**/_FORM-search.js'])
        .pipe(concat({ path: 'script.js', stat: { mode: 0666 }}))
        .pipe(gulp.dest('dist/scripts'));
});
gulp.task('dep-js', function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/sass-to-js/js/dist/sass-to -js.min.js'])
        .pipe(gulp.dest('dist/scripts/'));
});
/////////////////////////////////////
gulp.task('SERVER', [], function() {

    browserSync.init({
        server: "./dist"
    });
    //gulp.watch("dev/**/*.json").on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/*.css").on('change', browserSync.reload);
    gulp.watch("dist/**/*.js").on('change', browserSync.reload);
});
gulp.task('WATCHER', ['concat-modules-and-mixes','sass','cleanMainCss','build-script-js','throw-main-css','browser-reload','views','mergeJson','compile-blueprint-view','compile-blueprint-sass'], function() {

    gulp.watch('dev/MODULES/*/--*/*.scss',function(){ runSequence('concat-modules-and-mixes') });
    gulp.watch(['dev/MIXES/*/*.scss'],['concat-modules-and-mixes']);

    gulp.watch(['dev/ELEMENTS/*/--*/*.scss','dev/ELEMENTS/*/--*/*.pug'],['concat-elements']);
        gulp.watch(['dev/ELEMENTS/_elements.scss'],['sass','compile-blueprint-sass']);
        gulp.watch(['dev/ELEMENTS/_elements.pug'],['views','compile-blueprint-view']);
        gulp.watch(['dev/ELEMENTS/**/*','!dev/ELEMENTS/_elements.scss','!dev/ELEMENTS/_elements.pug'],['concat-elements']);

    //gulp.watch('dev/MODULES/PROJECT MODULES/--*/*.scss',['concat-modules-and-mixes','sass']);
    gulp.watch(['dev/scss/**/*.scss','dev/MIXES/_mixes.scss'],['sass','throw-main-css']);
    //gulp.watch('dev/MODULES/*/--*/*.pug',['views']);
    gulp.watch(['dev/**/_FORM-search.js'],['build-script-js',browserSync.reload]);
    gulp.watch(['dev/MODULES/**/*.pug','dev/templates/**/*.pug','dev/MIXES/_mixes.pug'],function(){ runSequence('views', 'compile-blueprint-view') });
    gulp.watch(['blueprint/*.pug'],['compile-blueprint-view']);
    gulp.watch(['blueprint/*.scss'],['compile-blueprint-sass']);

    gulp.watch(['dev/MIXES/*/*.pug'],['concat-modules-and-mixes']);
    gulp.watch(['dev/**/*.json','blueprint/*json'],function(){ runSequence('mergeJson','views','compile-blueprint-view') });
});
gulp.task('optimage', [], function() {
    gulp.src('dist/not_opt_images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
gulp.task('image_resize', [], function() {
    gulp.src('dist/images/*')
        .pipe(imageResize({
            width : 1200,
            height : 567,
            crop : true,
            upscale : true
        }))
        .pipe(gulp.dest('dist/images-rs'));
});
gulp.task('concat-modules-and-mixes', function() {
        gulp.src(['dev/MODULES/MENUS/--*/*.scss','dev/MODULES/PROJECT MODULES/--*/*.scss'])
        .pipe(concat('_modules.scss'))
        .pipe(gulp.dest('dev/MODULES/'));
        gulp.src(['dev/MIXES/**/_style.scss'])
        .pipe(concat('_mixes.scss'))
        .pipe(gulp.dest('dev/MIXES/'));
        gulp.src(['dev/MIXES/**/_mixin.pug'])
        .pipe(concat('_mixes.pug'))
        .pipe(gulp.dest('dev/MIXES/'));

});

gulp.task('concat-elements', function() {

    gulp.src('dev/ELEMENTS/*/--*/*.scss')
        .pipe(concat('_elements.scss'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
    gulp.src('dev/ELEMENTS/*/--*/*.pug')
        .pipe(concat('_elements.pug'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
////////////////////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////////////////
});

var buildmodulesData = {
    string: 'name',
    default: 'no',
};
var options = minimist(process.argv.slice(2), buildmodulesData);
gulp.task('bm', function() {
        if (!fs.existsSync('dev/MODULES/PROJECT MODULES/--'+options.name)) {
            ///INCLUDE PUG
            var str = "include _mixin\n+"+options.name+"()";
            file('_include.pug', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///INCLUDE SCSS
            var str = "@include "+options.name+"();";

            file('_starter.scss', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));

            ///MIXIN PUG
            var str = "mixin "+options.name+"()\n\t\<!-- split modules/"+options.name+" -->\n\t."+options.name+"";
            file('_mixin.pug', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///MIXIN SCSS
            var str = "@mixin "+options.name+"(){\n\t\n."+options.name+"{}}";
            file('_mixin.scss', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///DATA
            var str = '{\n\t"'+options.name+'" : {\n\t\t"'+options.name+'" : "1"\n\t}\n}';
            file('data.json', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///JS
            var str ="//"+options.name+" Script";
            file('script.js',str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///LIBS JSON
            var str ='{"LIBS": {"'+options.name+'":{"js":{"":{"src":"","concat":"false"}},"css":{"":""}}}}';
            file('libs.json', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///MODULE INCLUDER
            var str ="\n        when '"+options.name+"'\n            include ../../../dev/MODULES/PROJECT MODULES/--"+options.name+"/_include";
            gulp.src('dev/templates/mixins/module_includer.pug').pipe(insert.append(str)).pipe(gulp.dest('dev/templates/mixins'));

        }

});
//////////////////////////////////////////////////////////
var type = {
    string: 'type',
    default: 'link',
};
var prefix = {
        string: 'prefix',
        default: '----',
};
var extend = {
    string: 'extend',
    default: 'NO',
};
var elemType = minimist(process.argv.slice(2), type);
var elemPrefix = minimist(process.argv.slice(2), prefix);
var elemExtend = minimist(process.argv.slice(2), extend);

gulp.task('be', function() {


    var dir = elemType.type.toUpperCase()+'S';
    var elemName = elemPrefix.prefix;
    var elemFolder = elemName;
    var scssTpl = '_templateScss.tpl';
    var libsTpl = '_libs.json';
    var pugTpl = '_templatePug.tpl';
    var elemData = {
            prefix: elemName
        }
        if (elemExtend.extend){
            elemData.extend = elemExtend.extend;
            elemFolder +='( '+elemExtend.extend+' )';
            scssTpl = '_extendScss.tpl';
        }
        if (!fs.existsSync('dev/ELEMENTS/'+dir+'/--'+elemFolder )) {




                gulp.src('dev/ELEMENTS/'+dir+'/_templates/'+pugTpl)
                    .pipe(rename('mixin.pug'))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/ELEMENTS/'+dir+'/--'+elemFolder+'/'))

                gulp.src('dev/ELEMENTS/'+dir+'/_templates/'+scssTpl)
                    .pipe(rename('style.scss'))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/ELEMENTS/'+dir+'/--'+elemFolder+'/'))

                gulp.src('dev/ELEMENTS/'+dir+'/_templates/'+libsTpl)
                    .pipe(rename('libs.json'))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/ELEMENTS/'+dir+'/--'+elemFolder+'/'))

        }

    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var alredyCompile = false;
gulp.task('sass', function () {
    if (!alredyCompile){
        alredyCompile = true;
        gulp.src('dev/scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('blueprint'))
        .pipe(gulp.dest('projectboard'));

        gulp.src('dev/scss/MASTER_OPTIONS/*.scss')
        .pipe(sassJson())
        .pipe(gulp.dest('dev/scss/MASTER_OPTIONS/'));
        alredyCompile = false;

    }

});
gulp.task('throw-main-css', function () {
    gulp.src('dist/main.css')
        .pipe(gulp.dest('blueprint'));
});
gulp.task('browser-reload',  function() {
    browserSync.reload

});
var htmlhint = require("gulp-htmlhint");
gulp.task('validw3c', function () {
    gulp.src('dist/index.php.html')
        .pipe(htmlv({format: 'html'}))
        .pipe(gulp.dest('dist/1/'));
});
//////////////////// WORDPRESS
gulp.task('makeWP_DRAFT', function() {
         gulp.src(['integrator/WordPress/style.css','dist/main.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT/'));
         gulp.src(['integrator/WordPress/header.php','dist/splits/header.html'])
        .pipe(concat('header.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
         gulp.src(['integrator/WordPress/footer.php','dist/splits/footer.html'])
        .pipe(concat('footer.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
         gulp.src(['integrator/WordPress/index.php','dist/splits/index.html'])
        .pipe(concat('index.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
         gulp.src(['dist/images/*','dist/images_rs/*'])
        .pipe(gulp.dest('integrator/WordPress/DRAFT/images/'));
////////////////////////
    for(var index in data.pages) {
        var attr = data.pages[index];
        if (attr.slug !=='index' && !attr.shop==true)
             gulp.src(['integrator/WordPress/page.php','dist/splits/'+attr.slug+'.html'])
            .pipe(concat('page-'+attr.slug+'.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT'));
        else if(attr.shop==true){
            gulp.src(['integrator/WordPress/wc shop/LOOP/archive-product.php','dist/splits/production.html'])
            .pipe(concat('archive-product.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/LOOP/single-product.php','dist/splits/product.html'])
            .pipe(concat('single-product.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-single-product.php','dist/splits/product.html'])
            .pipe(concat('content-single-product.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-product.php','dist/splits/category.html'])
            .pipe(concat('content-product.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-product_cat.php','dist/splits/production.html'])
            .pipe(concat('content-product_cat.php'))
            .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));}

    }
    //////////////////////////////

});
gulp.task('splitter', function() {
    gulp.src('dist/*.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('dist/splits/'));
})

/////////////////////////COMPONENTS BLUEPRINT
gulp.task('blueprint-wright-json', [], function() {
    if(distoptions.izolate){
        var izolate = ',\n"izolate":"true"';

    } else var izolate =',\n"izolate":"false"';
    var str = '{"blueprint" : "'+options.name+'"'+izolate+'}';
    file('blueprint.json', str)
        .pipe(gulp.dest('blueprint/'));
});

gulp.task('merge-json', [], function() {
    gulp.src(['dev/**/*.json','blueprint/*.json'])
        .pipe(merge('data.json'))
        .pipe(gulp.dest('./'));
});
gulp.task('compile-blueprint-view-start',[],function () {
    data.blueprint = options.name;
    gulp.src('blueprint/*.pug')
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('blueprint/'));
})
gulp.task('compile-blueprint-view',[],function () {
    var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    gulp.src('blueprint/*.pug')
        .pipe(pug({
            data: obj,
            pretty: true,
        })).pipe(gulp.dest('blueprint/'));
})
gulp.task('compile-blueprint-sass',[],function () {
        gulp.src('blueprint/_blueprint.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/'));
    if(distoptions.izolate){
        gulp.src('dev/MODULES/PROJECT MODULES/--'+data.blueprint+'/_starter.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest('blueprint/'));

    }



})

gulp.task('start-blueprint-server',[],function () {
    var browserSyncComponent = require('browser-sync').create();

    browserSyncComponent.init({
        server: "blueprint",
        cssOutlining: true
    });
    gulp.watch("blueprint/*.html").on('change', browserSyncComponent.reload);
    gulp.watch("dist/*.css").on('change', browserSyncComponent.reload);

})




gulp.task('bp', [], function() {

    runSequence('blueprint-wright-json',
        ['merge-json', 'compile-blueprint-view-start','compile-blueprint-sass'],
        'start-blueprint-server');

});
gulp.task('buildblueprint', function buildHTML() {
    gulp.src('blueprint/*.pug')
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('blueprint/'));
    gulp.src('blueprint/_blueprint.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/'));
});
gulp.task('mergeJson',function () {
    return gulp.src(['dev/**/*.json','blueprint/*.json'])
        .pipe(merge('data.json'))
        .pipe(gulp.dest('./'));

})
gulp.task('cleanMainCss', function () {
    return gulp.src('dist/main.css', {read: false})
        .pipe(clean());
});

gulp.task('split-css', function () {
    return gulp.src('dist/main.css')
        .pipe(uncss({
            html: ['dist/**/*.html']
        }))
        .pipe(gulp.dest('dist/'));
});
var distData = {
    boolean: 'izolate',
    default: false,
};
var distoptions = minimist(process.argv.slice(2), distData);

gulp.task('tests',[], function () {
    if(distoptions.izolate){
            console.log('hello')
        }else{console.log('by by')}
    }
)

gulp.task('dist-module',[], function () {
    var str ="include ../../../templates/PAGESYSTEM/INCLUDES/_includes\n";
        gulp.src('dev/MODULES/PROJECT MODULES/--'+options.name+'/_include.pug').pipe(insert.prepend(str))
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/DIST/'));
        var dest = 'dev/MODULES/PROJECT MODULES/--'+options.name+'/DIST/_include.html'
        gulp.src('dist/main.css')
        .pipe(uncss({
            html: [dest]
        }))
        .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/DIST/'));

});
gulp.task('testizmodul',[], function () {
    gulp.src('dev/MODULES/PROJECT MODULES/--pagination/_starter.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/starter.css'));
})
gulp.task('buildLibs',[], function () {
    for(var index in data.LIBS) {
        var mod_deps = data.LIBS[index]
        //console.log(mod_deps)
        var js_deps =mod_deps['js'];
        //console.log(js_deps)
        var css_deps = mod_deps['css'];
        //console.log(css_deps)
        for (var index in js_deps){
            var js_dep = js_deps[index];
            var pathtoScript = js_dep.src;
            console.log(js_dep.concat)
            if(js_dep.concat == 'false'){
                gulp.src(pathtoScript).pipe(gulp.dest('dist/scripts/libs/'));
               var str ="\nscript(src='scripts/libs/"+index+"' type='text/javascript')";
                gulp.src('dev/templates/PAGESYSTEM/INCLUDES/_scriptsHeader.pug').pipe(insert.append(str)).pipe(gulp.dest('dev/templates/PAGESYSTEM/INCLUDES/'));

            }
        }

    }
});
var resW = {
    number: 'w',
    default: 0,
};
var resH = {
    number: 'hi',
    default: 'auto',
};
var cropTo = {
    string: 'to',
    default: 'Centr',
};
var imgPref = {
    string: 'prefix',
    default: false,
};
///////////////////////////////////////////////////////////////////IMAGES
var resOptionW = minimist(process.argv.slice(2), resW);
var resOptionH = minimist(process.argv.slice(2), resH);
var resOptionTo = minimist(process.argv.slice(2), cropTo);
var resOptionPref = minimist(process.argv.slice(2), imgPref);
var imageQ = 0;
gulp.task('crop', [], function() {
    var gravity='';
    switch (resOptionTo.to){
        case 'N': gravity = 'North';
            break;
        case 'NE': gravity = 'NorthEast';
            break;
        case 'E': gravity = 'East';
            break;
        case 'SE': gravity = 'SouthEast';
            break;
        case 'S': gravity = 'South';
            break;
        case 'SW': gravity = 'SouthWest';
            break;
        case 'W': gravity = 'West';
            break;
        case 'NW': gravity = 'NorthWest';
            break;
        default: gravity = 'Centr';
    }
    console.log(gravity)
    if(!resOptionW.w){
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function(stream, file){
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix){path.basename =resOptionPref.prefix+'-'+imageQ;}
                    else{path.basename +='-auto_X_'+resOptionH.hi; }}))
        }))
            .pipe(imageResize({
                gravity : gravity,
                height : resOptionH.hi,
                crop : true,
                upscale : false
            })).pipe(gulp.dest('dist/irs'));
    }else{
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function(stream, file){
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix){path.basename =resOptionPref.prefix+'-'+imageQ;}
                    else{path.basename +=resOptionW.w+'_X_'+resOptionH.hi; }}))

        }))
            .pipe(imageResize({
                gravity : gravity,
                width : resOptionW.w,
                height : resOptionH.hi,
                crop : true,
                upscale : false
            })).pipe(gulp.dest('dist/irs'));
    }


});

gulp.task('scale', [], function() {

    if(!resOptionW.w){
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function(stream, file){
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix){path.basename =resOptionPref.prefix+= '-'+imageQ;}
                    else{path.basename +='-autoX_'+resOptionH.hi; }}))

        }))
            .pipe(imageResize({
                height : resOptionH.hi,
                crop : false,
                upscale : true
            })).pipe(gulp.dest('dist/irs'));
    }else{
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function(stream, file){
            imageQ++;

            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix){path.basename =resOptionPref.prefix+= '-'+imageQ;}
                    else{path.basename+='-'+resOptionW.w+'_X_auto' }}))

        }))
            .pipe(imageResize({
                width : resOptionW.w,
                height : resOptionH.hi,
                crop : false,
                upscale : true
            })).pipe(gulp.dest('dist/irs'));
    }


});
gulp.task('pb',[],function () {
    var browserSyncPb = require('browser-sync').create();

    browserSyncPb.init({
        server: "projectboard",
        cssOutlining: true
    });
    gulp.watch("projectboard/*.html").on('change', browserSyncPb.reload);
    gulp.watch("projectboard/*.css").on('change', browserSyncPb.reload);

})
//FONT


gulp.task('convertfonts', function () {
        gulp.src('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/**/*.{ttf,otf}', {read: false})
        .pipe(shell([
            'fontforge -script dev/SOURCE_FABRIC/FONT_LAB/SOURCE/script.pe <%= file.path %> dist/fonts/<%= f(file.path) %>.svg',
            'fontforge -script dev/SOURCE_FABRIC/FONT_LAB/SOURCE/script.pe <%= file.path %> dist/fonts/<%= f(file.path) %>.woff',
            'fontforge -script dev/SOURCE_FABRIC/FONT_LAB/SOURCE/script.pe <%= file.path %> dist/fonts/<%= f(file.path) %>.woff2',
            'fontforge -script dev/SOURCE_FABRIC/FONT_LAB/SOURCE/script.pe <%= file.path %> dist/fonts/<%= f(file.path) %>.eot',
            'fontforge -script dev/SOURCE_FABRIC/FONT_LAB/SOURCE/script.pe <%= file.path %> dist/fonts/<%= f(file.path) %>.ttf'


            ],
            {
            templateData: {
                f: function (s) {
                    var name = path.basename(s, path.extname(s));


                    return name
                }
            }
        })
        )
})
gulp.task('fontvars', function () {
    gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/*.scss', {read: false})
        .pipe(clean());

    gulp.src('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/**/*.{ttf,otf}').pipe(foreach(function(stream, file){

        var name = path.basename(file.path, path.extname(file.path));
        var dirs = file.path.split('\\')
        var i = dirs.length;
        var stl = dirs[i-2];
        var weight = dirs[i-3];
        var family = dirs[i-4];
        var role  = dirs[i-5];
        console.log(!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_'+role+'.scss'));
        if(!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_'+role+'.scss')){fs.closeSync(fs.openSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_'+role+'.scss', 'w'));}
        var str ="'"+name+"':('"+role+"','"+family+"','"+name+"',"+stl+","+weight+"),\n\t";
        gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_'+role+'.scss').pipe(insert.append(str)).pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'));
        return stream
    }))
})


var fr = {
    string: 'role',
    default: 'MAIN',
};
var fontrole = minimist(process.argv.slice(2), fr);

gulp.task('regfont', function () {
    if (!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role)) fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role);
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name);
        fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Bold');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Bold/italic');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Bold/normal');
        fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Light');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Light/italic');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Light/normal');
        fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Normal');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Normal/italic');
            fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/'+fontrole.role+'/'+options.name+'/Normal/normal');
})
gulp.task('wrapfontVars', function () {
    gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/*.scss').pipe(foreach(function(stream, file){
        var name = (path.basename(file.path, path.extname(file.path))).slice(1,(path.basename(file.path, path.extname(file.path))).length);
        console.log(name);
        gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_'+name+'.scss').pipe(insert.wrap("'"+name+"':(", "),")).pipe(gulp.dest("dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/"));
        return stream;
    }))

});



gulp.task('concatVars', function () {
    gulp.src(['dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/*.scss'])
        .pipe(concat({ path: 'variables.scss', stat: { mode: 0666 }}))
        .pipe(insert.wrap('$FONTS:(', ');')).pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'))
        .pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'));
});
gulp.task('buildfonts', function() {


    runSequence(
        'convertfonts','fontvars'
                );

});
gulp.task('buildfonts2', function() {


    runSequence(
        ['wrapfontVars',
            'concatVars']);

});

//SASS VARIABLES TO JSON
gulp.task('sass-json', function () {
return gulp
    .src('dev/scss/MASTER_OPTIONS/*.scss')
    .pipe(sassJson())
    .pipe(gulp.dest('dev/scss/MASTER_OPTIONS/'));
});
//////////////////////////////////////////////////////
gulp.task('START QUANT', ['WATCHER', 'SERVER']);

gulp.task('SCRIPTS',[], function () {


    //gulp.src('dev/SCRIPTS/CONTAINERS/**/*', {read: false}).pipe(clean());
    //deleteFolderRecursive('dev/SCRIPTS/CONTAINERS/FOOTER/');
        fs.truncateSync('dev/templates/PAGESYSTEM/INCLUDES/_scriptsFooter.pug');
        fs.truncateSync('dev/templates/PAGESYSTEM/INCLUDES/_scriptsHeader.pug');


    var scriptFiles = [];
    var strHeader = "";
    var strFooter = "";


    for(var index in data.LIBS) {
        var mod_deps = data.LIBS[index]
        //console.log(mod_deps)
        var js_deps =mod_deps['js'];
        //console.log(js_deps)
        var css_deps = mod_deps['css'];
        //console.log(css_deps)
        for (var index in js_deps){
            var js_dep = js_deps[index];
            var pathtoScript = js_dep.src;
            console.log(js_dep.container)
            var dist = 'dev/SCRIPTS/CONTAINERS/'+js_dep.container+'/';
            console.log(dist);

                gulp.src(pathtoScript).pipe(gulp.dest(dist));


    }}///throw to container



    var concatAndDist=function (e, cnt) {

        gulp.src('dev/SCRIPTS/CONTAINERS/'+cnt+'/*.js')
            .pipe(foreach(function(stream, file){

                var name = path.basename(file.path, '.js');

                if(scriptFiles.indexOf(name)==-1){


                    if (cnt.toUpperCase() == 'HEADER' ){

                         strHeader +="\nscript(src='scripts/"+name+".js' type='text/javascript')";
                         console.log(strHeader)


                    }else if(cnt.toUpperCase() == 'FOOTER') {

                         strFooter +="\nscript(src='scripts/"+name+".js' type='text/javascript')";

                    }
                    scriptFiles.push(name);

                }
                fs.writeFileSync('dev/templates/PAGESYSTEM/INCLUDES/_scriptsFooter.pug',strFooter)
                fs.writeFileSync('dev/templates/PAGESYSTEM/INCLUDES/_scriptsHeader.pug',strHeader)
                //gulp.src('dev/templates/PAGESYSTEM/INCLUDES/_scriptsFooter.pug').pipe(insert.append(strFooter)).pipe(gulp.dest('dev/templates/PAGESYSTEM/INCLUDES/'));
                //gulp.src('dev/templates/PAGESYSTEM/INCLUDES/_scriptsHeader.pug').pipe(insert.append(strHeader)).pipe(gulp.dest('dev/templates/PAGESYSTEM/INCLUDES/'));
                return stream
            }))
            .pipe(gulp.dest('dist/scripts'));//write to pugs and throw to dist scripts

        for(var index in e) {
            gulp.src('dev/SCRIPTS/CONTAINERS/'+cnt+'/'+e[index]+'/*.js')
                .pipe(concat(e[index]+'.js')).pipe(gulp.dest('dist/scripts'));

            name = e[index];
            if(scriptFiles.indexOf(name)==-1){


                if (cnt.toUpperCase() == 'HEADER' ){

                    strHeader +="\nscript(src='scripts/"+name+".js' type='text/javascript')";
                    console.log(strHeader)


                }else if(cnt.toUpperCase() == 'FOOTER') {

                    strFooter +="\nscript(src='scripts/"+name+".js' type='text/javascript')";

                }
                scriptFiles.push(name);

            }


        }


    }

    var getDirs = function(rootDir, cb, cnt) {
        fs.readdir(rootDir, function(err, files) {
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
        });
    }

    getDirs('dev/SCRIPTS/CONTAINERS/HEADER',concatAndDist,'HEADER');
    getDirs('dev/SCRIPTS/CONTAINERS/FOOTER',concatAndDist,'FOOTER');



});
////////////////////////////////////////////////////
gulp.task('bs',[], function () {
    var elemData = {
        name: options.name
    }
    gulp.src('dev/SCRIPTS/SCRIPTS/_template.json')
        .pipe(rename('libs.json'))
        .pipe(template(elemData))
        .pipe(gulp.dest('dev/SCRIPTS/SCRIPTS/'+options.name+'/'));

    gulp.src('dev/SCRIPTS/SCRIPTS/_template.js')
        .pipe(rename(options.name+'.js'))
        .pipe(template(elemData))
        .pipe(gulp.dest('dev/SCRIPTS/SCRIPTS/'+options.name+'/'));
});