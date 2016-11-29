var gulp = require('gulp');
var runSequence  = require('run-sequence');
var merge = require('gulp-merge-json');
var data = require('./data.json');
htmlv = require('gulp-html-validator');
var concat = require('gulp-concat');
var fs = require('fs');
var GulpSSH = require('gulp-ssh')
var htmlsplit = require('gulp-htmlsplit');
var pug = require('gulp-pug');
var gm = require('gulp-gm');
var insert = require('gulp-insert');
var imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
var minimist = require('minimist');
var sass = require('gulp-sass');
var htmlhint = require("gulp-htmlhint");

const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var file = require('gulp-file');
gulp.task('views', function buildHTML() {
    return gulp.src('dev/templates/PAGESYSTEM/PAGES/*.pug')
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('dist'));
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
        var str = "//- "+attr.slug+".pug\nextends ../LAYOUT/layout.pug\nblock title\n\t-var page='"+attr.slug+"'\n\ttitle "+attr.title;
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
            file('_mixin.scss', str)
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
gulp.task('dep-js', function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/sass-to-js/js/dist/sass-to-js.min.js'])
        .pipe(gulp.dest('dist/scripts/'));
});
/////////////////////////////////////
gulp.task('SERVER', [], function() {

    browserSync.init({
        server: "./dist"
    });
    gulp.watch("dev/**/*.json").on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/*.css").on('change', browserSync.reload);
});
gulp.task('WATCHER', ['scssconcatmodules','sass','throw-main-css','browser-reload','views','merge-json','compile-blueprint-view','compile-blueprint-sass'], function() {
    gulp.watch('dev/MODULES/*/--*/*.scss',function(){ runSequence('scssconcatmodules', 'sass','throw-main-css','browser-reload') });
    //gulp.watch('dev/MODULES/PROJECT MODULES/--*/*.scss',['scssconcatmodules','sass']);
    gulp.watch(['dev/scss/**/*.scss'],['sass','throw-main-css', browserSync.reload]);
    //gulp.watch('dev/MODULES/*/--*/*.pug',['views']);

    gulp.watch(['dev/**/*.pug'],function(){ runSequence('views', 'compile-blueprint-view') });
    gulp.watch(['blueprint/*.pug'],['compile-blueprint-view']);
    gulp.watch(['blueprint/*.scss'],['compile-blueprint-sass']);
    gulp.watch(['dev/**/*.json','blueprint/*json'],['merge-json']);
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
gulp.task('scssconcatmodules', function() {
    return gulp.src(['dev/MODULES/MENUS/--*/*.scss','dev/MODULES/PROJECT MODULES/--*/*.scss'])
        .pipe(concat('_modules.scss'))
        .pipe(gulp.dest('dev/MODULES/'));
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
            var str = "mixin "+options.name+"()\n\t."+options.name+"";
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
            var str ="\n        when '"+options.name+"'\n            include ../../../dev/MODULES/PROJECT MODULES/--"+options.name+"/_include";
            gulp.src('dev/templates/mixins/module_includer.pug').pipe(insert.append(str)).pipe(gulp.dest('dev/templates/mixins'));

        }

});
gulp.task('sass', function () {
        gulp.src('dev/scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
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
//////////////////////////////////////////////SSH

var config = {
    host: '185.22.233.89',
    port: 22,
    username: 'podpolkovnyk',
    password: 'Himfwhwbi1899FTP'
    //privateKey: fs.readFileSync('/Users/Sol/.ssh/id_rsa')
}
/*var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})*/
gulp.task('DEPLOY_WP', function() {

        return gulp
            .src(['integrator/WordPress/DIST/**'])
            .pipe(gulpSSH.dest('www/vrigroup.ru/wp-content/themes/VRI'))

})
gulp.task('WORDPRESS DIST', function() {

    //return gulp
        //.src(['integrator/WordPress/DRAFT/**'])
        //.pipe(gulp.dest('integrator/WordPress/DIST'));

})
/////////////////////////COMPONENTS BLUEPRINT
gulp.task('blueprint-wright-json', [], function() {
    var str = '{"blueprint" : "'+options.name+'"}';
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
    return gulp.src('blueprint/blueprint.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/'));
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
    gulp.src('blueprint/blueprint.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/'));
});
gulp.task('mergeJson',function () {
    gulp.src(['dev/**/*.json','blueprint/*.json'])
        .pipe(merge('data.json'))
        .pipe(gulp.dest('./'));

})