subdir('fonts')
subdir('images')
subdir('js')
subdir('css')
subdir('templates')

configure_file(
    input: 'theme.json',
    output: 'theme.json',
    copy: true,
    install: get_option('install'),
    install_dir: install_dir,
)
