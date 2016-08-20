var main = function () {
    var currentPage = 'pins';
    $('body').append('<style>.panel-body{max-height: ' + (screen.height - 300) + 'px !important;}');
    loadPins('flapjack');
    $('.list-group-item').click(function (e) {
        var target = e.currentTarget.children[0].children[0].innerText.toLowerCase();
        if (target == 'arduino pins') {
            target = 'pins';
        }
        if (target != currentPage) {
            $('.' + target).addClass('isActive');
            $('.' + currentPage).removeClass('isActive');
        }
        switch (target) {
        case 'pins':
            loadPins(currentPage);
            break;
        case 'controls':
            loadControls(currentPage);
            break;
        case 'display':
            loadDisplay(currentPage);
            break;
        case 'general':
            loadGeneral(currentPage);
            break;
        case 'triggers':
            loadTriggers(currentPage)
            break;
        case 'actions':
            loadActions(currentPage);
            break;
        default:
        }
        currentPage = target;
    });
}

function loadPins(current) {
    if (current != 'pins') {
        $.get('/html/pins.html', function (data) {
            $.getJSON('http://192.168.1.115:8000/config?f=pins.json', function (config) {
                alert('Ehllo');
                $('#panel').html(data);
                $('.add').on('click', function (e) {
                    e.preventDefault();
                    $('.modal-title').html('Add Pin');
                    $('#configEditor').modal('show');
                });
                $('#config-submit').click(function (e) {
                    e.preventDefault();
                    var newPin = {};
                    newPin.name = $('#name').val();
                    newPin.pin = $('#pin').val();
                    newPin.type = $('#type').val();
                    newPin.descriptionVal = $('#descriptionVal').val();
                    $('#mainLayout').append('<tr><td>' + newPin.name + '<td>' + newPin.pin + '</td>' + '<td>' + newPin.type + '</td>' + '<td>' + newPin.descriptionVal + '</td>' + '<td><button class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>&nbsp;<button class="btn btn-danger btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
                    $('#configEditor').modal('hide');
                });
            });
        });
    }
}

function loadControls(current) {
    if (current != 'controls') {
        $.get('/html/controls.html', function (data) {
            var html = data;
            $('#panel').html(data);
        });
    }
}

function loadDisplay(current) {
    if (current != 'display') {
        $.get('/html/display.html', function (data) {
            var html = data;
            $('#panel').html(data);
        });
    }
}

function loadGeneral(current) {
    if (current != 'general') {
        $.get('/html/general.html', function (data) {
            var html = data;
            $('#panel').html(data);
        });
    }
}

function loadTriggers(current) {
    if (current != 'triggers') {
        $.get('/html/triggers.html', function (data) {
            $('#panel').html(data);
        });
    }
}

function loadActions(current) {
    if (current != 'action') {
        $.get('/html/actions.html', function (data) {
            $('#panel').html(data);
        });
    }
}
$(document).ready(main);