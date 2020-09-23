# recipes

use `source.cue` to generate result json programmatically

_if you are to just work on [../src](../src), just the produced [keybab.json](./keybab.json) is enough so you could skip anything below_

## Prerequisites
- [cue](https://github.com/cuelang/cue#download-and-install)
- (optional) [entr](http://eradman.com/entrproject/)

## Build
`$ make keybab.json`

## Develop

_These are optional steps to make your debugging `source.cue` easier._

```
$ make [develop] # to keep building `keybab.json` watching changes of `source.cue`
$ make preview # to see the result of `keybab.json` watching changes of itself
```

## Artifacts
`keybab.json` is intended to be used from [../src](../src) and being tracked via git alongside `source.cue`.
