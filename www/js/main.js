var triggerJSON = {};
var actionJSON = {};
var pinJSON = {};
var socket = io();
//
var main = function () {
    makeCharts();
    handleSettings();
    $.fn.dataTable.ext.errMode = 'none';
}

function handleSettings() {
    $('#triggers').click(function (e) {
        e.preventDefault();
        handleTriggers();
    });
    $('#actions').click(function (e) {
        e.preventDefault();
        handleActions();
    });
    $('#pins').click(function (e) {
        e.preventDefault();
        handlePins();
    });
    $('#display').click(function (e) {
        e.preventDefault();
        handleDisplay();
    });
    $('#general').click(function (e) {
        e.preventDefault();
        handleGeneral();
    });
}

function handleTriggers() {
    $.get('/html/triggers.html', function (data) {
        $('.modal-content')[0].innerHTML = data;
        $.get('/config/triggers.json', function (data) {
            triggerJSON = data;
            makeTriggerTable(data);
            $('.add').click(function () {
                addTrigger();
            });
        });
    });
}

function handleActions() {
    $.get('/html/actions.html', function (data) {
        $('.modal-content')[0].innerHTML = data;
        $.get('/config/actions.json', function (data) {
            actionJSON = data;
            makeActionTable(data);
            $('.add').click(function () {
                addAction();
            });
        });
    });
}

function handlePins() {
    $.get('/html/pins.html', function (data) {
        $('.modal-content')[0].innerHTML = data;
        $.get('/config/pins.json', function (data) {
            pinJSON = data;
            makePinTable(data);
            $('.add').click(function () {
                addPin();
            });
        });
    });
}

function handleDisplay() {
    $.get('/html/display.html', function (data) {
        $('.modal-content')[0].innerHTML = data;
        $('#settingsModal').modal('show');
    });
}

function handleGeneral() {
    $.get('/html/general.html', function (data) {
        $('.modal-content')[0].innerHTML = data;
        $('#settingsModal').modal('show');
    });
}
//
$(document).ready(main);