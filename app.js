/**
 * Start one instance of the OPC UA Server
 */

require("./opcua-server.js").newOpcuaServer();
var opcua = require("./opcua-server.js");

// EXAMPLE:
// Check execute value every 1s
// set it back to false
var laststate;
setInterval(function() {
  var state = {
    execute : opcua.getExecute(),
    ready : opcua.getReady(),
    busy : opcua.getBusy(),
    done : opcua.getDone(),
    error : opcua.getError()
  }
  console.log(state);

  if (opcua.getExecute() == true) {
    opcua.setExecute(false);
  }
}, 1000);