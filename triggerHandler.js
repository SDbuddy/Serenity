var triggers = require('./www/config/triggers.json').triggers;
var actionHandler = require('./actionHandler.js');

exports.eventCheck = function(data) {
    switch (data.sensorType) { //based on type of device connected configure it to run with johhny-five
        case 'get':
            //console.log(data);
            checkTriggers(data.val, "get", actionHandler.runActions); //pass in params of get request and target to skip to bottom
            break;
        case 'post':
            checkTriggers(data.vals, "post", actionHandler.runActions); //pass in params of post request and target
            break;
        case 'thermometer':
            checkTriggers(data.C, data.pin, actionHandler.runActions); //pass in temp in celcius and pin number as target
            break;
        case 'hygrometer':
            checkTriggers(data.relativeHumidity, data.pin, actionHandler.runActions);
            break;
        case 'button':
            checkTriggers(data.currentState, data.pin, actionHandler.runActions);
            break;
        case 'switch':
            checkTriggers(data.currentState, data.pin, actionHandler.runActions);
            break;
        case 'motion':
            checkTriggers(data.currentState,data.pinName,actionHandler.runActions);
            break;
        case 'light':
            checkTriggers(data.level,data.pin,actionHandler.runActions);
            break;
        case 'compass':
            checkTriggers(data.bearing.point,'compass',actionHandler.runActions);
            break;
        case 'barometer':
            checkTriggers(data.pressure,'barometer',actionHandler.runActions);
            break;
        default:
    }
}

function checkTriggers(val, target, runActions) {
    target = target || 0;
    for (var i = 0; i < triggers.timeWait.length; i++) { //loops through timeWait triggers in the JSON file
        if (triggers.timeWait[i].target == target) { //if the target of the timeWait matches the one in JSON then evaluate the condition
            var time = new Date.now();
            if (time > val) {
                runActions(triggers.timeWait[i].actionIDs); //run actions isnt defined yet
            }
        }
    }
    for (i = 0; i < triggers.greaterThan.length; i++) {
        if (triggers.greaterThan[i].target == target) {
            if (val > triggers.greaterThan[i].threshold) {
                runActions(triggers.greaterThan[i].actionIDs);
            }
        }
    }
    for (i = 0; i < triggers.lessThan.length; i++) {
        if (triggers.lessThan[i].target == target) {
            if (val < triggers.lessThan[i].threshold) {
                runActions(triggers.lessThan[i].actionIDs);
            }
        }
    }
    for (i = 0; i < triggers.equalTo.length; i++) {
        if (triggers.equalTo[i].target == target) {
            if (val == triggers.equalTo[i].threshold) {
              console.log("TriggerEqual sucess");
                runActions(triggers.equalTo[i].actionIDs);
            }
        }
    }
    for (i = 0; i < triggers.between.length; i++) {
        if (triggers.between[i].target == target) {
            if (val < triggers.between[i].threshold[1] && val > triggers.between[i].threshold[0]) {
                runActions(triggers.between[i].actionIDs);
            }
        }
    }
    for (i = 0; i < triggers.get.length; i++) {
        if (triggers.get[i].target == target) {
            if (triggers.get[i].val == val) {
              console.log(triggers.get[i].actionIDs);
                runActions(triggers.get[i].actionIDs);
            }
        }
    }
    for (i = 0; i < triggers.post.length; i++) {
        if (triggers.post[i].target == target) {
            var is_same = (triggers.post[i].vals.length == vals.length) && triggers.post[i].vals.every(function(element, index) {
                return element === vals[index];
            });
            if (is_same) {
                runActions(triggers.post[i].actionIDs);
            }
        }
    }
}
