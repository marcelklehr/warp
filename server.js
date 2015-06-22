var gulf = require('gulf')
  , domOT = require('dom-ot')
  , http = require('http')
  , shoe = require('shoe')
  , jsdom = require('node-jsdom')

var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic);
server.listen(80);

jsdom.env('<div>hello world!</div>', function(er, window) {
  if(er) throw er[0]

  var div = window.document.body.firstChild

  gulf.Document.create(new gulf.MemoryAdapter, domOT, div, function(err, doc) {
    if(err) throw err
    
    var sock = shoe(function (stream) {
      stream.pipe(doc.slaveLink()).pipe(stream);
    })
    sock.install(server, '/socket');
  })
})