function addTrigger() {
    $.get('/html/addTrigger.html', function (data) {
        $('#panelHead').append(data); //adds the contents of addTrigger.html to the Head of the panel
        $('.add').toggle(); //hide the plus button to prevent multiple clicks
        makePinsforTriggersDropdown();
        makeActionsforTriggersDropdown();
        typeSelector();
        $('.addBtn').click(function () {
            var type = $('.typeBtn')[0].innerText.substring(0, $('.typeBtn')[0].innerText.length).toLowerCase();
            switch (type) {
            case 'get':
                var target = 'get';
                var val = $('#input1').val();
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , val: val
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.get[triggerJSON.triggers.get.length] = newTrigger;
                break;
            case 'post':
                var target = 'post';
                var val = 'none';
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , val: val
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.post[triggerJSON.triggers.post.length] = newTrigger;
                break;
            case 'greater than':
                var target = $('.targetBtn')[0].innerText.substring(0, $('.targetBtn')[0].innerText.length - 1);
                var threshold = $('#input1').val();
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , threshold: threshold
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.greaterThan[triggerJSON.triggers.greaterThan.length] = newTrigger;
                break;
            case 'less than':
                var target = $('.targetBtn')[0].innerText.substring(0, $('.targetBtn')[0].innerText.length - 1);
                var threshold = $('#input1').val();
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , threshold: threshold
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.lessThan[triggerJSON.triggers.lessThan.length] = newTrigger;
                break;
            case 'equal to':
                var target = $('.targetBtn')[0].innerText.substring(0, $('.targetBtn')[0].innerText.length - 1);
                var threshold = $('#input1').val();
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , threshold: threshold
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.equalTo[triggerJSON.triggers.lessThan.length] = newTrigger;
                break;
            case 'between':
                var target = $('.targetBtn')[0].innerText.substring(0, $('.targetBtn')[0].innerText.length - 1);
                var threshold = [$('#input1').val(), $('#input2').val()];
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , threshold: threshold
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.between[triggerJSON.triggers.between.length] = newTrigger;
                break;
            case 'time wait':
                var target = $('.targetBtn')[0].innerText.substring(0, $('.targetBtn')[0].innerText.length - 1);
                var time = $('#input1').val();
                var actionName = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1);
                var actionID = getActionID(actionName);
                var newTrigger = {
                    target: target
                    , time: time
                    , actionIDs: [actionID]
                };
                triggerJSON.triggers.timeWait[triggerJSON.triggers.timeWait.length] = newTrigger;
                break;
            default:
                alert('Please pick a valid type');
            }
            socket.emit('updateJSON', triggerJSON);
            socket.on('updateTriggers', function (data) {
                $('#settingsModal').modal('hide');
                snackbar('Trigger Added');
            });
        });
        $('.cancelBtn').click(function () {
            $('#settingsModal').modal('hide');
        });
    });
}

function makePinsforTriggersDropdown() {
    $.get('/config/pins.json', function (data) {
        var pins = data.pins;
        pins.forEach(function (item, index) {
            if (item.io.toLowerCase() == 'input') {
                $('.target').append("<li><a href='#'>" + item.name + "</a></li>");
                $('.target li').click(function (e) {
                    $('.targetBtn').html(e.currentTarget.innerText + "<span class='caret'></span>");
                });
            }
        });
    });
}

function makeActionsforTriggersDropdown() {
    $.get('/config/actions.json', function (data) {
        var actions = data.actions;
        actions.forEach(function (item, index) {
            $('.action').append("<li><a href='#'>" + item.name + "</a></li>");
            $('.action li').click(function (e) {
                $('.actionBtn').html(e.currentTarget.innerText + "<span class='caret'></span>");
            });
        });
    });
}

function typeSelector() {
    $('.type li').click(function (e) {
        var text = e.currentTarget.children[0].innerHTML;
        $('.typeBtn').html(text + "<span class='caret'></span>");
        $('#targetCol').removeClass('hide');
        switch (text.toLowerCase()) {
        case 'get':
            $('#extraInfo').html('<label>Val =&nbsp; </label><input id="input1" type="text">');
            $('#targetTitle').html('');
            $('#targetCol').hide();
            break;
        case 'post':
            $('#targetTitle').html('');
            $('#targetCol').hide();
            break;
        case 'greater than':
            $('#extraInfo').html('<label>Threshold: &nbsp;</label><input id="input1" type="text">');
            $('#targetTitle').html('Target');
            $('#targetCol').show();
            break;
        case 'less than':
            $('#extraInfo').html('<label>Threshold: &nbsp;</label><input id="input1" type="text">');
            $('#targetTitle').html('Target');
            $('#targetCol').show();
            break;
        case 'equal to':
            $('#extraInfo').html('<label>Val: &nbsp;</label><input id="input1" type="text">');
            $('#targetTitle').html('Target');
            $('#targetCol').show();
            break;
        case 'between':
            $('#extraInfo').html('<label>Between &nbsp;</label><input id="input1" type="text"> and <input id="input2" type="text">');
            $('#targetTitle').html('Target');
            $('#targetCol').show();
            break;
        case 'time wait':
            $('#extraInfo').html('<label>Time: &nbsp;</label><input id="input1" type="text">');
            $('#targetTitle').html('Target');
            $('#targetCol').show();
            break;
        default:
            $('#extraInfo').html(' ');
            $('#targetTitle').html('');
            $('#targetCol').hide();
        }
    });
}

function getActionID(name, callback) {
    var actionJSON = getSync('/config/actions.json');
    var id;
    actionJSON = actionJSON.actions;
    for (var i = 0; i < actionJSON.length; i++) {
        if (name == actionJSON[i].name) {
            id = actionJSON[i].ID;
            break;
        }
    }
    return id || -1;
}

function addAction() {
    $.get('/html/addAction.html', function (data) {
        $('#panelHead').append(data);
        $('.add').toggle();
        makeTargetforActionsDropdown();
        $('.cancelBtn').click(function () {
            $('#settingsModal').modal('hide');
        });
    });
}

function makeTargetforActionsDropdown() {
    $.get('/config/pins.json', function (data) {
        data = data.pins;
        data.forEach(function (item, index) {
            if (item.io.toLowerCase() == 'output') {
                $('.targetList').prepend('<li id=' + index + '><a href=#>' + item.name + '</a></li>');
            }
        });
        $('.targetList li').click(function (e) {
            e.preventDefault();
            var targetName = e.currentTarget.innerText;
            var targetIndex = e.currentTarget.id;
            $('.targetBtn').html(targetName + '<span class=caret></span>');
            var actions = getActionsArrayFromType(data[targetIndex].type);
            $('.actionList').html('');
            actions.forEach(function (item, index) {
                $('.actionList').append('<li><a href=#>' + item + '</a></li>');
            });
            $('.actionList li').click(function (e) {
                e.preventDefault();
                $('.actionBtn').html(e.currentTarget.innerText + '<span class=caret></span>');
            });
            $('.addBtn').click(function () {
                var actionConfig = {};
                actionConfig.name = $('#actionName').val();
                actionConfig.action = $('.actionBtn')[0].innerText.substring(0, $('.actionBtn')[0].innerText.length - 1).toLowerCase();
                actionConfig.type = data[targetIndex].type;
                actionConfig.pinName = targetName.substring(0, targetName.length - 1);
                actionConfig.ID = Date.now();
                actionJSON.actions[actionJSON.actions.length] = actionConfig;
                socket.emit('updateJSON', actionJSON);
                socket.on('updateActions', function (data) {
                    $('#settingsModal').modal('hide');
                    snackbar('Action Added');
                });
            });
        });
    });
}

function getActionsArrayFromType(type) {
    var actions = [];
    switch (type) {
    case 'led':
        actions = ['off', 'stop', 'blink', 'pulse'];
        break;
    case 'relay':
        actions = ['open', 'close'];
        break;
    case 'servo':
        actions = ['to', 'sweep'];
        break;
    case 'motor':
        actions = ['forward', 'backward'];
        break;
    case 'piezo':
        actions = ['play'];
        break;
    }
    return actions;
}

function addPin() {
    $.get('/html/addPin.html', function (data) {
        $('#panelHead').append(data);
        $('.add').toggle();
        $('.typeList li').click(function (e) {
            e.preventDefault();
            $('.typeBtn').html(e.currentTarget.innerText + '<span class=caret></span>');
        });
        $('.addBtn').click(function () {
            var pinConfig = {};
            pinConfig.name = $('#pinName').val();
            pinConfig.pin = $('#pin').val();
            pinConfig.description = $('#description').val();
            var type = $('.typeBtn')[0].innerText.substring(0, $('.typeBtn')[0].innerText.length - 1).toLowerCase();
            pinConfig.type = type;
            switch (type) {
            case 'led':
            case 'relay':
            case 'servo':
            case 'motor':
            case 'piezo':
                pinConfig.io = 'output';
                break;
            case 'thermometer':
            case 'motion':
                pinConfig.io = 'input';
                break;
            default:
                alert('something went wrong');
            }
            pinJSON.pins[pinJSON.pins.length] = pinConfig;
            socket.emit('updateJSON', pinJSON);
            socket.on('updatePins', function (data) {
                $('#settingsModal').modal('hide');
                snackbar('Pin Added');
            });
        });
        $('.cancelBtn').click(function () {
            $('#settingsModal').modal('hide');
        });
    });
}

function getSync(strUrl) {
    var strReturn
    jQuery.ajax({
        url: strUrl
        , success: function (data) {
            strReturn = data;
        }
        , async: false
    });
    return strReturn;
}