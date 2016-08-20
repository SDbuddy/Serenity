function makeTriggerTable(data) {
    var table = $('#mainLayout').DataTable({
        "paging": true
        , "ordering": false
        , "info": false
        , "searching": false
        , "bAutoWidth": false
        , "bLengthChange": false
        , "iDisplayLength": 5
        , "aoColumns": [
            {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
        ]
    });
    table.clear().draw(false);
    data = data.triggers;
    $('#settingsModal').modal('show');
    for (var i = 0; i < data.greaterThan.length; i++) {
        var trigger = 'pin ' + data.greaterThan[i].target + ' > ' + data.greaterThan[i].threshold;
        var action = '';
        data.greaterThan[i].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    }
    data.lessThan.forEach(function (item, index) {
        var trigger = 'pin ' + data.lessThan[index].target + ' < ' + data.lessThan[index].threshold;
        var action = '';
        data.lessThan[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    data.equalTo.forEach(function (item, index) {
        var trigger = 'pin ' + data.equalTo[index].target + ' = ' + data.equalTo[index].threshold;
        var action = '';
        data.equalTo[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    data.between.forEach(function (item, index) {
        var trigger = data.between[index].threshold[0] + ' < pin ' + data.between[index].target + ' < ' + data.between[index].threshold[1];
        var action = '';
        data.between[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    data.timeWait.forEach(function (item, index) {
        var time = new Date(data.timeWait[index].time);
        var trigger = 'Wait for ' + time;
        var action = '';
        data.timeWait[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    data.get.forEach(function (item, index) {
        var trigger = 'Get val: ' + data.get[index].val;
        var action = '';
        data.get[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    data.post.forEach(function (item, index) {
        var trigger = 'Looking for Post with values: ';
        data.post[index].vals.forEach(function (item, index) {
            trigger += item + ', ';
        });
        var action = '';
        data.post[index].actionIDs.forEach(function (item, index) {
            var nm = getActionName(item);
            action += nm + '<br />';
        });
        table.row.add([trigger, action, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    //alert(data);
}

function makeActionTable(data) {
    var table = $('#mainLayout').DataTable({
        "paging": true
        , "ordering": false
        , "info": false
        , "searching": false
        , "bAutoWidth": false
        , "bLengthChange": false
        , "iDisplayLength": 5
        , "aoColumns": [
            {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }, {
                sWidth: '1000px'
            }
        ]
    });
    table.clear().draw(false);
    data = data.actions;
    data.forEach(function (item, index) {
        table.row.add([item.name, item.type, item.action, item.pinName, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    $('#settingsModal').modal('show');
}

function makePinTable(data) {
    var table = $('#mainLayout').DataTable({
        "paging": true
        , "ordering": false
        , "info": false
        , "searching": false
        , "bAutoWidth": false
        , "bLengthChange": false
        , "iDisplayLength": 5
        , "aoColumns": [
            {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }
            , {
                sWidth: '800px'
            }, {
                sWidth: '800px'
            }
        ]
    });
    table.clear().draw(false);
    data = data.pins;
    data.forEach(function (item, index) {
        table.row.add([item.name, item.pin, item.type, item.description, "<button class='btn btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>&nbsp;&nbsp;<button class='btn btn-danger btn-lg'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"]).draw(false);
    });
    $('#settingsModal').modal('show');
}

function getActionName(ID) {
    var actionJSON = getSync('/config/actions.json');
    var name;
    actionJSON = actionJSON.actions;
    for (var i = 0; i < actionJSON.length; i++) {
        if (ID == actionJSON[i].ID) {
            name = actionJSON[i].name;
            break;
        }
    }
    return name || -1;
}