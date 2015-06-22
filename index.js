var gulf = require('gulf')
  , domOT = require('dom-ot')
  , MutationSummary = require('mutation-summary')
  , shoe = require('shoe')

$(function() {
  var doc = createEditor(document.querySelector('#doc'))
  var stream = shoe('/socket')
  stream.pipe(doc.masterLink()).pipe(stream)
})

function createEditor(editableDiv) {
  jQuery(editableDiv).hallo({
    plugins: {
      'halloformat': {},
      'halloblock': {},
      'hallojustify': {},
      'hallolists': {},
      'halloreundo': {}
    }
  });
  
  var doc = new gulf.EditableDocument(new gulf.MemoryAdapter, domOT)
  doc._change = function(newcontent, changes) {
    observer.disconnect()
    console.log(newcontent)
    if(changes) {
      domOT.apply(editableDiv, changes)
    }
    else {
      editableDiv.innerHTML = ''
      for(var i=0; i<newcontent.childNodes.length; i++) {
        editableDiv.appendChild(newcontent.childNodes[i].cloneNode())
      }
    }
    observer.reconnect()
  }
  doc._collectChanges = function() {
    // changes are automatically collected by MutationSummary
  }
  
  var observer = new MutationSummary({
    rootNode: editableDiv, // (defaults to window.document)
    oldPreviousSibling: true,
    queries: [
      { all: true}
    ],
    callback: function onChange(summaries) {
      var ops = domOT.adapters.mutationSummary.import(summaries[0], editableDiv)
      console.log(ops)
      doc.update(ops)
    }
  })

  
  return doc
}