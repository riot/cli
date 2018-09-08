# riot-cli

### v5.1.2
- Add: the new `esm` option to the help text https://github.com/riot/cli/pull/33

### v5.1.1
- Fix: `watch` option on Windows https://github.com/riot/cli/issues/34

### v5.1.0
- Add: the `esm` option https://github.com/riot/cli/pull/32

### v5.0.0
- Update the `riot-compiler` using the latest version
- Update to `chokidar@2`

### v4.1.1
- Fix: `watch` option on Windows https://github.com/riot/cli/issues/34

### v4.1.0
- Add: the `esm` option https://github.com/riot/cli/pull/32

### v4.0.2
- Fix: avoid to set the `global.isSilent` flag to true if the cli will be imported via node
- avoid to set the `global.isSilent` flag to true if the cli will be imported via node

### v4.0.1
- Fix #30

### v4.0.0
- Add inline sourcemap support via `--sourcemap` option
- Change all the API methods will return always a Promise
- Remove `shelljs` from the dependencies for the I/O operations