var fs = require("fs");
module.exports = {
    writeSuccess: writeSuccess,
    writeError: writeError,
    write404:write404
};

function writeSuccess(response, data, type){
    response.writeHead(200, {
        'Content-Type': type,
        'Content-Length': data.length
    });
}

function writeError(response){
    fs.readFile('views/error.html', function (error, data) {
        response.writeHead(500, {
            'Content-Type': 'text/html'
        });
        response.end(data);
    });
}

function write404(request, response){
    fs.readFile('views/404.html', function (error, data) {
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });
        response.end(data);
    });
}