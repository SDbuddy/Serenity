var usbStatus = -1;

function handleUSB(socket) {
    $('#usb').click(function () {
        $('#usb').attr('class', 'btn btn-primary');
        switch (usbStatus) {
        case -1:
            socket.emit('usb', 1);
            break;
        case 0:
            socket.emit('usb', 1);
            break;
        case 1:
            socket.emit('usb', 0);
            break;
        }
    });
    socket.on('usb', function (data) {
        switch (data.status) {
        case 'open':
            $('#usb').removeClass('btn-default');
            $('#usb').removeClass('btn-danger');
            $('#usb').addClass('btn-success');
            usbStatus = 1;
            break;
        case 'closed':
            $('#usb').removeClass('btn-default');
            $('#usb').removeClass('btn-success');
            $('#usb').addClass('btn-danger');
            usbStatus = 0;
            break;
        }
    });
}