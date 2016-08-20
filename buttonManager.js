var layout = require("./controls.json");
var fs = require('fs');

var numColumns = 4;

require.extensions['.html'] = function(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var page = require("./index.html");

function objectToString(button) {
    var btnStr = " <a href='#' class='btn className' id='idName'>name</a>";
    btnStr = btnStr.replace("className", "btn-" + button.defaultColor);
    btnStr = btnStr.replace("idName", button.id);
    btnStr = btnStr.replace("name", button.name);
    return btnStr;
}

function editHTML(html) {
    var controlDivIndex = html.search("controlPanel") + 14;
    var numButtons = layout.buttons.length;
    var btns = "controlPanel'>";
    var br = 0;
    for (var i = 0; i < numButtons; i++) {
        if (br < numColumns) {
            btns = btns.concat(objectToString(layout.buttons[i]) + "&nbsp; &nbsp; &nbsp; &nbsp;");
            br++;
        } else {
            btns = btns.concat("<br><br>");
            br = 0;
            i--;
        }
    }
    html = html.replace("controlPanel'>", btns);

    return html;
}

exports.updateButtonList = function(file){
  fs.writeFile('./controls.json', JSON.stringify(file), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});
}

exports.getHTML = function() {
    return editHTML(page);
}
