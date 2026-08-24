project('hotdoc_bootstrap_theme', 'c')

fs = import('fs')

npm_files_dir = meson.current_source_dir() / 'node_modules'
if not get_option('offline')
	npm = find_program('npm', native: true)
	message('Running npm install…')
	res = run_command(
	    npm, 'install', meson.current_source_dir(),
	    check: true,
	)
endif

less = find_program('lessc', dirs: [meson.current_source_dir() / 'node_modules/less/bin/'], native: true)
python = find_program('python3', native: true)
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
