# ModuleInterfaceJS
Generic Module Interface on OPC UA with JavaScript.

## Installation

1. Clone the git repository: `git clone https://github.com/ProjectMi5/ModuleInterfaceJS.git` 
2. Install the necessary npm dependencies: `npm install`
3. Configure the Module interface in _opcua-server.js_
 1. You need to adapt the ModuleNumber on several places. Currently it is all: `Module1101`
    There you would need to adapt the Module Number, use search and replace
4. Start the Module Interface: `node app.js`
    
## Notes

It only works with node-opcua v 0.0.30 (see package.json)

## TODO

* Configuration file, e.g.: _config.js_
* Command line interface for a port number, e.g.: `app.js --port=80`
* SkillInput