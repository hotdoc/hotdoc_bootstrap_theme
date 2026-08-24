less_files = files(
    'dark-frontend.less',
    'dark-sitenav.less',
    'light-frontend.less',
    'light-sitenav.less',
)

css_files = files(
  npm_files_dir / 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
  npm_files_dir / 'bootstrap-toc/dist/bootstrap-toc.min.css',
)

foreach css: less_files
    # lessc can either compile a file or emit its dependency list (--depends),
    # but not both in a single invocation. Wrap it (see lessc-compile.py) to do
    # both from one custom_target, mirroring how a C compiler emits e.g. foo.o
    # and foo.o.d from a single invocation: the depfile discovers every actual
    # less import, including ones only reachable via less_include_path, without
    # needing to hardcode a (possibly incomplete) file list, and without
    # registering a cross-subproject file as a Meson dependency input.
    targets += [
      custom_target(
        input: css,
        output: '@BASENAME@.css',
        depfile: '@BASENAME@.css.d',
        command: [
          python, files('lessc-compile.py'),
          less.full_path(), '@INPUT@', '@OUTPUT@', '@DEPFILE@',
        ] + less_options,
        build_by_default: true,
        install: get_option('install'),
        install_dir: install_dir / 'css',
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
