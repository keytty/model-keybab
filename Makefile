SHELL=/bin/bash

.PHONY: develop
develop: install
	ls -d src/* examples/* | entr -c node examples/simple.js

install:
	yarn
