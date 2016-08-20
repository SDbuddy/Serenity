var express = require('express');
var app = express();
//var five = require('johnny-five');
var trigger = require('./triggerHandler');

var usingArduino = true; //boolean to asess whether the system will be used with an arduino

var server = require('http').createServer(app);
//var index = require('./buttonManager.js');
var io = require('socket.io')(server);

var PORT = 8081;

app.use(express.static('wwwtest'));

app.get("/", function(req, res) {
    res.sendfile('/wwwtest/index.html');
});

io.set('origins', '*:*');

io.on('connection', function(socket) {
    console.log("connection");
    socket.on('event',function(data){
      console.log("Dont need CORS");
    });
});

server.listen(PORT, function(err) {
    if (err) throw err;
    else {
        console.log("Listening on %s", PORT);
    }
});
