Pub Mix
=======

A custom events micro-framework. Note: this does not handle DOM events, just user defined ones.

Usage
=====

In your browser
---------------

### Bind custom events to any object
`PubMix.on(window, "userStateChanged", function (user) { console.log("The user is now ", user.name); })`

.. later

`PubMix.fire(window, "userStateChanged", [{name: "Rob"}])`


With Ender
--------

`ender -b qwery,pub-mix`

### Using a selector engine
`var ns = {}`

`function handleClickedCell () {}`

`$(ns).on("cellClicked", handleClickedCell)`

`$(ns).fire("cellClicked")`

`$(ns).off("cellClicked", handleClickedCell)`

### Directly from ender or $

`$.on(ns, "anything", function(){})`


From node
--------

`npm install pub-mix`

`var pubmix = require("pub-mix")`

`pubmix.on(anything, "something", function(){})`



Run the tests
=============

`npm install zap`

`zap test.js`



Some Docs
=========

### Bind an event listener
`PubMix.on(namespace, eventName, function)`

### Trigger an event listener
`PubMix.fire(namespace, eventName[, [arg1, arg2, ...]])`

### Unbind an event listener
`PubMix.off(namespace, eventName, function)`

### No Conflict
`var myNamedPubMix = PubMix.noConflict()`
