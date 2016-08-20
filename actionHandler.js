var actions = require('./www/config/actions.json').actions;
var devices = require('./devices.js').devices;
var pushbullet = require('pushbullet');
var apiKey = "o.2NJuUlRSdfuIrrWFKkI7Zjnv9JgJ3Mlp";
var pusher = new pushbullet(apiKey);


exports.runActions = function(actionIDs) {

    for (var i = 0; i < actionIDs.length; i++) {
        for (var j = 0; j < actions.length; j++) {
            if (actionIDs[i] == actions[j].ID) {

                for (var k = 0; k < devices.outputs.length; k++) {
                  //console.log(devices.outputs[k]);
                    if (actions[j].pinName == devices.outputs[k].name) {
                        console.log("Action Found");
                        runActionByType(actions[j], devices.outputs[k]);

                        break;
                    } else {
                        console.log(actions[j].pinName + '!=' + devices.outputs[k].name);
                    }

                }
                break;

            }
        }
    }
}

function runActionByType(action, device) {
    console.log("running action by type " + action.type);
    switch (action.type) {
        case "servoWrite":
            device.to(action.degree);
            break;
        case "relay":
            if (action.action == 'open') {
                device.open();
            } else if (action.action == 'close') {
                device.close();
            }
            break;
        case "piezo":
            device.play({
                song: action.song,
                beats: 1 / 4,
                tempo: action.tempo
            });
            break;
        case "led":
            handleLed(action, device);
            break;
        case "lcd":
            device.on();
            device.print(action.message);
            break;
        case "pin":
            console.error("pin case not configured yet");
            break;
        case "get":
            break;
        case "post":
            break;
        case "notification":
            break;
        default:
            console.error("unknown type");

    }
}

function handleLed(action, device) {
    console.log("LED action: " + action);
    if (action.action == "toggle") {
        device.toggle();
    } else if (action.action == 'off') {
        device.stop();
        device.off();
    } else if (action.action == 'on') {
        device.on();
    } else if (action.action == 'blink') {
        device.blink(500);
    } else {
        console.error("[Error] Invalid action: " + action);
    }
}
