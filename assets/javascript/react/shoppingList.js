var ShoppingListCollection = React.createClass({
    render: function(){
        var lists = this.props.lists;
        return (
            <div className="shoppingListCollection">
                {
                    lists.map(function (list) {
                        return <ShoppingList key={list.name} list={list}/>
                    })
                }
            </div>
        )
    }
});

var ShoppingList = React.createClass({
    render: function () {
        var entries = this.props.list.entries;
        return (
            <div className="shoppingList">
                <div className="shoppingListHeader">
                    <span>{this.props.list.date}</span>
                </div>
                <table className="shoppingListContent">
                    <tbody>
                    {entries.map(function(entry){
                        return <ShoppingListRow key={entry.id}
                                                name={entry.name}
                                                amount={entry.amount}
                        />
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});

var ShoppingListRow = React.createClass({
    render: function(){
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.amount}
                </td>
            </tr>
        )
    }
});

module.exports = ShoppingListCollection;