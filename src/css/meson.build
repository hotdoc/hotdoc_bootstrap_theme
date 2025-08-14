less_files = files(
    'dark-frontend.less',
    'dark-sitenav.less',
    'light-frontend.less',
    'light-sitenav.less',
)

less_dep_files = files(
    'frontend.less',
    'sitenav.less',
)

css_files = files(
  bower_files_dir / 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
  bower_files_dir / 'bootstrap-toc/dist/bootstrap-toc.min.css',
)

foreach css: less_files
    targets += [
      custom_target(
        command: [less] + less_options + ['@INPUT@', '@OUTPUT0@'],
        input: css,
        output: '@BASENAME@.css',
        build_by_default: true,
        install: get_option('install'),
        install_dir: install_dir / 'css',
        depend_files: [
          get_option('less_include_path'),
          less_dep_files
        ],
      )
    ]
endforeach

foreach css: css_files
    configure_file(
        input: css,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'css',
    )
endforeach
