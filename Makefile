zuul = node_modules/.bin/zuul
browserify = node_modules/.bin/browserify
server = node_modules/.bin/http-server

node_modules:
	npm install --dev

example:
	$(browserify) example/index.js -t [ reactify --es6 ] --debug -o example/bundle.js
	$(server) -p 4000 example

test: node_modules
	$(zuul) --local 4000 --ui mocha-bdd -- test.js

.PHONY: example