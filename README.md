# ModuleInterfaceJS
Generic Module Interface on OPC UA with JavaScript.

## Requirements

it seems to only work with node 0.12.1

## Installation

1. Clone the git repository: `git clone https://github.com/ProjectMi5/ModuleInterfaceJS.git` 
2. Install the necessary npm dependencies: `npm install`
3. Configure the Module interface in _opcua-server.js_
 1. You need to adapt the ModuleNumber on several places. Currently it is all: `Module1101`
    There you would need to adapt the Module Number, use search and replace
4. Start the Module Interface: `node app.js`
    
## Usage

In `app.js` use the _get/set-Functions_ to access the state values. Example:
* get the Execute value: `opcua.getExecute()` 
* set the Execute value: `opcua.setExecute()`

Implemented state values: Execute, Ready, Busy, Done, Error

## TODO

* Configuration file, e.g.: _config.js_
* Command line interface for a port number, e.g.: `app.js --port=80`
* SkillInput
* test higher node versions (e.g. 4.2.6)
