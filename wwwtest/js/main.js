var config;
var main = function() {
    var socket = io.connect('http://aaroncofield.net');
    handleUSB(socket);
    refreshPage(socket);
    $('#settings').click(function() {
      //  $('#settingsModal').modal("show");
      //  buttonConfig();
      socket.emit('event','Dont need CORS');
    });

}

function buttonConfig() {
    var formStr = "";
    $.get("/controls.json", function(data) {
        var btns = data;
        var numBtns = data.buttons.length;
        for (var i = 0; i < numBtns; i++) {
          formStr = formStr.concat("<div class='form-group'><label>Button" + i + "</label><input type='text' class='form-control' id='button" + i + "' value='"+ data.buttons[i].id +"'></div>");
        }
        $('#buttonConfig')[0].innerHTML = formStr;
    });

}

function refreshPage(socket) {
    socket.on('pageUpdate', function(pageData) {
        switch (pageData.usbStatus) {
            case 'open':
                $('#usb').attr('class', 'btn btn-success');
                usbStatus = 1;
                break;
            case 'closed':
                $('#usb').attr('class', 'btn btn-danger');
                usbStatus = 0;
                break;
            default:
        }
    });
}
$(document).ready(main);
