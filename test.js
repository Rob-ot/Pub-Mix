
var assert = require("assert"),
  fs = require("fs")

module.exports = {
  setup: function (test) {
    test.pubmix = require("./Pub-Mix")
  },
  'pubmix is sane': function (test) {
    assert.ok(test.pubmix)
    assert.ok(test.pubmix.on)
    assert.ok(test.pubmix.off)
    assert.ok(test.pubmix.fire)
    test.finish()
  },
  'trigger event with no listeners does nothing': function (test) {
    var obj = {}
    test.pubmix.fire(obj, "snowed")
    test.finish()
  },
  'events are bound, triggered, and removed': function (test) {
    var obj = {}, triggeredCount = 0
    
    function a () { triggeredCount++ }
    function b () { triggeredCount++ }
    function c () { triggeredCount++ }
    function d () { triggeredCount++ }
    
    
    test.pubmix.on(obj, "splode", a)
    test.pubmix.fire(obj, "splode")
    assert.equal(1, triggeredCount)
    
    test.pubmix.on(obj, "splode", b)
    test.pubmix.fire(obj, "splode")
    assert.equal(3, triggeredCount)
    
    test.pubmix.on(obj, "splode", c)
    test.pubmix.on(obj, "splode", d)
    test.pubmix.fire(obj, "splode")
    
    assert.equal(7, triggeredCount)
    
    test.pubmix.off(obj, "splode", a)
    test.pubmix.off(obj, "splode", b)
    test.pubmix.fire(obj, "splode")
    assert.equal(9, triggeredCount)
    
    test.pubmix.off(obj, "splode", c)
    test.pubmix.off(obj, "splode", d)
    test.pubmix.fire(obj, "splode")
    assert.equal(9, triggeredCount)
    
    test.finish()
  },
  'events do not conflict': function (test) {
    var obj = {}, implodeCount = 0, unfoldCount = 0
    
    test.pubmix.on(obj, "implode", function () { implodeCount++ })
    test.pubmix.on(obj, "implode", function () { implodeCount++ })
    test.pubmix.on(obj, "unfold", function () { unfoldCount++ })
    test.pubmix.on(obj, "unfold", function () { unfoldCount++ })
    test.pubmix.fire(obj, "implode")
    assert.equal(2, implodeCount)
    assert.equal(0, unfoldCount)
    
    test.pubmix.fire(obj, "unfold")
    assert.equal(2, implodeCount)
    assert.equal(2, unfoldCount)
    
    test.finish()
  },
  'listeners receive data from triggerer': function (test) {
    var obj = {}, getgoldCount = 0
    
    test.pubmix.on(obj, "getgold", function (a, b) {
      assert.equal(a, "a")
      assert.equal(b, "b")
      getgoldCount++
    })
    test.pubmix.on(obj, "getgold", function (a, b) {
      assert.equal(a, "a")
      assert.equal(b, "b")
      getgoldCount++
    })
    
    test.pubmix.fire(obj, "getgold", ["a", "b"])
    
    assert.equal(2, getgoldCount)
    
    test.finish()
  },
  'works on fake webpage and noConflict': function (test) {
    var pubmix = fs.readFileSync('Pub-Mix.js').toString(),
      window = {PubMix: "not pub mix"}
    eval(pubmix) // grrrr evil rarrrr
    
    assert.ok(window.PubMix)
    assert.ok(window.PubMix.on)
    assert.ok(window.PubMix.off)
    assert.ok(window.PubMix.fire)
    assert.ok(window.PubMix.noConflict)
    
    var pub = window.PubMix.noConflict()
    
    assert.equal("not pub mix", window.PubMix)
    assert.ok(pub)
    assert.ok(pub.on)
    assert.ok(pub.off)
    assert.ok(pub.fire)
    
    test.finish()
  }
}



