bower_font_files = files(
    bower_files_dir / 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
    bower_files_dir / 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
    bower_files_dir / 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
    bower_files_dir / 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    bower_files_dir / 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
)

foreach font: bower_font_files
    configure_file(
        input: font,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'fonts',
    )
endforeach
