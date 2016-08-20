var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var five = require('johnny-five');
var trigger = require('./triggerHandler');
var HAAC = require('./HAAC-config.js')

//GET THE JSON DATA FROM files
var jsonPins, jsonTriggers, jsonActions, jsonDisplay, jsonGeneral, jsonControls;
HAAC.readfile("pins", function(data) {
  jsonPins = data;
});
HAAC.readfile("triggers", function(data) {
  jsonTriggers = data;
});
HAAC.readfile("actions", function(data) {
  jsonActions = data;
});
HAAC.readfile("display", function(data) {
  jsonDisplay = data;
});
HAAC.readfile("general", function(data) {
  jsonGeneral = data;
});
HAAC.readfile("controls", function(data) {
  jsonControls = data;
});


var usingArduino = true; //boolean to asess whether the system will be used with an arduino

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var server = require('http').createServer(app);
//var index = require('./buttonManager.js');
var io = require('socket.io')(server);

var PORT = 8180;

app.use(express.static('www')); //grants access to all static files within www

app.get("/", function(req, res) {
    res.sendfile('/www/index.html');
});

app.get('/event', function(req, res) {
    req.query.sensorType = 'get';
    //console.log(req.query);
    trigger.eventCheck(req.query);
    res.send("Got Request...<br> Val = " + req.query.val);
});

app.post('/test', function(req, res) {
  req.body.sensorType = 'post';
  trigger.eventCheck(req.body);
  res.send("Post request success");

  //console.log("This works " + test);

  res.send("debatable");
});

//JSON EVENT HANDLING

io.on('connection', function(client) {
    console.log("Someone has connected");

    client.on('updateJson', function(data) {
      var jsonName = Object.keys(data);
      HAAC.writefile(jsonName[0], data, function (err) {
        if (err) console.log(err);
      });
      switch(jsonName) {
        case "pins":
          jsonPins = data;
          break;
        case "triggers":
          jsonTriggers = data;
          break;
        case "actions":
          jsonActions = data;
          break;
        case "display":
          jsonDisplay = data;
          break;
        case "general":
          jsonGeneral = data;
          break;
        case "controls":
          jsonControls = data;
          break;
      }
    });


});


server.listen(PORT, function(err) {
    if (err) throw err;
    else {
        console.log("Listening on %s", PORT);
    }
});

if (usingArduino) {
    var five = require("johnny-five");
    var deviceMaker = require('./deviceMaker.js');
    var board = new five.Board();
    var pins = require('./config/pins.json').pins;

    board.on('ready', function() {
        //console.info("board ready");
        for (var i = 0; i < pins.length; i++) {
            //          console.log(pins[i]);
            deviceMaker.newDevice(pins[i], trigger.eventCheck);
            //pass each pin into new device to configure the correct device type for each pin
            //nd pass in reference to the function that analyzes incomeing data and checks for process triggers
        }
        //console.info("Done with device setup!");


    });
}

//---------------------------------------------------------------------------------------------------------------
//This stuff is for sending files to people its a download server
//---------------------------------------------------------------------------------------------------------------
app.get('/downloadCode', function(req,res) {

	res.download('/home/harsh/Documents/github/node/fishtank/Fishtank/server.js',function(){
		console.log('Downloaded');
	});
});

app.get('/download',function(req,res){
   res.send("<center><h1> Download Server</h1><a href='/downloadCode'>Project Download</a> <br></center>");
   console.log('Someone Connected to Download Page');
});
