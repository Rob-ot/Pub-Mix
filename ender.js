
for (var key in PubMix) {
  if (key === "noConflict") continue
  
  !function (key) {
    // Bind to $(obj).something("eventName", something)
    var obj = {}
    obj[key] = function (b, c) {
      PubMix[key](this[0], b, c)
      return this
    }
    ;(ender || $).ender(obj, true)
    
    // Bind to $.something etc
    obj = {}
    obj[key] = PubMix[key]
    ;(ender || $).ender(obj)
  }(key);
}
