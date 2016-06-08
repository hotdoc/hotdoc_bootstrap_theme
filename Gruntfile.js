module.exports = function(grunt) {

	grunt.initConfig({

		copy: {
			fonts: {
				expand: true,
				cwd: 'bower_components/bootstrap/fonts/',
				src: '**',
				dest: 'dist/fonts/',
				flatten: true,
				filter: 'isFile',
			},
			templates: {
				expand: true,
				cwd: 'app/assets/templates',
				src: '**',
				dest: 'dist/templates/',
				flatten: true,
				filter: 'isFile',
			},
			jquery: {
				src: './bower_components/jquery/dist/jquery.js',
				dest: './dist/js/jquery.js',
			},
			bootstrap: {
				src: './bower_components/bootstrap/dist/js/bootstrap.js',
				dest: './dist/js/bootstrap.js',
			},
			bootstrap_toggle: {
				src: './bower_components/bootstrap-toggle/js/bootstrap-toggle.js',
				dest: './dist/js/bootstrap-toggle.js',
			},
			isotope: {
				src: './bower_components/isotope/dist/isotope.pkgd.min.js',
				dest: './dist/js/isotope.pkgd.min.js',
			},
			compare_versions: {
				src: './bower_components/compare-versions/index.js',
				dest: './dist/js/compare-versions.js',
			},
			typeahead: {
				src: './bower_components/typeahead.js/dist/typeahead.jquery.js',
				dest: './dist/js/typeahead.jquery.js',
			},
			search: {
				src: './app/assets/javascript/search.js',
				dest: './dist/js/search.js',
			},
			tag_filtering: {
				src: './app/assets/javascript/tag_filtering.js',
				dest: './dist/js/tag_filtering.js',
			},
			language_switching: {
				src: './app/assets/javascript/language_switching.js',
				dest: './dist/js/language_switching.js',
			},
			navigation: {
				src: './app/assets/javascript/navigation.js',
				dest: './dist/js/navigation.js',
			},
			utils: {
				src: './app/assets/javascript/utils.js',
				dest: './dist/js/utils.js',
			},
			lines_around_headings: {
				src: './app/assets/javascript/lines_around_headings.js',
				dest: './dist/js/lines_around_headings.js',
			},
			navbar_offset_scroller: {
				src: './app/assets/javascript/navbar_offset_scroller.js',
				dest: './dist/js/navbar_offset_scroller.js',
			},
			bootstrap_css: {
				src: './bower_components/bootstrap/dist/css/bootstrap.min.css',
				dest: './dist/css/bootstrap.min.css',
			},
			bootstrap_toggle_css: {
				src: './bower_components/bootstrap-toggle/css/bootstrap-toggle.css',
				dest: './dist/css/bootstrap-toggle.css',
			},
			malihu_scroll_css: {
				src: './bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
				dest: './dist/css/jquery.mCustomScrollbar.css',
			},
			malihu_scroll_js: {
				src: './bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
				dest: './dist/js/jquery.mCustomScrollbar.concat.min.js',
			}
		},      
		less: {
			development: {
				options: {
					compress: true,
				},
				files: {
					"./dist/css/frontend.css":"./app/assets/stylesheets/frontend.less",
					"./dist/css/sidenav.css":"./app/assets/stylesheets/sidenav.less",
					"./dist/css/search.css":"./app/assets/stylesheets/search.less",
					"./dist/css/tables.css":"./app/assets/stylesheets/tables.less",
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['copy', 'less']);
};
