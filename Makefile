zuul = node_modules/.bin/zuul
browserify = node_modules/.bin/browserify
server = node_modules/.bin/http-server
babel = node_modules/.bin/babel

node_modules:
	npm install --dev

build:
	babel src/index.js --out-file index.js

example:
	$(browserify) example/index.js -t [ reactify --es6 ] --debug -o example/bundle.js
	$(server) -p 4000 example

test: node_modules
	$(zuul) --local 4000 --ui mocha-bdd -- test.js

.PHONY: example
