/**
 * Sample Server following the tutorial:
 * 
 * You can start the server by performing the following command in another file:
 * nodeServer4334 = require("./opcua-server").newOpcuaServer(4334);
 * 
 * http://node-opcua.github.io/create_a_server.html
 * 
 * @author Thomas Frei
 */
var _ = require('underscore');

var opcuaReady = true;
exports.getReady = function() {
  return opcuaReady;
};
exports.setReady = function(value) {
  opcuaReady = value;
}
var opcuaBusy = false;
exports.getBusy = function() {
  return opcuaBusy;
};
exports.setBusy = function(value) {
  opcuaBusy = value;
}
var opcuaDone = false;
exports.getDone = function() {
  return opcuaDone;
};
exports.setDone = function(value) {
  opcuaDone = value;
}
var opcuaError = false;
exports.getError = function() {
  return opcuaError;
};
exports.setError = function(value) {
  opcuaError = value;
}
var opcuaExecute = false;
exports.getExecute = function() {
  return opcuaExecute;
};
exports.setExecute = function(value) {
  opcuaExecute = value;
}

exports.newOpcuaServer = function() {
  var portNumber = 4840;
  var moduleName = 'Module2502';

  var opcua = require("node-opcua");

  var serverVars = new Array();
  var localVars = new Array();
  var server;
  var baseNodeId;

  server = new opcua.OPCUAServer({
    port : portNumber
  });

  // optional
  server.buildInfo.productName = moduleName;
  server.buildInfo.buildNumber = "7658";
  server.buildInfo.buildDate = new Date(2015, 5, 8);

  function construct_my_address_space(server) {
    // Create Output
    createOpcuaFolder(moduleName, "RootFolder");
    createOpcuaFolder("Output", moduleName);
    baseNodeId = 'MI5.' + moduleName + '.Output';
    createMI5Variable(baseNodeId, 'Name', 'Output Dummy', 'String');
    createMI5Variable(baseNodeId, 'ID', 2502, 'Double');
    createMI5Variable(baseNodeId, 'Idle', true, 'Boolean');
    createMI5Variable(baseNodeId, 'Connected', true, 'Boolean');
    //createMI5Variable(baseNodeId, 'ConnectionTestOutput', false, 'Boolean'); //deactivated in PT
    createMI5Variable(baseNodeId, 'Error', false, 'Boolean');
    createMI5Variable(baseNodeId, 'ErrorID', 0, 'Double');
    createMI5Variable(baseNodeId, 'ErrorDescription', '', 'String');
    createMI5Variable(baseNodeId, 'CurrentTaskDescription', '', 'String');
    createMI5Variable(baseNodeId, 'PositionSensor', false, 'Boolean');

    // Add SkillOutput
    createOpcuaFolder("SkillOutput", "Output");
    createOpcuaFolder("SkillOutput0", "SkillOutput");
    baseNodeId = 'MI5.' + moduleName + '.Output.SkillOutput.SkillOutput0';
    createMI5Variable(baseNodeId, 'Dummy', false, 'Boolean');
    createMI5Variable(baseNodeId, 'ID', 1404, 'Double');
    createMI5Variable(baseNodeId, 'Name', 'DummySkill', 'String');
    createMI5Variable(baseNodeId, 'Activated', true, 'Boolean');
    server.myexecute = server.engine.addVariableInFolder('SkillOutput0', {
      nodeId : 'ns=4;s=MI5.' + moduleName + '.Output.SkillOutput.SkillOutput0.Ready',
      browseName : 'Ready',
      dataType : 'Boolean',
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType['Boolean'],
            value : opcuaReady
          });
        },
        set : function(variant) {
          opcuaReady = variant.value;
          return opcua.StatusCodes.Good;
        }
      }
    });
    server.myexecute = server.engine.addVariableInFolder('SkillOutput0', {
      nodeId : 'ns=4;s=MI5.' + moduleName + '.Output.SkillOutput.SkillOutput0.Busy',
      browseName : 'Busy',
      dataType : 'Boolean',
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType['Boolean'],
            value : opcuaBusy
          });
        },
        set : function(variant) {
          opcuaBusy = variant.value;
          return opcua.StatusCodes.Good;
        }
      }
    });
    server.myexecute = server.engine.addVariableInFolder('SkillOutput0', {
      nodeId : 'ns=4;s=MI5.' + moduleName + '.Output.SkillOutput.SkillOutput0.Done',
      browseName : 'Done',
      dataType : 'Boolean',
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType['Boolean'],
            value : opcuaDone
          });
        },
        set : function(variant) {
          opcuaDone = variant.value;
          return opcua.StatusCodes.Good;
        }
      }
    });
    server.myexecute = server.engine.addVariableInFolder('SkillOutput0', {
      nodeId : 'ns=4;s=MI5.' + moduleName + '.Output.SkillOutput.SkillOutput0.Error',
      browseName : 'Error',
      dataType : 'Boolean',
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType['Boolean'],
            value : opcuaError
          });
        },
        set : function(variant) {
          opcuaError = variant.value;
          return opcua.StatusCodes.Good;
        }
      }
    });

    // createOpcuaFolder("ParameterOutput", "SkillOutput0");
    // createOpcuaFolder("ParameterOutput0", "ParameterOutput");
    // baseNodeId =
    // 'MI5.'+moduleName+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0';
    // createMI5Variable(baseNodeId, 'Dummy', 0);
    // createMI5Variable(baseNodeId, 'ID', 1);
    // createMI5Variable(baseNodeId, 'Name', 'Erster', 'String');
    // createMI5Variable(baseNodeId, 'Unit', 'm/s', 'String');
    // createMI5Variable(baseNodeId, 'Required', 1);
    // createMI5Variable(baseNodeId, 'Default', 50);
    // createMI5Variable(baseNodeId, 'MinValue', 0);
    // createMI5Variable(baseNodeId, 'MaxValue', 100);

    // Create Input
    createOpcuaFolder("Input", moduleName);
    baseNodeId = 'MI5.' + moduleName + '.Input';
    //createMI5Variable(baseNodeId, 'ConnectionTestInput', true, 'Boolean'); //deactivated in PT
    createOpcuaFolder("SkillInput", "Input");
    createOpcuaFolder("SkillInput0", "SkillInput");
    baseNodeId = 'MI5.' + moduleName + '.Input.SkillInput.SkillInput0';
    server.myexecute = server.engine.addVariableInFolder('SkillInput0', {
      nodeId : 'ns=4;s=MI5.' + moduleName + '.Input.SkillInput.SkillInput0.Execute',
      browseName : 'Execute',
      dataType : 'Boolean',
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType['Boolean'],
            value : opcuaExecute
          });
        },
        set : function(variant) {
          opcuaExecute = variant.value;
          return opcua.StatusCodes.Good;
        }
      }
    });
  }

  function post_initialize() {
    console.log("initialized");

    construct_my_address_space(server);

    server.start(function() {
      console.log("Server is now listening ... ( press CTRL+C to stop)");
      console.log("port ", server.endpoints[0].port);

      // var endpointUrl =
      // server.endpoints[0].endpointDescription().endpointUrl;
      // console.log(" the primary server endpoint url is ", endpointUrl);

    });
  }

  server.initialize(post_initialize);

  /*
   * Below you find Functions for easy handling
   */

  /**
   * Generate 15 digit random string used for 'variable variable names'
   * 
   * @returns {String}
   */
  function makeServerVariable() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  /**
   * Explode a NodeId (String to Array)
   * 
   * @returns [array]
   */
  function explodeNodeId(nodeId) {
    return nodeId.split('.');
  }

  function createOpcuaFolder(folder, parentFolder) {
    server.engine.createFolder(parentFolder, {
      browseName : folder
    });

  }

  function createMI5Variable(baseNodeId, variableName, defaultValue, variableType) {
    var folder = _.last(explodeNodeId(baseNodeId));
    var desiredNodeId = baseNodeId + '.' + variableName;
    var displayName = variableName;

    defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : 0;
    variableType = typeof variableType !== 'undefined' ? variableType : 'Double';

    // console.log(desiredNodeId, displayName, folder, variableType,
    // defaultValue);
    createOpcuaVariable(desiredNodeId, displayName, folder, variableType, defaultValue);
  }

  /**
   * Create an OPC UA Variable in the Test Server
   * 
   * @param DesiredNodeId
   * @param DisplayName
   * @param Folder
   * @param VariableType
   * @param DefaultValue
   * @returns {String} name of server-object that stores the value
   *          (server.NewObject)
   */
  function createOpcuaVariable(DesiredNodeId, DisplayName, Folder, VariableType, DefaultValue) {
    /*
     * Generate Default values for the input variables
     */
    DesiredNodeId = typeof DesiredNodeId !== 'undefined' ? ('ns=4;s=' + DesiredNodeId) : '';
    VariableType = typeof VariableType !== 'undefined' ? VariableType : 'String';

    var currentElement = localVars.length;
    localVars[currentElement] = DefaultValue;

    randomString = makeServerVariable();
    server[randomString] = server.engine.addVariableInFolder(Folder, {
      nodeId : DesiredNodeId, // some opaque NodeId in namespace 4 (optional)
      // "ns=4s=GVL.OPCModule.Output.Skill;
      browseName : DisplayName,
      dataType : VariableType,
      value : {
        get : function() {
          return new opcua.Variant({
            dataType : opcua.DataType[VariableType],
            value : localVars[currentElement]
          });
        },
        set : function(variant) {
          if (VariableType == 'Double') {
            localVars[currentElement] = parseFloat(variant.value);
          } else {
            localVars[currentElement] = variant.value;
          }
          return opcua.StatusCodes.Good;
        }
      }
    });
    console.log('Variable ', DisplayName, ' added');
    return localVars[currentElement];
  }
}; // very first export of this file

