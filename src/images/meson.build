image_files = files(
    'home.svg',
)

foreach image: image_files
    configure_file(
        input: image,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'images',
    )
endforeach
