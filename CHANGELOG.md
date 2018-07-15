# riot-cli

### v4.1.0
- Add: the `esm` option https://github.com/riot/cli/pull/32

### v4.0.2
- Fix: avoid to set the `global.isSilent` flag to true if the cli will be imported via node

### v4.0.1
- Fix #30

### v4.0.0
- Add inline sourcemap support via `--sourcemap` option
- Change all the API methods will return always a Promise
- Remove `shelljs` from the dependencies for the I/O operations