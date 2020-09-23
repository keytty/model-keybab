.PHONY: develop
develop:
	echo source.cue | entr -c make keybab.json

keybab.json: source.cue
	cue export source.cue > keybab.json

preview:
	vim -R keybab.json
