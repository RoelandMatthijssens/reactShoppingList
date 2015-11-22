module.exports = {
    home:home
};

function home(request, response){
    response.render('pages/home');
}