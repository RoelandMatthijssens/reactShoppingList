module.exports = {
    home:home
};

function home(request, response){
    response.setHeader('Content-Type', 'text/html');
    response.send("<html><head><link rel='stylesheet' type='text/css' href='css/main.css'></head><body><div>test</div></body></html>");
}