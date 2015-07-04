var bindEditor = require('gulf-contenteditable')
  , shoe = require('shoe')

CKEDITOR.replace(document.querySelector('#doc'))
CKEDITOR.on('instanceReady', function() {
  var editable = document.querySelector('#cke_doc .cke_wysiwyg_frame').contentDocument.body
  var doc = bindEditor(editable)
  var stream = shoe('/socket')
  stream.pipe(doc.masterLink()).pipe(stream)
})