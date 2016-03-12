var gpio = require("pi-gpio");
var Promise = require("bluebird");
function Pin(pinno){
	this.pin = pinno;
}
Pin.prototype.enable = function(){
		var self = this;
		return new Promise(function(resolve, reject){
			gpio.open(self.pin,"put", resolve);
		});
	};

Pin.prototype.disable = function(){
		gpio.close(this.pin);
		return new Promise.resolve();
	};

Pin.prototype.set = function(){
		var self = this;
		console.log('set pin',self.pin);
		return new Promise(function(resolve){
			gpio.write(self.pin, 1, resolve);
		});
	};

Pin.prototype.reset = function(){
		var self = this;
		return new Promise(function(resolve){
			gpio.write(self.pin, 0, resolve);
		});
	};



/*
var test = new Pin(13);

setInterval(function(){

test.enable().bind(test)
  .then(test.set)
  .delay(1000)
  .then(test.reset)
  .delay(1000)
  .then(test.disable)
  .delay(1000);

}, 5000);

*/

module.exports=Pin;


