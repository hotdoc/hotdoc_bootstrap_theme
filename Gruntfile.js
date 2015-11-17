module.exports = function(grunt) {

    grunt.initConfig({

    copy: {  
      fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts/',
        src: '**',
        dest: 'assets/fonts/',
        flatten: true,
        filter: 'isFile',
      },
      templates: {
	expand: true,
	cwd: 'app/assets/templates',
	src: '**',
	dest: 'assets/templates/',
	flatten: true,
	filter: 'isFile',
      }
    },      
    less: {
        development: {
            options: {
              compress: true,
            },
            files: {
              "./assets/css/frontend.css":"./app/assets/stylesheets/frontend.less",
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
          './app/javascript/frontend.js'
        ],
        dest: './assets/js/frontend.js',
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      frontend: {
        files: {
          './assets/js/frontend.js': './assets/js/frontend.js',
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'less', 'concat', 'uglify']);
};
