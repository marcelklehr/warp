# warp
A [faster-than-light](https://en.wikipedia.org/wiki/Warp_drive) collaborative editor

Take a look at the [demo](http://warp.der-analphabet.de/)

## Install
```
$ git clone https://github.com/marcelklehr/warp.git
$ npm install
$ browserify index.js > build/build.js
```

## Run
```
$ node server
```

## How does it work?
Warp syncs changes between client and server using [gulf](https://github.com/marcelklehr/gulf) over [shoe](https://github.com/substack/shoe) (a stream wrapper for sockJS). To transform the changes it uses [dom-ot](https://github.com/marcelklehr/dom-ot), an operational transformation library for DOM patches. On the server [js](https://github.com/tmpvar/jsdom)[dom](https://github.com/darrylwest/node-jsdom) emulates a DOM tree to apply the patches on. And [hallojs instance](https://github.com/bergie/hallo) allows you to apply advanced styles like **bold** or *italics* to your document.

# Legal
(c) 2015 by Marcel Klehr

MIT License