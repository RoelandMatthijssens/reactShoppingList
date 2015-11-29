var FilterableProductTable = require("./productTable");
var ShoppingListCollection = require("./shoppingList");
var ManagementWindow = React.createClass({
    render: function(){
        return (
            <div className="managementWindow">
                <div className="leftPane">
                    <ShoppingListCollection lists={this.props.lists}/>
                </div>
                <div className="rightPane">
                    <FilterableProductTable products={this.props.products}/>
                </div>
            </div>
        )
    }
});

module.exports = ManagementWindow;