var fs = require("fs");
var responseWriter = require("./responseWriter");

module.exports = {
    getFile:getFile
};

function getFile(path, type, response) {
    fs.readFile(path, function(error, data){
        if(error!=null){
            responseWriter.write404(response, data);
        } else {
            responseWriter.writeSuccess(response, data);
            response.end(data);
        }
    });
}