dir = 'bower_components/bootstrap/dist/fonts/'
font_files = run_command('python3', ['-c', 'import os; print(" ".join(os.listdir("../@0@")))'.format(dir)]).stdout().split(' ')

foreach font: font_files
    font = font.split('\n').get(0)
    ffile = join_paths('../', dir, font)
    targets += [custom_target(font, input: ffile,
        output: font,
        command: copy_command,
        build_by_default: true)]
endforeach

