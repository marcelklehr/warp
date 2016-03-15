var gulf = require('gulf')
  , domOT = require('dom-ot')
  , http = require('http')
  , shoe = require('shoe')

var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic);
server.listen(80);

var div = domOT.create('<div>Hello world</div>')

gulf.Document.create(new gulf.MemoryAdapter, domOT, div, function(err, doc) {
  if(err) throw err

  var sock = shoe(function (stream) {
    stream.pipe(doc.slaveLink()).pipe(stream);
  })
  sock.install(server, '/socket');
})

