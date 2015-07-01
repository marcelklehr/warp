var gulf = require('gulf')
  , domOT = require('dom-ot')
  , MutationSummary = require('mutation-summary')
  , shoe = require('shoe')

var doc = createEditor(document.querySelector('#doc'))
var stream = shoe('/socket')
stream.pipe(doc.masterLink()).pipe(stream)

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
      var ops = domOT.unpackOps(changes)
      var selection = window.getSelection()
        , ranges = []
      for(var i=0; i<selection.rangeCount; i++) {
        var range = selection.getRangeAt(i)
        ranges.push(domOT.transformCursor(range, ops, editableDiv))
      }
      ranges = ranges.map(function(range) {
        return { startContainer: range.startContainer
                , startOffset: range.startOffset
                , endContainer: range.endContainer
                , endOffset: range.endOffset}
      })
      ops.forEach(function(op) {
        op.apply(editableDiv, /*index:*/true)
      })
      selection.removeAllRanges()
      console.log(ranges)
      ranges.forEach(function(r) {
        var range = new Range
        range.setStart(r.startContainer, r.startOffset)
        range.setEnd(r.endContainer, r.endOffset)
        selection.addRange(range)
      })
    }
    else {
      editableDiv.innerHTML = ''
      for(var i=0; i<newcontent.childNodes.length; i++) {
        editableDiv.appendChild(newcontent.childNodes[i].cloneNode(/*deep:*/true))
      }
      domOT.adapters.mutationSummary.createIndex(editableDiv)
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
      ops = ops.filter(function(op) {
        // filter out changes to the root node
        if(op.path) return !!op.path.length
        else return true
      })
      if(!ops.length) return
      console.log(ops)
      doc.update(ops)
      ops.forEach(function(op) {
        op.apply(editableDiv, /*index:*/true, /*dry:*/true)
      })
    }
  })

  
  return doc
}