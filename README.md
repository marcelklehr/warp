# warp
A [faster-than-light](https://en.wikipedia.org/wiki/Warp_drive) collaborative editor

Take a look at the [demo](http://warp.der-analphabet.de/)

## Feautures
 * DOM-OT allows you to collaborate on everything that's expressable in HTML
 * insert Youtube videos
 * work on tables
 * edit SVG

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
Warp detects changes to the document via the [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) (specifically using [MutationSummary](https://github.com/rafaelw/mutation-summary)) and syncs changes between client and server using [gulf](https://github.com/marcelklehr/gulf) over [shoe](https://github.com/substack/shoe). To transform the changes it uses [dom-ot](https://github.com/marcelklehr/dom-ot), an operational transformation library for DOM patches. On the server [js](https://github.com/tmpvar/jsdom)[dom](https://github.com/darrylwest/node-jsdom) emulates a DOM tree to apply the patches on. And a [ckeditor instance](http://ckeditor.com/) allows you to apply styles like **bold** or *italics* and add tables to your document. This should work with any HTML editor, though, e.g. an SVG editor!

## Status
This is still an early proof of concept, but I intend to bring it to the next level, if the result is functional.

# Legal
(c) 2015 by Marcel Klehr

MIT License