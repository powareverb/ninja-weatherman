'use strict';

var usb = require('usb');

var items = usb.getDeviceList();

items.forEach(function(entry) {
    console.log(entry);
});




