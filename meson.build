project('hotdoc_bootstrap_theme', 'c')

npm = find_program('npm')
run_command(npm, ['install', meson.current_source_dir()])

bower = find_program('node_modules/bower/bin/bower')
run_command(bower, ['install'])

less = find_program('node_modules/less/bin/lessc')
if get_option('less_include_path') != ''
  less_options = ['--include-path=' + get_option('less_include_path')]
else
  less_options = []
endif

targets = []
copy_command = ['python3', '-c', 'import os, sys, shutil; shutil.copyfile(sys.argv[1], sys.argv[2])', '@INPUT@', '@OUTPUT@']
subdir('css')
subdir('js')
subdir('fonts')
subdir('images')
subdir('templates')

theme_dir = meson.current_build_dir()
theme_dep = declare_dependency(sources: targets)
