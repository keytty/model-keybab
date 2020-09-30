.PHONY: develop
develop:
	echo source.cue | entr -c make keybab.json

.PHONY: vet
vet: source.cue keybab.json
	echo keybab.json | entr -c cue vet keybab.json source.cue

keybab.json: source.cue
	cue export source.cue > keybab.json

.PHONY: preview
preview:
	vim -R keybab.json
