# cue: https://cuelang.org/
# jq: https://stedolan.github.io/jq/

.PHONY: develop
develop:
	echo source.cue | entr -c bash -c 'make fmt && make keybab.json'

.PHONY: render
render:
	cue export source.cue | jq --indent 2

.PHONY: vet
vet: source.cue keybab.json
	echo keybab.json | entr -c cue vet keybab.json source.cue

keybab.json: source.cue
	make -s render > keybab.json

.PHONY: preview
preview:
	less keybab.json

.PHONY: follow
follow:
	echo source.cue | entr -c make render

.PHONY: fmt
fmt:
	cue fmt
