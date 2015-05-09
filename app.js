/**
 * Start one instance of the OPC UA Server
 */

require("./opcua-server.js").newOpcuaServer();
var opcua = require("./opcua-server.js");

function work() {
  console.log('working...');
  opcua.setBusy(false);
  opcua.setDone(true);
}
var work = _.once(work);

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
    opcua.setReady(false);
    opcua.setDone(true);
  }

  // Go back to idle state after execution
  if (state.done === true && state.execute === false) {
    opcua.setDone(false);
    opcua.setReady(true);
  }
}, 500);