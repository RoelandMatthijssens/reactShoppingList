var env             = process.env.NODE_ENV || 'development';
var packageJson     = require('../package.json');
var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

console.log('Loading App in '+env+' mode.');

global.App = {
     app: express()
  ,  port: 1337
  ,  version: packageJson.version
  ,  root: path.join(__dirname, '..')
  ,  appPath: function(path){return this.root+"/"+path}
  ,  require: function(path){return require(this.appPath(path))}
  ,  env: env
  ,  start: start
  ,  route: route
};

function start(){
    if(!App.started){
        App.started=true;
        App.app.listen(App.port);
        console.log('App version '+this.version+' started at http://127.0.0.1:' + App.port + '/ in '+App.env+' mode');
    } else {
        console.log('App is already running: version '+this.version+' at http://127.0.0.1:' + App.port + '/ in '+App.env+' mode');
    }
}

function route(path){
    return App.require('app/routes/'+path);
}

//Use Jade for views
App.app.set('views', App.appPath("app/views"));
App.app.set('view engine', 'jade');
App.app.set('view options', {pretty: env==='development'});


//Initialize the middleware
App.app.use(bodyParser.urlencoded({extended: true})); //Add attributes to request object
App.app.use(methodOverride()); //CRUD operations by adding <input type="hidden" name="_method" value="DELETE">
App.app.use(express.static(App.appPath('/assets')));

//Initialize the routes
App.require("config/routes")(App.app);