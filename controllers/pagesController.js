var fs = require("fs");
var responseWriter = require("../helpers/responseWriter");
module.exports = {
    root:root,
    notFound:notFound
};

function root(request, response){
    fs.readFile("views/root.html", function(error, data){
        responseWriter.writeSuccess(response, data, "text/html");
        response.end(data);
    });
}

function notFound(request, response){
    responseWriter.write404(request, response);
}