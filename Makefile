.PHONY: develop
develop:
	/bin/ls examples/simple.js | entr -c node examples/simple.js
