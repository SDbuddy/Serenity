const data = require('./data.js');
const rules = require('./rules.json');
const devices = require('./devices.json');
//const wemo = require('wemo');
var five = require("johnny-five");
var trigger = new EventEmitter();

main();

function main() {
    console.log("Hello World");
    connectToDevices(); //connects to all devices through different protocols
    trigger.on('data', checkRules); //everytime the server gets new data checkRules will run
    setInterval(function() {
        data[0].unixTime = now();
        trigger.emit('data');
    }, rules.timeCheckInterval);

}

function connectToDevices() {
    /* Supported Device Types:
        arduino
        Wemo outlet
        Chromecast
        Octoprint
        my homemade motion sensorDevice
        IR remote?
    */
    const devices = require('./devices.json');
    devices.devices.forEach(function(device, index) {
        switch (device.type.toLowerCase()) {
            case 'wemo outlet':
                setupWemo(device);
                break;
            case 'chromecast':
                setupChromecast(device);
                break;
            case 'octoprint':
                setupOctoprint(device);
                break;
            case 'arduino':
                setupArduino(device);
                break;
            case 'app':
                setupApp(device);
                break;
        }
    });
}

function checkRules() {
  rules.rules.forEach(function(rule,ruleIndex){
    data.forEach(function(data,dataIndex){
      if(rule.input.listeningTo == data.device){
        compare(rule,data);
      }
    });
  });
}

function setupWemo(device) {
    var wemoSwitch = new WeMo(device.ip, device.port);
}

function setupChromecast(device) {
    console.log("connecting Chromecast");
}

function setupOctoprint(device) {
    console.log("connecting octoprint");
}

function setupArduino(device) {
    console.log("connecting arduino");
    var board = new five.Board();
}

function setupApp(device) {
    console.log("connecting app");
}

function setupGet(){
 app.get(trigger.emit('data'));

}

function now() {
    return Math.floor(new Date() / 1000);
}
