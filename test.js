'use strict';

var usb = require('usb');
var vid = 6465;
var pid = 32801;

var dev = usb.findByIds(vid, pid)
//var items = usb.getDeviceList();

//items.forEach(function(entry) {
//    console.log(entry);
//});

//console.log(dev);

try {
dev.open();
var ints = dev.interfaces;
console.log(ints);
} catch (err) {
console.log(err);

} finally {
dev.close();
}


