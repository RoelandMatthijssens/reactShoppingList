var FilterableProductTable = require("./productTable");

$.getJSON("json/products.json", function(data){
    ReactDOM.render(
        <FilterableProductTable products={data}/>,
        document.getElementById("container")
    );
});