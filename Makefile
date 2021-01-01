SHELL=/bin/bash

.PHONY: develop
develop: install
	ls -d src/* examples/* tests/* | entr -c bash -c "make fmt && node examples/simple.js"

.PHONY: install
install:
	yarn

.PHONY: test
test: lint
	yarn test

.PHONY: watch-test
watch-test:
	ls -d src/* tests/* | entr -c make test

.PHONY: lint
lint: fmt-check
	yarn lint

.PHONY: fmt
fmt:
	yarn fmt

.PHONY: fmt-check
fmt-check:
	yarn fmt-check
