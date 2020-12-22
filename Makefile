.PHONY: develop
develop: install
	/bin/ls examples/simple.js | entr -c node examples/simple.js

install:
	yarn
