var http = require('http');
var router = require('./router');
var server = http.createServer(router.route);
server.listen(1337, "127.0.0.1");