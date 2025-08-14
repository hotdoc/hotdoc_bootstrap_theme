search_files = files(
    'enable_search.css',
)

foreach search_file: search_files
    configure_file(
        input: search_file,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'js' / 'search',
    )
endforeach
