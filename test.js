//'use strict';

var usb = require('usb');
var dev = findWeatherStation(usb);
var iface = null;

if(!dev) {
console.log("No luck, boss!");
} else {
console.log("I found me a weather station!");
useWeatherStation(dev);
}

function findWeatherStation(usb) {
var vid = 6465;
var pid = 32801;

var dev = usb.findByIds(vid, pid);
return dev;
}

function processWeatherData(error, data) {
if(error) {
console.log("Error:");
console.log(error);
}

console.log("Data");
console.log(data);
}


var stillRunning = true;
var deadMansHandle = 0;

function pollWeatherData() {

console.log("Polling");
//console.log(iface.endpoints);
//console.log(iface.endpoints[0]);
var ep = iface.endpoints[0];
ep.transfer(32, processWeatherData);

deadMansHandle++;

if(deadMansHandle > 60) {
console.log("Hit timeout");
stillRunning=false;
}

if(stillRunning) {
setTimeout(pollWeatherData, 1000);
}

return stillRunning;
}

var iHasReleasedKernelDriver = false;
function useWeatherStation(dev) {
try {
dev.open();
iface = dev.interfaces[0];
if(iface.isKernelDriverActive()) {
console.log("Releasing kernel driver");
iface.detachKernelDriver();
iHasReleasedKernelDriver = true;
}

console.log("Attempting to claim weather station");
iface.claim();

// Do some stuff with the iface
setTimeout(pollWeatherData, 1000);


} catch (err) {
console.log(err);

} finally {
if(iHasReleasedKernelDriver) {
iface.attachKernelDriver();
}

console.log("Closing up");
//dev.close();
}

}

