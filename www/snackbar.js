function snackbar(str) {
    // Get the snackbar DIV
    var x = $('#snackbar');
    // Add the "show" class to DIV
    x.addClass('show');
    x.html(str);
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.removeClass('show');
        x.html('')
    }, 3000);
}