var productTable = require("./productTable");

$.getJSON("json/products.json", function(data){
    console.log(productTable);
    ReactDOM.render(
        React.createElement(productTable.FilterableProductTable, {products: data}),
        document.getElementById("container")
    );
});