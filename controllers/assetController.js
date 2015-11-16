var fileHelper = require("../helpers/fileHelper");

module.exports = {
    getJs:getJavascript,
    getCss:getStyleSheet,
    getJson:getJson
};

function getJavascript(url, response) {
    fileHelper.getFile('assets/javascript'+url, "application/x-javascript", response);
}
function getStyleSheet(url, response){
    fileHelper.getFile('assets/css'+url, "text/css", response);
}
function getJson(url, response){
    fileHelper.getFile('assets/json'+url, "application/json", response);
}
