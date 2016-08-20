var five = require("johnny-five");
var pins = require('./www/config/pins.json');
var devices = require('./devices.js').devices;

exports.newDevice = function(device, triggerHandle) {
    //console.info("Setting up " + device.type);

    switch (device.type) {
        case "thermometer":
            handleThermometer(device,triggerHandle);
            break;
        case "switch":
            var arduinoSwitch = new five.Switch(device.pin);
            addInput(arduinoSwitch, device.name);
            arduinoSwitch.on('open', function() {
                this.sensorType = 'switch';
                this.currentState = 'open';
                triggerHandle(this);
            });
            arduinoSwitch.on('close', function() {
                this.sensorType = 'switch';
                this.currentState = 'close';
                triggerHandle(this);
            });
            break;
        case "proximity":
            console.error("proximity not configured yet");
            break;
        case "servo":
            var servo = new five.Servo(device.pin);
            addOutput(servo, device.name);
            break;
        case "relay":
            var relay = new five.Relay(device.pin);
            console.info("relay attach to pin " + device.pin);
            addOutput(relay, device.name);
            break;
        case "piezo":
            var piezo = new five.Piezo(device.pin);
            addOutput(piezo, device.name);
            break;
        case "led":
            var led = new five.Led(device.pin);
            console.info("led attach to pin " + device.pin);
            addOutput(led, device.name);
            break;
        case "lcd":
            handleLcd(device);
            break;
        case "hygrometer":
            var hygrometer = new five.Hygrometer({
                controller: device.controller
            });
            hygrometer.on("change", function() {
                this.sensorType = 'hygrometer';
                triggerHandle(this);
            });
            addInput(hygrometer, device.name);
            break;
        case "button":
            var button = new five.button(device.pin);
            button.on("hold", function() {
                this.sensorType = 'button';
                this.currentState = 'held';
                triggerHandle(this);
            });
            button.on("press", function() {
                this.sensorType = 'button';
                this.currentState = 'pressed';
                triggerHandle(this);
            });
            addInput(button, device.name);
            break;
        case "pin":
            console.error("pin case not configured yet")
            break;
        case "barometer":
            var barometer = new five.Barometer({
                controller: device.controller
            });
            barometer.on("change", function() {
                this.sensorType = 'barometer';
                triggerHandle(this);
            });
            addInput(barometer, device.name);
            break;
        case "compass":
            var compass = new five.Compass({
                controller: device.controller
            });
            compass.on("change", function() {
                this.sensorType = 'compass';
                triggerHandle(this);
            });
            addInput(compass, device.name);
            break;
        case "light":
            if (device.controller) {
                var light = new five.Light({
                    controller: device.controller
                });
            } else {
                var light = new five.Light(device.pin);
            }
            light.on('change', function() {
                this.sensorType = 'light';
                triggerHandle(this);
            });
            addInput(light, device.name);
            break;
        case "motion":
            if (device.controller) {
                var motion = new five.Motion({
                    controller: device.controller
                });
            } else {
                var motion = new five.Motion(device.pin);
                console.log("Motion Sensor attached to pin %s", device.pin);
            }

            motion.on('motionstart', function() {
                this.pinName = device.name;
                this.sensorType = 'motion';
                this.currentState = '1';
                console.log('motion detected');
                triggerHandle(this);
            });
            motion.on('motionend', function() {
                this.sensorType = 'motion';
                this.currentState = '0';
                triggerHandle(this);
            });
            addInput(motion, device.name);
            break;
        case "motor":
            switch (Object.keys(device.pins).length) {
                case 1:
                    var motor = new five.Motor(device.pins);
                    break;
                case 2:
                    var motor = new five.Motor({
                        pins: {
                            pwm: device.pins.pwm,
                            dir: device.pins.dir
                        }
                    });
                    break;
                case 3:
                    var motor = new five.Motor({
                        pins: {
                            pwm: device.pins.pwm,
                            dir: device.pins.dir,
                            brake: device.pins.brake
                        }
                    });
                    break;
                default:
                    console.log("specify num pins for motor control");
            }
            addOutput(motor, device.name);
            break;
          case "shift register":
            var sR = new five.ShiftRegister({
              isAnode: device.isAnode,
              pins:{
                data: device.pins.data,
                clock: device.pins.clock,
                latch: device.pins.latch,
                reset: device.pins.reset
              }
            });
            addOutput(sR,device.name);
            break;
        default:
            console.error("unknown type");

    }
}

function handleThermometer(device,triggerHandle) {
    if (device.controller) {
        var thermometer = new five.Thermometer({
            controller: device.controller,
            pin: device.pin
        });

    } else {
        var thermometer = new five.Thermometer({
            pin: device.pin,
            toCelcius: device.toCelcius
        });
    }

    thermometer.on("change", function() {
        this.sensorType = 'thermometer';
        triggerHandle(this);
    });
    addInput(thermometer, device.name);
}

function handleLcd(device) {
    if (device.controller) {
        var lcd = new five.LCD({
            controller: device.controller
        });
    } else {
        var lcd = new five.LCD({
            pins: device.pins,
            backlight: device.backlight,
            rows: device.rows,
            col: device.cols
        });
    }
    addOutput(lcd, device.name);
}

function addOutput(object, name) {
    devices.outputs[devices.numOutputs] = object;
    devices.outputs[devices.numOutputs].name = name;
    devices.numOutputs++;
}

function addInput(object, name) {
    devices.inputs[devices.numInputs] = object;
    devices.inputs[devices.numInputs].name = name;
    devices.numInputs++;
}
