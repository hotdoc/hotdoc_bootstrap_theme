js_files = files(
    'full-width.js',
    'language_switching.js',
    'lines_around_headings.js',
    'navbar_offset_scroller.js',
    'navigation.js',
    'scrollspy.js',
    'search.js',
    'styleswitcher.js',
    'tag_filtering.js',
    'utils.js',
)

bower_js_files = files(
    bower_files_dir / 'anchor-js/anchor.min.js',
    bower_files_dir / 'bootstrap/dist/js/bootstrap.js',
    bower_files_dir / 'bootstrap-toc/dist/bootstrap-toc.min.js',
    bower_files_dir / 'compare-versions/index.js',
    bower_files_dir / 'jquery/dist/jquery.js',
    bower_files_dir / 'jquery-touchswipe/jquery.touchSwipe.min.js',
    bower_files_dir / 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
    bower_files_dir / 'mustache.js/mustache.min.js',
    bower_files_dir / 'typeahead.js/dist/typeahead.jquery.min.js',
)

foreach js: js_files
    configure_file(
        input: js,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'js',
    )
endforeach

foreach js: bower_js_files
    configure_file(
        input: js,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'js',
    )
endforeach

subdir('search')
