module.exports = function (app){
    var pageRoutes = App.route('pageRoutes');
    app.get("/", pageRoutes.home);
};