js_files = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/isotope/dist/isotope.pkgd.min.js',
    'bower_components/typeahead.js/dist/typeahead.jquery.min.js',
    'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
    'bower_components/mustache.js/mustache.min.js',
    'src/js/language_switching.js',
    'src/js/lines_around_headings.js',
    'src/js/navbar_offset_scroller.js',
    'src/js/navigation.js',
    'src/js/search.js',
    'src/js/tag_filtering.js',
    'src/js/utils.js'
]


foreach js: js_files
    fname = js.split('/')[-1]
    targets += [custom_target(fname,
        input: join_paths(meson.current_source_dir(), '..', js),
        output: fname,
        command: copy_command,
        build_by_default: true)]
endforeach

js_bower_files = [
  '../bower_components/compare-versions/index.js',
]
targets += [custom_target(
  'compare-versions.js',
  input: join_paths(meson.current_source_dir(), '../bower_components/compare-versions/index.js'),
  output: 'compare-versions.js',
  command: copy_command,
  build_by_default: true
)]
