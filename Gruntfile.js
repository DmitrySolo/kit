module.exports = function(grunt) {

  grunt.initConfig({
   pug: {
  compile: {
    options: {
      data: grunt.file.readJSON('data.json'),
      pretty: true,
    },
    files: {
      'dist/index.html': ['dev/templates/index.php.pug'],
      'projectboard/index.html': ['dev/templates/projectboard.pug'],
        }
      }
    },// pug ended
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
        },
        files: {                         // Dictionary of files
          'dist/main.css': 'dev/scss/main.scss',
          'projectboard/main.css': 'dev/scss/main.scss',// 'destination': 'source'
        }
      }
    }, // sass ended
    "merge-json": {
      "i18n": {
        files: {
          "data.json": [ "dev/templates/**/*.json",'dev/MODULES/MENUS/--*/*.json','dev/MODULES/PROJECT MODULES/--*/*.json'],
        }
      }
    },
    watch: {
      css: { //CSS
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      }, //CSS
      pug: {
        files: '**/*.pug',
        tasks: ['pug'],
        options: {
          livereload: true,
        },
      }
    },//WATCH

  });//CONFIGURATION ENDED

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-merge-json');

  //REGISTERED TASKs
  grunt.registerTask('default', ['pug','sass']);
};