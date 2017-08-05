var gulp = require('gulp');
var downloadPath = '../../../Downloads/';
var foreach = require('gulp-foreach');
var wait = require('gulp-wait');
var frep = require('gulp-frep');
var path = require('path');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
const template = require('gulp-template');
var convert = require('convert-source-map');
const zip = require('gulp-zip');
var scsslint = require('gulp-scss-lint');
var css = require('css');
const cssScss = require('gulp-css-scss');
var merge = require('gulp-merge-json');
var data = require('./data.json');
htmlv = require('gulp-html-validator');
var Vinyl = require('vinyl');
var shell = require('gulp-shell');
var sassJson = require('gulp-sass-json');
var fs = require('fs');
var GulpSSH = require('gulp-ssh');
var htmlsplit = require('gulp-htmlsplit');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
//var batch = require('gulp-batch');
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
const del = require('del');
var Sync = require('sync');
var gulpsync = require('gulp-sync')(gulp);
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var pugPHPFilter = require('pug-php-filter');
var phplint = require('gulp-phplint');
const html2pug = require('gulp-html2pug');
var sftp = require('gulp-sftp');
var colors = require('colors');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);
var iconfontCss = require('gulp-iconfont-css');
var sourceMap = require('source-map');
var html2jade = require('html2jade');
var css = require('css');

// QUANT PLUGINS&FUNCTIONS


var qp_path = "./gulp plugins/";
const scriptCleaner = require(qp_path + 'scriptbuilder/scleaner');
const scriptThrower = require(qp_path + 'scriptbuilder/sthrower');
var qM = require(qp_path + 'q_functions');

//// Load Project
var globalData = JSON.parse(fs.readFileSync('globalData.json', 'utf8'));
var projectName = globalData.currentProject;
var projectDevDir = 'Projects/' + projectName + '/dev/';
var dist = 'Projects/' + projectName + '/dist';

//**********************************************************************************************************************

//// Load Project

gulp.task('loadProject', function () {
    var globalData = JSON.parse(fs.readFileSync('globalData.json', 'utf8'));
    console.log(globalData.currentProject);
});







gulp.task('phplint', function phplint() {
    gulp.src(dist + '/category.php')
        .pipe(phplint());
})


gulp.task('SCRIPTS2', function () {
    gulp.src('data.json')
        .pipe(scriptThrower({dist: dist, dev: projectDevDir}));
})

gulp.task('SCRIPTS ALL', gulpsync.sync(['SCRIPTS2'])
);


gulp.task('views', function buildHTML() {
    var data = JSON.parse(fs.readFileSync(projectDevDir + 'data.json', 'utf8'));
    gulp.src([projectDevDir + 'template/PAGESYSTEM/PAGES/*.pug', 'HUD/HUD.pug'])
        .pipe(pug({
            data: data,
            pretty: true,
            filters: {
                php: pugPHPFilter
            }
        })).pipe(gulp.dest(dist));
    var str = "include ../template/PAGESYSTEM/INCLUDES/_includes\n";
    gulp.src(projectDevDir + 'template/projectboard.pug').pipe(insert.prepend(str)).pipe(rename(function (path) {
        path.basename = 'index';
    }))
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('projectboard/'));
});


///////////////////////////////////////////////////////// CHANGE DIST //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('PAGESYSTEM', function () {
    for (var index in data.pages) {
        var attr = data.pages[index];
        if (attr.layout == 'default')
            var str = "//- " + attr.slug + ".pug\nextends ../LAYOUT/layout.pug\nblock title\n\t-var page={slug:'" + attr.slug + "',title:'" + attr.title + "'};\n\ttitle " + attr.title;
        else
            var str = "//- " + attr.slug + ".pug\nextends ../LAYOUT/" + attr.layout + "/layout.pug\nblock title\n\t-var page={slug:'" + attr.slug + "',title:'" + attr.title + "'};\n\ttitle " + attr.title;
        if (!fs.existsSync('dev/template/PAGESYSTEM/PAGES/' + attr.slug + '.pug') && !fs.existsSync('dev/scss/PAGES/_' + attr.slug + '.scss')) {
            file(attr.slug + '.pug', str)
                .pipe(gulp.dest('dev/template/PAGESYSTEM/PAGES'));

            var pageName = attr.slug.toUpperCase();
            gulp.src('vendor/file_templates/PAGES/Styles/_page.scss.tpl')
                .pipe(rename('off_' + attr.slug + '-page.scss'))
                .pipe(template({name: pageName}))
                .pipe(gulp.dest('dev/scss/PAGES/'))

        }

    }

});


/////////////////////////////////////
gulp.task('SERVER', [], function () {

    browserSync.init({
        server: dist,
        index: "HUD.html"
    });

    gulp.watch([dist + "index.html", dist + "/*.css"]).on('change', browserSync.reload);


});


gulp.task('VIEW-FINAL', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([
        'dev/ELEMENTS/_elements.pug',
        'dev/MIXES/_mixes.pug',
        'dev/MODULES/_modules.pug',
        'data.json',
        projectDevDir + 'template/**/*.pug',
        'blueprint/*.pug',
        '!dev/template/PAGESYSTEM/SCRIPTS-STYLES/**/*'
    ], function () {
        gulp.start('views');
        gulp.start('compile-blueprint-view');
    });
});

gulp.task('VIEW-1-ELEMENTS', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/ELEMENTS/**/*.pug',
        '!dev/ELEMENTS/_elements.pug'
    ], function () {
        gulp.start('concat-elements-pug');
    });
});
gulp.task('VIEW-1-MIXES', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/MIXES/**/*.pug',
        '!dev/MIXES/_mixes.pug'
    ], function () {
        gulp.start('concat-mixes-pug');
    });
});
gulp.task('WATCHCSSTOPARSEIT', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([
        dist+'/main.css',
    ], function () {
        gulp.start('parc');
    });
});
gulp.task('VIEW-1-MODULES', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/MODULES/**/_mixin.pug',
        '!dev/MODULES/_modules.pug'
    ], function () {
        gulp.start('concat-modules-pug');

    });
});

gulp.task('VIEW-1-DATA', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/**/*.json',
        '!dev/scss/MASTER_OPTIONS/*.json',
        '!dev/SOURCE_FABRIC/**/*.json'
    ], function () {
        runSequence('mergeJson');

    });
});

// SERVER WATCHER
gulp.task('SERVER WATCHER', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([dist + "/index.html", dist + "/*.css", projectDevDir + "SCRIPTS/scriptMap.js"], function () {
        browserSync.reload();

    });
});
gulp.task('WATCH-MODULE-FOLDERS', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/MODULES/**/*/',
        '!dev/MODULES/_modules.pug',
        '!dev/MODULES/_modules.scss',
        '!dev/MODULES/**/_include.pug',
        '!dev/MODULES/**/_mixin.scss',
        '!dev/MODULES/**/data.json',
        '!dev/MODULES/**/_starter.scss',
        '!dev/MODULES/**/info.mmd',
        '!dev/MODULES/**/_mixin.pug',
        '!dev/MODULES/**/libs.json',


    ], function () {
        runSequence('concat-modules-pug', 'concat-modules-scss');

    });
});


// STYLES

gulp.task('STYLES-FINAL', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([
        'dev/scss/**/*.scss',
        '!dev/scss/PAGES/*-page.scss',
        'dev/ELEMENTS/_elements.scss',
        'dev/MIXES/_mixes.scss',
        'dev/MODULES/_modules.scss',
        'blueprint/*.scss',
    ], function () {
        gulp.start('styles');
        gulp.start('compile-blueprint-sass');
        gulp.start('throw-main-css');

    });
});
gulp.task('STYLES-1-ELEMENTS', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([
        'dev/ELEMENTS/**/--*/*.scss',
        '!dev/ELEMENTS/_elements.scss'
    ], function () {
        gulp.start('concat-elements-scss');
    });
});


gulp.task('STYLES-1-PAGES', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([
        'dev/scss/PAGES/*.scss',
        '!dev/scss/PAGES/off_*.scss',
        '!dev/scss/PAGES/_pages.scss'
    ], function () {
        gulp.start('concat-pages-scss');
    });
});


gulp.task('STYLES-1-MIXES', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

        'dev/MIXES/**/*.scss',
        '!dev/MIXES/_mixes.scss'
    ], function () {
        gulp.start('concat-mixes-scss');
    });
});
gulp.task('STYLES-1-MODULES', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch([

            'dev/MODULES/**/--*/*.scss',
            '!dev/MODULES/_modules.scss']
        , function () {
            gulp.start('concat-modules-scss');
        });
});
//SCRIPTS
gulp.task('SCRIPTS-FINAL', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch(['dev/**/*.js','!dev/**/quant-debug-JsonCss.js']
        , function () {
            gulp.start('SCRIPTS ALL');
        });
});
gulp.task('WATCHER:NEW', function () {
    runSequence([

        'VIEW-FINAL', 'VIEW-1-MIXES', 'VIEW-1-MODULES', 'VIEW-1-ELEMENTS', 'VIEW-1-DATA',
        'STYLES-FINAL', 'STYLES-1-MIXES', 'STYLES-1-ELEMENTS', 'STYLES-1-MODULES', 'STYLES-1-PAGES',
        'SCRIPTS-FINAL',
        'SERVER WATCHER',
        'readyWatcher'
    ])
})

gulp.task('BUILDUP'

    , function (callback) {

        runSequence(
            'mergeJson',
            'concat-elements-pug',
            'concat-mixes-pug',
            'concat-modules-pug',

            'views',
            'concat-mixes-scss',
            'concat-elements-scss',
            'concat-modules-scss',
            'styles',
            'SCRIPTS ALL')
        callback();
    }
)


gulp.task('readyWatcher', function () {
    qM.ok('WATCHER READY');
})


gulp.task('optimage', [], function () {
    gulp.src(dist + '/not_opt_images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dist + '/images'))
});
gulp.task('image_resize', [], function () {
    gulp.src(dist + '/images/*')
        .pipe(imageResize({
            width: 1200,
            height: 567,
            crop: true,
            upscale: true
        }))
        .pipe(gulp.dest(dist + '/images-rs'));
});


///////////////// CONCATS

gulp.task('concat-modules-and-mixes', function () {
    gulp.src(['dev/MODULES/MENUS/--*/*.scss', 'dev/MODULES/PROJECT MODULES/--*/*.scss'])
        .pipe(concat('_modules.scss'))
        .pipe(gulp.dest('dev/MODULES/'));
    gulp.src(['dev/MIXES/**/_style.scss'])
        .pipe(concat('_mixes.scss'))
        .pipe(gulp.dest('dev/MIXES/'));
    gulp.src(['dev/MIXES/**/_mixin.pug'])
        .pipe(concat('_mixes.pug'))
        .pipe(gulp.dest('dev/MIXES/'));

});


gulp.task('concat-elements', function () {

    gulp.src('dev/ELEMENTS/*/--*/*.scss')
        .pipe(concat('_elements.scss'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
    gulp.src('dev/ELEMENTS/*/--*/*.pug')
        .pipe(concat('_elements.pug'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
});

gulp.task('concat-elements-pug', function () {


    gulp.src('dev/ELEMENTS/*/--*/*.pug')
        .pipe(concat('_elements.pug'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
});

gulp.task('concat-elements-scss', function () {


    gulp.src('dev/ELEMENTS/*/--*/*.scss')
        .pipe(concat('_elements.scss'))
        .pipe(gulp.dest('dev/ELEMENTS/'));
});

gulp.task('concat-pages-scss', function () {


    gulp.src(['dev/scss/PAGES/*.scss', '!dev/scss/PAGES/off_*.scss', '!dev/scss/PAGES/_pages.scss'])
        .pipe(concat('_pages.scss'))
        .pipe(gulp.dest('dev/scss/PAGES/'));
});

gulp.task('concat-mixes-pug', function () {

    gulp.src(['dev/MIXES/**/_mixin.pug'])
        .pipe(concat('_mixes.pug'))
        .pipe(gulp.dest('dev/MIXES/'));
});

gulp.task('concat-mixes-scss', function () {


    gulp.src('dev/MIXES/**/_style.scss')
        .pipe(concat('_mixes.scss'))
        .pipe(gulp.dest('dev/MIXES/'));
});


gulp.task('concat-modules-scss', function () {


    gulp.src('dev/MODULES/*/--*/*.scss')
        .pipe(concat('_modules.scss'))
        .pipe(gulp.dest('dev/MODULES/'));

});

gulp.task('concat-modules-pug', function (done) {


    gulp.src('dev/MODULES/*/--*/_mixin.pug')
        .pipe(concat('_modules.pug'))
        .pipe(gulp.dest('dev/MODULES/'));
    done();

});


var buildmodulesData = {
    string: 'name',
    default: 'no',
};
var options = minimist(process.argv.slice(2), buildmodulesData);

//////////////////////////////////////////////////////////
var type = {
    string: 'type',
    default: 'link',
};

var extend = {
    string: 'extend',
    default: 'NO',
};
var elemType = minimist(process.argv.slice(2), type);
var elementName = minimist(process.argv.slice(2), buildmodulesData);
var elemExtend = minimist(process.argv.slice(2), extend);

gulp.task('be', function () {


    var dir = elemType.type.toUpperCase() + 'S';
    var elemName = elementName.name;
    var elemData = {
        elementName: elemName,
        dir: dir
    }

    if (!fs.existsSync('dev/ELEMENTS/' + dir + '/--' + elemName)) {


        var elemTemplates = fs.readdirSync('vendor/file_templates/ELEMENTS/' + dir + '/_templates/');

        if (elemExtend.extend) {

            elemData.extend = elemExtend.extend;
            elemName += '( ' + elemExtend.extend + ' )';


        }

        for (var key in elemTemplates) {

            var file = elemTemplates[key].slice(1, -4);

            if (elemExtend.extend && file == 'extend.scss') {

                file = 'style.scss'
            }

            else if (elemExtend.extend && file == 'style.scss') {
                continue;
            } else if (!elemExtend.extend && file == 'extend.scss') {
                continue;
            }
            if (file == 'elementScript.js') file = elemName + '.js';

            gulp.src('vendor/file_templates/ELEMENTS/' + dir + '/_templates/' + elemTemplates[key])
                .pipe(rename(file))
                .pipe(template(elemData))
                .pipe(gulp.dest('dev/ELEMENTS/' + dir + '/--' + elemName + '/'))


        }

        qM.ok('Element added!');
    } else qM.err('THIS ELEMENT ALREADY EXIST!');

});

gulp.task('bm', function () {

    if (!fs.existsSync('dev/MODULES/PROJECT MODULES/--' + options.name)) {


        var moduleName = options.name,
            elemData = {
                moduleName: moduleName
            },

            moduleTemplates = fs.readdirSync('vendor/file_templates/MODULES/_templates/');
        try {
            for (var key in moduleTemplates) {

                var file = moduleTemplates[key].slice(1, -4);
                if (file == 'moduleScript.js') file = moduleName + '.js';

                gulp.src('vendor/file_templates/MODULES/_templates/' + moduleTemplates[key])
                    .pipe(rename(file))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--' + moduleName + '/'))
            }
        } catch (e) {

            qM.err(e.name + ' ' + e.message);

        }
        qM.ok('Module added!');


    } else qM.err('THIS MODULE ALREADY EXIST!');

});

gulp.task('bs', function () {

    if (!fs.existsSync('dev/SCRIPTS/SCRIPTS/--' + options.name)) {


        var scrName = options.name,
            elemData = {
                name: scrName
            },

            templates = fs.readdirSync('vendor/file_templates/SCRIPTS/_templates/');
        try {
            for (var key in templates) {

                var file = templates[key].slice(1, -4);

                if (file == 'template.js') file = scrName + '.js';

                gulp.src('vendor/file_templates/SCRIPTS/_templates/' + templates[key])
                    .pipe(rename(file))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/SCRIPTS/SCRIPTS/--' + scrName + '/'))
            }
        } catch (e) {

            qM.err(e.name + ' ' + e.message);

        }
        qM.ok('Script added!');


    } else qM.err('THIS SCRIPT ALREADY EXIST!');

});

gulp.task('bmx', function () {

    if (!fs.existsSync('dev/MIXES/' + options.name)) {


        var scrName = options.name,
            elemData = {
                name: scrName
            },

            templates = fs.readdirSync('dev/MIXES/_templates/');
        try {
            for (var key in templates) {

                var file = templates[key].slice(1, -4);


                gulp.src('dev/MIXES/_templates/' + templates[key])
                    .pipe(rename(file))
                    .pipe(template(elemData))
                    .pipe(gulp.dest('dev/MIXES/' + scrName + '/'))
            }
        } catch (e) {

            qM.err(e.name + ' ' + e.message);

        }
        qM.ok('MIX added!');


    } else qM.err('THIS MIX ALREADY EXIST!');

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var alredyCompile = false;
gulp.task('styles', function () {
    if (!alredyCompile) {
        alredyCompile = true;
        gulp.src('dev/scss/main.scss')
            .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(sourcemaps.write('maps/'))
            .pipe(gulp.dest(dist))
            .pipe(gulp.dest('blueprint'))
            .pipe(gulp.dest('projectboard'));

        gulp.src('dev/scss/MASTER_OPTIONS/*.scss')
            .pipe(sassJson())
            .pipe(gulp.dest('dev/scss/MASTER_OPTIONS/'));
        alredyCompile = false;


    }

});
gulp.task('throw-main-css', function () {
    gulp.src(dist + '/main.css')
        .pipe(gulp.dest('blueprint'));
});
gulp.task('browser-reload', function () {
    browserSync.reload

});
var htmlhint = require("gulp-htmlhint");
gulp.task('validw3c', function () {
    gulp.src(dist + '/index.php.html')
        .pipe(htmlv({format: 'html'}))
        .pipe(gulp.dest(dist + '/1/'));
});
//////////////////// WORDPRESS
gulp.task('makeWP_DRAFT', function () {
    gulp.src(['integrator/WordPress/style.css', dist + '/main.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT/'));
    gulp.src(['integrator/WordPress/header.php', dist + '/splits/header.html'])
        .pipe(concat('header.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
    gulp.src(['integrator/WordPress/footer.php', dist + '/splits/footer.html'])
        .pipe(concat('footer.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
    gulp.src(['integrator/WordPress/index.php', dist + '/splits/index.html'])
        .pipe(concat('index.php'))
        .pipe(gulp.dest('integrator/WordPress/DRAFT'));
    gulp.src([dist + '/images/*', dist + '/images_rs/*'])
        .pipe(gulp.dest('integrator/WordPress/DRAFT/images/'));
////////////////////////
    for (var index in data.pages) {
        var attr = data.pages[index];
        if (attr.slug !== 'index' && !attr.shop == true)
            gulp.src(['integrator/WordPress/page.php', dist + '/splits/' + attr.slug + '.html'])
                .pipe(concat('page-' + attr.slug + '.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT'));
        else if (attr.shop == true) {
            gulp.src(['integrator/WordPress/wc shop/LOOP/archive-product.php', dist + '/splits/production.html'])
                .pipe(concat('archive-product.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/LOOP/single-product.php', dist + '/splits/product.html'])
                .pipe(concat('single-product.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-single-product.php', dist + '/splits/product.html'])
                .pipe(concat('content-single-product.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-product.php', dist + '/splits/category.html'])
                .pipe(concat('content-product.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));

            gulp.src(['integrator/WordPress/wc shop/CONTENT/content-product_cat.php', dist + '/splits/production.html'])
                .pipe(concat('content-product_cat.php'))
                .pipe(gulp.dest('integrator/WordPress/DRAFT/woocommerce/'));
        }

    }
    //////////////////////////////

});
gulp.task('splitter', function () {
    gulp.src(dist + '/*.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest(dist + '/splits/'));
})

/////////////////////////COMPONENTS BLUEPRINT
gulp.task('blueprint-wright-json', [], function () {
    if (distoptions.izolate) {
        var izolate = ',\n"izolate":"true"';

    } else var izolate = ',\n"izolate":"false"';
    var str = '{"blueprint" : "' + options.name + '"' + izolate + '}';
    file('blueprint.json', str)
        .pipe(gulp.dest('blueprint/'));
});

gulp.task('merge-json', [], function () {
    gulp.src(['dev/**/*.json', 'blueprint/*.json'])
        .pipe(merge('data.json'))
        .pipe(gulp.dest('./'));
});
gulp.task('compile-blueprint-view-start', [], function () {
    data.blueprint = options.name;
    gulp.src('blueprint/*.pug')
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('blueprint/'));
})
gulp.task('compile-blueprint-view', [], function () {
    var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    gulp.src('blueprint/*.pug')
        .pipe(pug({
            data: obj,
            pretty: true,
        })).pipe(gulp.dest('blueprint/'));
})
gulp.task('compile-blueprint-sass', [], function () {
    gulp.src('blueprint/_blueprint.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/'));
    if (distoptions.izolate) {
        gulp.src('dev/MODULES/PROJECT MODULES/--' + data.blueprint + '/_starter.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest('blueprint/'));

    }


})

gulp.task('start-blueprint-server', [], function () {
    var browserSyncComponent = require('browser-sync').create();

    browserSyncComponent.init({
        server: "blueprint",
        cssOutlining: true
    });
    gulp.watch("blueprint/*.html").on('change', browserSyncComponent.reload);
    gulp.watch("dist/*.css").on('change', browserSyncComponent.reload);

})


gulp.task('bp', [], function () {

    runSequence('blueprint-wright-json',
        ['merge-json', 'compile-blueprint-view-start', 'compile-blueprint-sass'],
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
gulp.task('mergeJson', function () {
    return gulp.src([
        'dev/{MODULES,ELEMENTS,SCRIPTS}/**/--*/*.json',
        'dev/template/**/*.json',
        'dev/scss/MASTER_OPTIONS/*.json',
        'blueprint/*.json',
        '!dev/SOURCE_FABRIC/STORRAGE/**/*.json',
        '!dev/{MODULES,ELEMENTS,SCRIPTS}/**/--*/off_*.json'
    ])
        .pipe(merge('data.json'))
        .pipe(gulp.dest('./'));

})
gulp.task('cleanMainCss', function () {
    return gulp.src(dist + '/main.css', {read: false})
        .pipe(clean());
});

gulp.task('split-css', function () {
    return gulp.src(dist + '/main.css')
        .pipe(uncss({
            html: [dist + '/**/*.html']
        }))
        .pipe(gulp.dest(dist + '/'));
});
var distData = {
    boolean: 'izolate',
    default: false,
};
var distoptions = minimist(process.argv.slice(2), distData);

gulp.task('tests', [], function () {
        if (distoptions.izolate) {
            console.log('hello')
        } else {
            console.log('by by')
        }
    }
)

gulp.task(dist + '-module', [], function () {
    var str = "include ../../../template/PAGESYSTEM/INCLUDES/_includes\n";
    gulp.src('dev/MODULES/PROJECT MODULES/--' + options.name + '/_include.pug').pipe(insert.prepend(str))
        .pipe(pug({
            data: data,
            pretty: true,
        })).pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--' + options.name + '/DIST/'));
    var dest = 'dev/MODULES/PROJECT MODULES/--' + options.name + '/DIST/_include.html'
    gulp.src(dist + '/main.css')
        .pipe(uncss({
            html: [dest]
        }))
        .pipe(gulp.dest('dev/MODULES/PROJECT MODULES/--' + options.name + '/DIST/'));

});
gulp.task('testizmodul', [], function () {
    gulp.src('dev/MODULES/PROJECT MODULES/--pagination/_starter.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('blueprint/starter.css'));
})

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
gulp.task('crop', [], function () {
    var gravity = '';
    switch (resOptionTo.to) {
        case 'N':
            gravity = 'North';
            break;
        case 'NE':
            gravity = 'NorthEast';
            break;
        case 'E':
            gravity = 'East';
            break;
        case 'SE':
            gravity = 'SouthEast';
            break;
        case 'S':
            gravity = 'South';
            break;
        case 'SW':
            gravity = 'SouthWest';
            break;
        case 'W':
            gravity = 'West';
            break;
        case 'NW':
            gravity = 'NorthWest';
            break;
        default:
            gravity = 'Centr';
    }
    console.log(gravity)
    if (!resOptionW.w) {
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function (stream, file) {
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix) {
                        path.basename = resOptionPref.prefix + '-' + imageQ;
                    }
                    else {
                        path.basename += '-auto_X_' + resOptionH.hi;
                    }
                }))
        }))
            .pipe(imageResize({
                gravity: gravity,
                height: resOptionH.hi,
                crop: true,
                upscale: false
            })).pipe(gulp.dest(dist + '/irs'));
    } else {
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function (stream, file) {
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix) {
                        path.basename = resOptionPref.prefix + '-' + imageQ;
                    }
                    else {
                        path.basename += resOptionW.w + '_X_' + resOptionH.hi;
                    }
                }))

        }))
            .pipe(imageResize({
                gravity: gravity,
                width: resOptionW.w,
                height: resOptionH.hi,
                crop: true,
                upscale: false
            })).pipe(gulp.dest(dist + '/irs'));
    }


});

gulp.task('scale', [], function () {

    if (!resOptionW.w) {
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function (stream, file) {
            imageQ++;
            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix) {
                        path.basename = resOptionPref.prefix += '-' + imageQ;
                    }
                    else {
                        path.basename += '-autoX_' + resOptionH.hi;
                    }
                }))

        }))
            .pipe(imageResize({
                height: resOptionH.hi,
                crop: false,
                upscale: true
            })).pipe(gulp.dest(dist + '/irs'));
    } else {
        gulp.src('dev/SOURCE FABRIC/HALL/*').pipe(foreach(function (stream, file) {
            imageQ++;

            return stream
                .pipe(rename(function (path) {
                    if (resOptionPref.prefix) {
                        path.basename = resOptionPref.prefix += '-' + imageQ;
                    }
                    else {
                        path.basename += '-' + resOptionW.w + '_X_auto'
                    }
                }))

        }))
            .pipe(imageResize({
                width: resOptionW.w,
                height: resOptionH.hi,
                crop: false,
                upscale: true
            })).pipe(gulp.dest(dist + '/irs'));
    }


});
gulp.task('pb', [], function () {
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

    gulp.src('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/**/*.{ttf,otf}').pipe(foreach(function (stream, file) {

        var name = path.basename(file.path, path.extname(file.path));
        var dirs = file.path.split('\\')
        var i = dirs.length;
        var stl = dirs[i - 2];
        var weight = dirs[i - 3];
        var family = dirs[i - 4];
        var role = dirs[i - 5];
        console.log(!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_' + role + '.scss'));
        if (!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_' + role + '.scss')) {
            fs.closeSync(fs.openSync('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_' + role + '.scss', 'w'));
        }
        var str = "'" + name + "':('" + role + "','" + family + "','" + name + "'," + stl + "," + weight + "),\n\t";
        gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_' + role + '.scss').pipe(insert.append(str)).pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'));
        return stream
    }))
})


var fr = {
    string: 'role',
    default: '--MAIN',
};
var fontrole = minimist(process.argv.slice(2), fr);

gulp.task('regfont', function () {
    if (!fs.existsSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role)) fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role);
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name);
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Bold');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Bold/italic');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Bold/normal');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Light');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Light/italic');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Light/normal');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Normal');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Normal/italic');
    fs.mkdirSync('dev/SOURCE_FABRIC/FONT_LAB/SOURCE/' + fontrole.role + '/' + options.name + '/Normal/normal');
})
gulp.task('wrapfontVars', function () {
    gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/*.scss').pipe(foreach(function (stream, file) {
        var name = (path.basename(file.path, path.extname(file.path))).slice(1, (path.basename(file.path, path.extname(file.path))).length);
        console.log(name);
        gulp.src('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/_' + name + '.scss').pipe(insert.wrap("'" + name + "':(", "),")).pipe(gulp.dest("dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/"));
        return stream;
    }))

});


gulp.task('concatVars', function () {
    gulp.src(['dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/*.scss'])
        .pipe(concat({path: 'variables.scss', stat: {mode: 0666}}))
        .pipe(insert.wrap('$FONTS:(', ');')).pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'))
        .pipe(gulp.dest('dev/SOURCE_FABRIC/FONT_LAB/FONT_FACE/VARIABLES/'));
});
gulp.task('buildfonts', function () {


    runSequence(
        'convertfonts', 'fontvars'
    );

});
gulp.task('buildfonts2', function () {


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


////////////////////////////////////////////////////
gulp.task('bsold', [], function () {
    var elemData = {
        name: options.name
    }
    gulp.src('dev/SCRIPTS/SCRIPTS/_template.json.tpl')
        .pipe(rename('libs.json'))
        .pipe(template(elemData))
        .pipe(gulp.dest('dev/SCRIPTS/SCRIPTS/' + options.name + '/'));

    gulp.src('dev/SCRIPTS/SCRIPTS/_template.js.tpl')
        .pipe(rename(options.name + '.js'))
        .pipe(template(elemData))
        .pipe(gulp.dest('dev/SCRIPTS/SCRIPTS/' + options.name + '/'));
});

gulp.task('svgstore', function () {
    return gulp
        .src('dev/SOURCE_FABRIC/ICONS_COMBINER/icons/**/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(dist + '/icons/'));
});
gulp.task('svgstore-debug', function () {
    return gulp
        .src('dev/SOURCE_FABRIC/ICONS_COMBINER/icons-debug/**/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('vendor/icons/'));
});

//////////////////////////////////////////////////////
gulp.task('START QUANT', function () {
    runSequence('API-SERVER','WATCHER:NEW', 'SERVER','WATCHCSSTOPARSEIT')
});


/////UTILITIES
gulp.task('u-h2p', function () {
    // Backend locales
    return gulp.src('utilities/htmlToPug/inderx.html')
        .pipe(html2pug())
        .pipe(gulp.dest('utilities/htmlToPug/pr'));
});
gulp.task('deploycss', function () {
    return gulp.src(dist + '/main.css')
        .pipe(rename('template_styles.css'))
        .pipe(sftp({
            host: 'ove-cfo.ru',
            user: 'podpolkovnyk',
            pass: 'xM9KsjsJ',
            remotePath: '/var/www/podpolkovnyk/data/www/ove-cfo.ru/bitrix/template/mobile'
        }));
});

// ICON FONT

var fontName = 'Icons';

gulp.task('iconfont', function () {
    gulp.src(['dev/SOURCE_FABRIC/ICONFONT/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'dev/scss/_iconFont.tmp',
            targetPath: '../scss/_iconFont.scss',
            fontPath: 'fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(dist + '/fonts/icons/'));
});
gulp.task('cache', function (done) {
    return cache.clearAll(done);
});

gulp.task('[D] DIST FRONT-END', function (done) {
    var dateTime = new Date().toString();
    gulp.src(dist + '/**/*')
        .pipe(zip(dist + '_' + dateTime + '.zip'))
        .pipe(gulp.dest('../'))
});

gulp.task('parc', function () {
    var ast = css.parse(file = fs.readFileSync(dist + '/main.css', "utf8"));
    fs.writeFileSync(dist+"/scripts/quant-debug-JsonCss.js", 'var jsonCss = ' + JSON.stringify(ast));

});
gulp.task('cocs', function () {
    gulp.src([downloadPath + '/*.scss', 'dev/scss/_draft.scss'])
        .pipe(concat('_draft3.scss'))
        .pipe(gulp.dest('dev/scss/'));

});
gulp.task('cocsWatch', function () {
    return watch([downloadPath + '/*.inf'], function () {
        gulp.start('shorthand');
    });

});
gulp.task('scss-lint', function () {
    return gulp.src('dev/scss/_draft3.scss')
        .pipe(scsslint({
            'config': 'slint.yml',
        }))
        .pipe(gulp.dest('dev/scss/_draft3e.scss'));
});
gulp.task('frep', function () {
    var patterns = [
        {

            pattern: /header\.mainHeader/ig,
            replacement: 'header.mainHeaderoooo'
        }
    ];
    gulp.src('dev/scss/_draft3.scss')
        .pipe(frep(patterns))
        .pipe(gulp.dest('dev/scss/_draft4.scss'))
});
gulp.task('css-scss', () => {
    return gulp.src('dev/scss/_draft3.scss')
        .pipe(cssScss())
        .pipe(gulp.dest('scss'));
});


gulp.task('readMap', () => {
    var resursPath = '';
    // var dataMap = JSON.parse(fs.readFileSync(dist+'/maps/main.css.map', 'utf8'));//
    // var file = fs.readFileSync(downloadPath+'msg.qnt', "utf8")//
    //
    // var fileArr = file.split('-');
    //     console.log(fileArr);
    var col = fileArr[1];
    var line = fileArr[0];

    var smc = new sourceMap.SourceMapConsumer(dataMap);
    var orLine = '';
    smc.eachMapping(function (m) {

        if (m.generatedLine == line && m.generatedColumn == col) {

            resursPath = m.source;
            orLine = m.originalLine;
            console.log(orLine);
            gulp.src(dist + '/maps/main.css.map', {read: false}).pipe(shell(['/Applications/PhpStorm.app/Contents/MacOS/phpstorm --line ' + orLine + ' ~/Desktop/QUANT/kit/dev/scss/' + resursPath]))
            fs.unlinkSync(downloadPath + 'msg.qnt', "utf8")
        }

    })
    return resursPath

});

gulp.task('API-SERVER', function () {

    var http = require('http');
    var url = require('url');
    var querystring = require('querystring');

    function accept(req, res) {

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });
        var srvRes = '';

        if (req.method == 'GET') {
            var url_parts = url.parse(req.url, true);
            console.log(url_parts.query);
            //GET SOURCE CODE

            if (url_parts.query) {


                switch (url_parts.query.action) {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    case 'createProject' :
                        var data = url_parts.query.data;
                        console.log(JSON.parse(data));
                        break;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    case 'getProjects' :

                       var pjs = fs.readdirSync('Projects')
                        .filter(file => fs.lstatSync(path.join('Projects', file)).isDirectory())
                        srvRes = pjs.toString();
                        break;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    case 'loadProject' :

                        var pro = url_parts.query.projectName;
                        var globalData = JSON.parse(fs.readFileSync('globalData.json', 'utf8'));
                        globalData.currentProject = pro;
                        globalData = JSON.stringify(globalData);
                        fs.writeFileSync("globalData.json", globalData);
                        break;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    case 'getSourceCode' :

                        if (url_parts.query.line && url_parts.query.col) {
                            var line = url_parts.query.line;
                            var col = url_parts.query.col;
                            srvRes = getCssSource(line, col);

                        }
                        break;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    case 'html2jade' :
                        var html = url_parts.query.html;
                        console.log(html);
                        html2jade.convertHtml(html, {'donotencode': true, 'bodyless': true}, function (err, jade) {
                            srvRes = jade;
                        });

                        break;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    case 'creator' :
                        var contentType = url_parts.query.element

                        switch (contentType) {
                            case 'element': {

                                var name = url_parts.query.title,
                                    type = url_parts.query.elementType,
                                    extnds = url_parts.query.elementExtends,
                                    prnt = url_parts.query.elementParent,
                                    save = url_parts.query.saveToGlobal;

                                gulp.task('creator', shell.task([
                                    'gulp be --name ' + name + ' --type ' + type
                                ]))
                                gulp.start('creator')

                            }

                        }
//////////////////////////////////////////////////////////////////////////////////////
                } //END SWITCH GET QUERY
////////////////////////////////////////////////////////////////////////////////////////

            }

        } else if (req.method == 'POST') { /////// POST

            var body = '';
            req.on('data', function (data) {
                body += data;
                body = JSON.parse(body);
                console.log(body);

///////////////////////////////////////////////////////////////////////CREATE PROJECT
            if(body.mainOpt){
                console.log('OK POST')

////////////////////////////////////////////////////////////////////// SELECTORS
            }else if (body.selectorData)
                {

                var col='';
                var line='';
                var orderLine =[];


                for (var i in body.selectorData){

                    line = body.selectorData[i].position.split('_')[1];
                    orderLine.push(line)
                }
                var ruleLine = orderLine.slice(0);
                orderLine.sort(function(a, b){return b-a});
                console.log(ruleLine)
                console.log(orderLine)
                for (var i in orderLine){

                    var dataIndex = ruleLine.indexOf(orderLine[i]);

                    body.selectorData[dataIndex];

                    var className = '.' + body.selectorData[dataIndex].selectorName;
                    var properties = body.selectorData[dataIndex].stylesObject;
                    var media = body.selectorData[dataIndex].media;
                    var pElProps = body.selectorData[dataIndex].pseudoSelectors;

                    var string =  className + '{';

                    for (var ix in properties) {

                        string += '\n\t' + properties[ix].propery+':' + properties[ix].value+ ';';
                    }

                    if (media.length>0){
                        for (var im in media){
                            var rule = media[im][0];
                            var styles = media[im][1].declarations;
                            string +='\n@for'+rule+'{';
                            for(var i in styles){
                                string+='\n\t'+styles[i].property+':'+styles[i].value+';';

                            }
                            string+='}';
                        }


                    }

                    console.log(string)
                }
            }

//END OF ONE

                // for (var key in body.save) {
                //
                //     var type = body.save[key].type
                //     var subType = body.save[key].subType
                //     var name = body.save[key].name
                //     var className = body.save[key].className
                //     var properties = body.save[key].properties
                //     var pElProps = body.save[key].pElProperties
                //     var media = body.save[key].mediaProperties
                //     console.log(projectDevDir + type + 's/' + subType + 's/--' + name + '/' + className + '.scss')
                //
                //
                //     var string = '.' + className + '{';
                //
                //     // PROPERTIES
                //     for (key in properties) {
                //
                //         string += '\n\t' + key.replace('_', '-') + ':' + properties[key] + ';';
                //     }
                //
                //     // PSEUDO ELEMENTS
                //     for (pseudoSel in pElProps) {
                //
                //         string += '\n\t&:' + pseudoSel.replace('_', '-') + '{';
                //         for (key in pElProps[pseudoSel]) {
                //             string += '\n\t\t' + key.replace('_', '-') + ':' + pElProps[pseudoSel][key] + ';';
                //         }
                //         string += '\n\t}';
                //
                //
                //     }
                //
                //     // MEDIA
                //
                //     for (mediaPoint in media) {
                //
                //         string += '\n\t@include for-size(' + mediaPoint.replace('_', '-') + '){';
                //
                //         for (key in media[mediaPoint].properties) {
                //             string += '\n\t\t' + key.replace('_', '-') + ':' + media[mediaPoint].properties[key] + ';';
                //         }
                //
                //         for (pseudoSel in media[mediaPoint].pElProperties) {
                //
                //             string += '\n\t\t&:' + pseudoSel.replace('_', '-') + '{';
                //             for (key in media[mediaPoint].pElProperties[pseudoSel]) {
                //                 string += '\n\t\t\t' + key.replace('_', '-') + ':' + media[mediaPoint].pElProperties[pseudoSel][key] + ';';
                //             }
                //             string += '\n\t\t}';
                //
                //
                //         }
                //         string += '\n\t}';
                //     }
                //
                //
                //     //END FILE
                //     string += '\n}';
                //
                //     // WRITE FILE
                //     fs.writeFileSync(projectDevDir + type + 's/' + subType + '/--' + name + '/classes/' + className + '.scss', string);
                //
                //
                //     // INCLUDE FILES
                //     var clFiles = fs.readdirSync(projectDevDir + type + 's/' + subType + '/--' + name + '/classes/');
                //
                //     string = ''
                //
                //     for (key in clFiles) {
                //
                //         string += '@import "classes/' + clFiles[key] + '";\n'
                //     }
                //     fs.writeFileSync(projectDevDir + type + 's/' + subType + '/--' + name + '/style.scss', string);
                //     ////////////////////////////////////////////
                //
                //
                // }
            });
        }

        res.end(srvRes);

    }

    http.createServer(accept).listen(8181);


});

//gulp.task('openStorm', shell.task(['/Applications/PhpStorm.app/Contents/MacOS/phpstorm /Users/admin/Desktop/QUANT/kit --line 1 /Users/admin/Desktop/QUANT/kit/dev/scss/'+resursPath]))


// file = fs.readFileSync(downloadPath+'inf.inf', "utf8")
// gulp.task('shorthand', shell.task([
//     file
//
// ]))
gulp.task('shorthand', shell.task(['/Applications/PhpStorm.app/Contents/MacOS/phpstorm --line 12 ~/Desktop/QUANT/kit/dev/scss/main.css']));


//////////////////////// SERVER FUNCTIONS

function getCssSource(line, col, noContent) {
    var resursPath = '';
    var pugFileContent = '';
    var jsFileContent = '';
    var dataMap = JSON.parse(fs.readFileSync(dist + '/maps/main.css.map', 'utf8'));
    var smc = new sourceMap.SourceMapConsumer(dataMap);
    var orLine = '';
    smc.eachMapping(function (m) {
        if (m.generatedLine == line && m.generatedColumn == col) {
            console.log((smc.sourceContentFor(m.source)));
            resursPath = m.source;
            orLine = m.originalLine;
        }
    })
    if (noContent) {
        return resursPath + '[^]' + orLine + '[^]';
    } else {
        pugFileContent = fs.readFileSync(projectDevDir + 'template/PAGESYSTEM/PAGES/index.pug', "utf8");
        jsFileContent = fs.readFileSync('dev/SCRIPTS/SCRIPTS/--xRayView/xRayView.js', "utf8")
        return resursPath + '[^]' + orLine + '[^]' + pugFileContent + '[^]' + jsFileContent

    }


}
function convertExtScss() {

}


gulp.task('convertExtScss', function () {


    // Get start position of original and path of file
    var originalFileArr = getCssSource(1621, 2, true).split('[^]');
    var originalFileLine = originalFileArr[1];
    var originalFilePath = originalFileArr[0];
    console.log(originalFilePath + '-o-o-o-' + originalFileLine)

    // Get end of code block
    var sassAST = require('sass-ast');
     sassAST.parse({
            file: 'dev/scss/' + originalFilePath,
        },
        function (err, ast) {
            if (err) throw err;
            //return an array of objects according to key, value, or key and value matching
            function getObjects(obj, key, val) {
                var objects = [];
                for (var i in obj) {
                    if (!obj.hasOwnProperty(i)) continue;
                    if (typeof obj[i] == 'object') {
                        objects = objects.concat(getObjects(obj[i], key, val));
                    } else
                    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                    if (i == key && obj[i] == val || i == key && val == '') { //
                        objects.push(obj);
                    } else if (obj[i] == val && key == '') {
                        //only add if the object is not already in the array
                        if (objects.lastIndexOf(obj) == -1) {
                            objects.push(obj);
                        }
                    }
                }
                return objects;
            }


            var codeBlocks = getObjects(ast, 'type', 'block');
            var codeend ='';
            var codeBlocksCount = 0;
            for (var index in codeBlocks) {
                codeBlocksCount++;
                console.log(codeBlocks[index].start.line + '***' + codeBlocks[index].end.line)
                if (codeBlocks[index].start.line == (originalFileLine)) {

                    codeend = codeBlocks[index].end.line
                    console.log('!!!' + codeend + '!!!');
                    var file = fs.readFileSync('dev/scss/' + originalFilePath, 'utf8');
                    var fileArr = file.split('\n');
                    console.log(codeend + 'codEnd')
                    var cnt = codeend - originalFileLine + 1;
                    fileArr.splice(originalFileLine - 1, cnt, ' .headerPhone {\n\tfont-size:2rem;\n\tcolor:#fff;\n\tdisplay:inline-block;\n\ttext-align:center\n}');

                    var strg = ''
                    for (var str in fileArr) {
                        strg += fileArr[str] + '\n'
                    }
                    fs.writeFileSync('dev/scss/' + originalFilePath, strg);


                }
            }
            if (!codeend){

                var codeSelectors = getObjects(ast, 'type', 'selector');
                for (var index in codeSelectors) {

                    if (codeSelectors[index].start.line == (originalFileLine)) {

                        var selectEnd = codeSelectors[index].start.line;

                        for (var i = 1;codeBlocksCount>=i;i++){
                            var line = selectEnd + i;

                            for (var index in codeBlocks) {
                                if (codeBlocks[index].start.line == line) {

                                    console.log('We GOT A FINAL LINE!!! '+codeBlocks[index].start.line);
                                    var originalFileLine1 = codeBlocks[index].start.line;

                                    for (var index1 in codeBlocks) {
                                        codeBlocksCount++;
                                        console.log(codeBlocks[index1].start.line + '***' + codeBlocks[index1].end.line)
                                        if (codeBlocks[index1].start.line == (originalFileLine1)) {

                                            codeend = codeBlocks[index1].end.line
                                            console.log('!!!' + codeend + '!!!');
                                            var file = fs.readFileSync('dev/scss/' + originalFilePath, 'utf8');
                                            var fileArr = file.split('\n');
                                            console.log(codeend + 'codEnd')
                                            var cnt = codeend - originalFileLine + 1;
                                            fileArr.splice(originalFileLine - 1, cnt, '.sergClass{v_glaz:true;}');

                                            var strg = ''
                                            for (var str in fileArr) {
                                                strg += fileArr[str] + '\n'
                                            }
                                            fs.writeFileSync('dev/scss/' + originalFilePath, strg);

                                            return

                                        }
                                    }




                                }
                            }
                        }



                    }

                }
            }


        });


});


