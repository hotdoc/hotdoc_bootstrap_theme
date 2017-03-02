# Bootstrap-enabled hotdoc theme

## Getting dependencies

First make sure to have nodejs installed

### On fedora:

```
sudo dnf install nodejs
```

### On debian and friends:

```
sudo apt-get install nodejs nodejs-legacy npm # debian
```

### On arch linux:

```
sudo pacman -S nodejs npm # arch
```

## Building:

### With meson

```
mkdir build; meson build && ninja -C build
```

Note that the build has been thought to be used as a meson
subproject. You can easily reuse it setting up your own
less variables (in a file called `theme/less` for example) as
follow:

``` meson
theme = subproject('hotdoc_bootstrap_theme',
    default_options: ['less_include_path=' +
    join_paths(meson.current_source_dir(), 'theme/less')]
)
```

And then you can setup your theme in the meson build file as follow:

``` meson
hotdoc.generate_doc('some-doc-name',
    ...
    html_theme: theme.get_variable('theme_dir'),
    dependencies: hotdoc_subprojects + [theme.get_variable('theme_dep')],
    ...
)
```


### Without meson

Install the dependencies:

```
npm install && ./node_modules/bower/bin/bower install
```

Build the theme:

```
make
```

## Testing

```
make check
```
