# Bootstrap-enabled hotdoc theme

## Building:

Install npm, on Fedora:

```
sudo dnf install nodejs
```

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
