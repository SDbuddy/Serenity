var fs = require('fs');

function writefile(file, jsonObject, callback) {
  callback = callback || 0;
  fs.writeFile(__dirname + "/www/config/" + file + ".json", JSON.stringify(jsonObject,null,1), function(err){
    if (err){
      if (callback){
        callback(err);
      }
    }
    else {
      console.log(file+".json was successfully written");
        callback(err);
    }
  });
}
function readfile(file, callback) {
  callback = callback || 0;
  fs.readFile(__dirname + "/www/config/" + file + ".json", function(err, data){
    if(err) return "error";
    else{
      console.log(file + ".json was read");
      if(callback){
        callback(JSON.parse(data));
      }
    }
  });
}

function handleSettings(data) {
  switch (data.type) {
    case "pins":
      writefile("pins", data, function(err){
        if (err) console.log("Error writing pins.json");
        else console.log("Good");
      });
      break;
    case "controls":
      writefile("controls", data, function(err){
        if (err) console.log("Error writing controls.json");
      });
      break;
    case "display":
      writefile("display", data, function(err){
        if (err) console.log("Error writing display.json");
      });
      break;
    case "general":
      writefile("general", data, function(err){
        if (err) console.log("Error writing general.json");
      });
      break;
    case "triggers":
      writefile("triggers", data, function(err){
        if (err) console.log("Error writing triggers.json");
      });
      break;
    case "actions":
      writefile("actions", data, function(err){
        if (err) console.log("Error writing actions.json");
      });
      break;
    default:
      console.log("Invalid json object");
      break;

  }
}

exports.writefile = writefile;
exports.readfile = readfile;
exports.handleSettings = handleSettings;
