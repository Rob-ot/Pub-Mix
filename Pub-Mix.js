/* 
 * Pub Mix
 * Copyright (c) 2011 Rob Middleton
 * http://www.opensource.org/licenses/mit-license.php
 * https://github.com/Rob-ot/Pub-Mix
*/

!function () {
  function create (obj, name) {
    if (! obj._PubMixEvents) obj._PubMixEvents = {}
    if (! obj._PubMixEvents[name]) obj._PubMixEvents[name] = []
    return obj._PubMixEvents[name]
  }
  
  var PubMix = {
    on: function (obj, name, fn) {
      var e = create(obj, name)
      e.push(fn)
    },
    off: function (obj, name, fn) {
      var e = create(obj, name)
      for (var i = 0; i < e.length; i++) {
        if (e[i] === fn) {
          e.splice(i, 1)
        }
      }
    },
    fire: function (obj, name, data) {
      data || (data = [])
      var e = create(obj, name)
      for (var i = 0; i < e.length; i++) {
        e[i].apply(obj, data)
      }
    },
    noConflict: function () {
      var keeperPubMix = window.PubMix
      window.PubMix = PubMix._PubMix
      return keeperPubMix
    }
  }
  
  if (typeof window !== "undefined") {
    PubMix._PubMix = window.PubMix
    window.PubMix = PubMix
  }
  else {
    module.exports = PubMix
  }
}();
