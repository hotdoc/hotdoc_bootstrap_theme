module.exports = function(grunt) {

    grunt.initConfig({

    copy: {  
      main: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts/',
        src: '**',
        dest: 'public/assets/fonts/',
        flatten: true,
        filter: 'isFile',
      },
    },      
    less: {
        development: {
            options: {
              compress: true,
            },
            files: {
              "./public/assets/stylesheets/frontend.css":"./app/assets/stylesheets/frontend.less",
            }
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/frontend.js'
        ],
        dest: './public/assets/javascript/frontend.js',
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      frontend: {
        files: {
          './public/assets/javascript/frontend.js': './public/assets/javascript/frontend.js',
        }
      },
    },
    watch: {
        js_frontend: {
          files: [
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './app/assets/javascript/frontend.js'
            ],   
          tasks: ['concat:js_frontend','uglify:frontend'],
        },
        less: {
          files: ['./app/assets/stylesheets/*.less'],
          tasks: ['less'],
        },
      }
    });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('init', ['copy', 'less', 'concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
};
