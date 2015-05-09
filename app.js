/**
 * Start one instance of the OPC UA Server
 */

nodeServer4334 = require("./opcua-server.js").newOpcuaServer(4334);
var opcua = require("./opcua-server.js");

// Check execute value every 1s
// set it back to false
setInterval(function() {
  console.log('opcuaReady', opcua.getReady());
  console.log('opcuaBusy', opcua.getBusy());
  console.log('opcuaDone', opcua.getDone());
  console.log('opcuaError', opcua.getError());
  console.log('opcuaExecute', opcua.getExecute());

  if (opcua.getExecute() == true) {
    opcua.setExecute(false);
  }
}, 1000);