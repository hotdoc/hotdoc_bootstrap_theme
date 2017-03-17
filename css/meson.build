csss = [
  '../src/less/frontend',
  '../src/less/custom_bootstrap',
]

foreach css: csss
    cssname = css.split('/')[-1] + '.css'
    targets += [custom_target(
        cssname,
        input: join_paths(meson.current_source_dir(), css + '.less'),
        output: cssname, command: [less] + less_options + ['@INPUT@', '@OUTPUT0@'],
        build_by_default: true,
        depend_files: [get_option('less_include_path')],
        )
    ]
endforeach

css_files = [
  '../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
]
foreach css: css_files
    cssname = css.split('/')[-1]
    targets += [custom_target(
        cssname,
        input: join_paths(meson.current_source_dir(), css),
        output: cssname,
        command: copy_command,
        build_by_default: true
        )
    ]
endforeach
