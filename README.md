# warp
An [faster-than-light](https://en.wikipedia.org/wiki/Warp_drive) editor

## demo

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
There are numerous possibilities for [achieving faster-than-light velocities](https://en.wikipedia.org/wiki/Faster-than-light):

1. tachyon-based drive
2. geostatic orbit
3. closing speeds
4. an expanding universe
5. magic

However, \#1 is just silly, \#2, \#3 and \#4 are cheating and \#5 is right out. Or maybe not, truth is I simply set up a [gulf](https://github.com/marcelklehr/gulf) instance driven by [dom-ot](https://github.com/marcelklehr/dom-ot) and had it consume a [hallojs editor instance](https://github.com/bergie/hallo), hoping that it would work. And it does!

# Legal
(c) 2015 by Marcel Klehr

MIT License