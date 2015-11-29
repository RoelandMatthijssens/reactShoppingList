var ManagementWindow = require("./managementWindow");

$.getJSON("json/products.json", function(data){
    var products = data.products;
    var lists = data.lists;
    ReactDOM.render(
        <ManagementWindow products={products} lists={lists}/>,
        document.getElementById("container")
    );
});