var gulp = require('gulp');
var runSequence  = require('run-sequence');
var data = require('./data.json');
var concat = require('gulp-concat');
var fs = require('fs');
var pug = require('gulp-pug');
var gm = require('gulp-gm');
var insert = require('gulp-insert');
var imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
var minimist = require('minimist');
var sass = require('gulp-sass');

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
gulp.task('browserreload',function () {
    browserSync.reload;
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
        var str = "//- "+attr.slug+".pug\nextends ../LAYOUT/layout.pug\nblock title\n\ttitle "+attr.title;
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
gulp.task('serve', [], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/*.css").on('change', browserSync.reload);
});
gulp.task('watchsass', ['scssconcatmodules','sass','browser-reload','views'], function() {
    gulp.watch('dev/MODULES/*/--*/*.scss',function(){ runSequence('scssconcatmodules', 'sass','browser-reload') });
    //gulp.watch('dev/MODULES/PROJECT MODULES/--*/*.scss',['scssconcatmodules','sass']);
    gulp.watch('dev/scss/**/*.scss',['sass', browserSync.reload]);
    //gulp.watch('dev/MODULES/*/--*/*.pug',['views']);
    gulp.watch('dev/**/*.pug',['views']);
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
    default: 'no'
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
            var str = "mixin "+options.name+"()";
            file('_mixin.pug', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///MIXIN SCSS
            var str = "@mixin "+options.name+"(){\n\t\n}";
            file('_mixin.scss', str)
                .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--'+options.name+'/'));
            ///DATA
            var str = '{\n\t"'+options.name+'" : {\n\t\t"1" : "1"\n\t}\n}';
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
    return gulp.src('dev/scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});
gulp.task('browser-reload',  function() {
    browserSync.reload

});