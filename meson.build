project('hotdoc_bootstrap_theme', 'c')

npm = find_program('npm')
message('Running npm install...')
res = run_command(npm, ['install', meson.current_source_dir()])
if res.returncode() != 0
    error('`npm install` FAILED:\n @1@\n@0@'.format(res.stdout(), res.stderr()))
endif

bower = find_program('node_modules/bower/bin/bower')
message('Running bower install...')
res = run_command(bower, ['--allow-root', 'install'])
if res.returncode() != 0
    error('`bower install` FAILED:\n @1@\n@0@'.format(res.stdout(), res.stderr()))
endif

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
