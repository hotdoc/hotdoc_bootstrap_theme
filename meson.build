project('hotdoc_bootstrap_theme', 'c')

fs = import('fs')

npm = find_program('npm', native: true)
message('Running npm install…')
res = run_command(
    npm, 'install', meson.current_source_dir(),
    check: true,
)

bower = find_program('bower', dirs: [meson.current_source_dir() / 'node_modules/bower/bin'], native: true)
bower_files_dir = meson.current_source_dir() / 'bower_components'
message('Running bower install…')
res = run_command(
    bower, '--allow-root', 'install', '--config.directory=@0@'.format(bower_files_dir),
    check: true,
)

less = find_program('lessc', dirs: [meson.current_source_dir() / 'node_modules/less/bin/'], native: true)
if get_option('less_include_path') != ''
  less_options = ['--include-path=' + get_option('less_include_path')]
else
  less_options = []
endif

targets = []

if get_option('install')
py = import('python').find_installation(pure: false)
install_dir = py.get_install_dir() / 'hotdoc/hotdoc_bootstrap_theme/dist'
else
install_dir = get_option('prefix')
endif

subdir('src')

theme_dir = meson.current_build_dir() / 'src'
theme_dep = declare_dependency(sources: targets)
