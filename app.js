/**
 * Start one instance of the OPC UA Server
 */

require("./opcua-server.js").newOpcuaServer();
var opcua = require("./opcua-server.js");
var _ = require("underscore");
var Pin = require("./GPIO_Out_promises.js");
var digitalOut = new Pin(13);

// Implement easy state machine
setInterval(function() {
  var state = {
    execute : opcua.getExecute(),
    ready : opcua.getReady(),
    busy : opcua.getBusy(),
    done : opcua.getDone(),
    error : opcua.getError()
  }

  // Incoming Execute === TRUE
  if (state.execute === true && state.ready === true && state.busy === false
      && state.done === false) {
    console.log("EXECUTING......");
    digitalOut.enable().bind(digitalOut)
      .then(digitalOut.set)
      .delay(1000)
      .then(digitalOut.reset)
      .then(digitalOut.disable)
      .then(setDone);

    function setDone(){
      console.log("....done");	    
      opcua.setReady(false);
      opcua.setDone(true);
      console.log("waiting for execute to taken back...");
    }
  }

  // Go back to idle state after execution
  if (state.done === true && state.execute === false) {
    console.log("...ready");
    opcua.setDone(false);
    opcua.setReady(true);
  }
}, 1000);
