dir = 'src/images'
image_files = run_command('python3', ['-c', 'import os; print(" ".join(os.listdir("../@0@")))'.format(dir)]).stdout().split(' ')

foreach image: image_files
    image = image.split('\n').get(0)
    ffile = join_paths('../', dir, image)
    targets += [custom_target(image, input: ffile,
        output: image,
        command: copy_command,
        build_by_default: true)]
endforeach


