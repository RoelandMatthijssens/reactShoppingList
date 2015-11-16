var pagesController = require("./controllers/pagesController");
var assetController = require("./controllers/assetController");
module.exports = {
    route: route
};

function route(request, response){
    var url = request.url;
    var method = request.method;
    if(matchesRoute(request, "root", "GET")){
        pagesController.root(request, response);
    } else if(url.match(/.*\.js$/) != null) {
        assetController.getJs(url, response);
    } else if(url.match(/.*\.css$/) != null) {
        assetController.getCss(url, response);
    } else if(url.match(/.*\.json$/) != null){
        assetController.getJson(url, response);
    } else {
        pagesController.notFound(request, response);
    }
}

function matchesRoute(request, route, method){
    var regex = new RegExp("^\/"+route+"(\.html)?$");
    return request.url.match(regex)!=null && request.method === method;
}